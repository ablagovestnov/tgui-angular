import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input,
  output,
  inject,
  ElementRef,
  signal,
  computed,
  ViewChild,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadlineComponent } from '../../typography/headline/headline.component';
import { RootRendererComponent } from '../../utils/root-renderer/root-renderer.component';
import { PinInputCellComponent } from './components/pin-input-cell/pin-input-cell.component';
import { PinInputButtonComponent } from './components/pin-input-button/pin-input-button.component';
import { TguiIcon36Backspace } from '../../../icons/icon36/tgui-icon36-backspace';
import { AVAILABLE_PINS, Keys, PinInputService } from './hooks/use-pin-input';
import { createChunks } from '../../../utils/chunk';
import { PlatformService } from '../../../services/platform.service';

export const PIN_MIN_COUNT = 2;

/**
 * Renders a set of input fields for entering pin codes with a virtual keypad for value entry and deletion.
 */
@Component({
  selector: 'tgui-pin-input',
  standalone: true,
  imports: [
    CommonModule,
    HeadlineComponent,
    RootRendererComponent,
    PinInputCellComponent,
    PinInputButtonComponent,
    TguiIcon36Backspace
  ],
  host: {
    'attr.data-refresh-platform': 'true'
  },
  template: `
    <tgui-root-renderer>
      <section
        class="wrapper"
        [class.wrapper--ios]="isIOS()"
      >
        <!-- Debug information panel -->
        <div *ngIf="debug()" class="debug-panel">
          <div class="debug-row">Platform: <strong>{{ platformService.platform() }}</strong></div>
          <div class="debug-row">iOS: <strong>{{ isIOS() }}</strong></div>
          <div class="debug-row">Platform changes: <strong>{{ platformChangeCount() }}</strong></div>
        </div>
        
        <header class="header">
          <tgui-headline class="title" weight="2">{{ label() }}</tgui-headline>
          <div class="cellsWrapper">
            <tgui-pin-input-cell
              *ngFor="let item of cells(); let i = index; trackBy: trackByIndex"
              #cellRef
              [isTyped]="i < value().length"
              [disabled]="false"
              [attr.tabindex]="-1"
              [attr.readonly]="true"
              [attr.value]="value()[i] || ''"
              [attr.autofocus]="i === 0 ? true : null"
              (keydown)="handleButton(i, $event.key)"
            ></tgui-pin-input-cell>
          </div>
        </header>
        <div class="buttonWrapper">
          <div *ngFor="let row of buttonRows(); let rowIndex = index; trackBy: trackByRow" class="row">
            <ng-container *ngFor="let element of row; let elIndex = index; trackBy: trackByElement">
              <tgui-pin-input-button 
                *ngIf="element !== Keys.BACKSPACE"
                (click)="handleClickValue(+element)"
                [content]="element"
              >
              </tgui-pin-input-button>
              <tgui-pin-input-button 
                *ngIf="element === Keys.BACKSPACE"
                (click)="handleClickBackspace()"
              >
                <tgui-icon36-backspace class="backspaceIcon"></tgui-icon36-backspace>
              </tgui-pin-input-button>
            </ng-container>
          </div>
        </div>
      </section>
    </tgui-root-renderer>
  `,
  styles: [`
    .wrapper {
      overflow: hidden;

      position: fixed;
      inset: 0;
      padding: 32px 20px;

      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      box-sizing: border-box;
      background: var(--tgui--bg_color);
    }
    
    .header {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      max-inline-size: 100%;
      flex: 1 1 0;
    }
    
    .wrapper--ios .header {
      flex: unset;
    }
    
    .header,
    .title {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    
    .title {
      text-align: center;
      max-inline-size: 100%;
    }
    
    .cellsWrapper {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      gap: 16px;
      margin-top: 20px;
    }
    
    .buttonWrapper {
      --tgui--pin_input--buttons-gap: 12px;
      --tgui--pin_input--button-width: 33.3%;

      width: 100%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      gap: var(--tgui--pin_input--buttons-gap);
      margin-top: 52px;
    }
    
    .wrapper--ios .buttonWrapper {
      --tgui--pin_input--button-width: 76px;
    }
    
    .row {
      display: flex;
      justify-content: center;
      gap: var(--tgui--pin_input--buttons-gap);
    }
    
    .row:last-child {
      margin-left: calc(var(--tgui--pin_input--buttons-gap) * 2);
      justify-content: flex-end;
    }
    
    .wrapper--ios .row:last-child {
      margin-left: calc(var(--tgui--pin_input--button-width) + var(--tgui--pin_input--buttons-gap));
      justify-content: center;
    }
    
    .backspaceIcon {
      display: block;
      margin: auto;
      color: var(--tgui--link_color);
    }
    
    /* Debug panel styles */
    .debug-panel {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      font-size: 12px;
      padding: 8px;
      z-index: 9999;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .debug-row {
      margin-bottom: 4px;
    }
    
    .debug-row:last-child {
      margin-bottom: 0;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinInputComponent {
  // Inject necessary services
  protected platformService = inject(PlatformService);
  private pinInputService = inject(PinInputService);
  private elementRef = inject(ElementRef);

  // Input props
  /** Text label displayed above the pin input cells. */
  label = input<string>('Enter your pin');
  
  /** The number of pin input fields to display, with a minimum of 2. */
  pinCount = input<number>(4);
  
  /** The initial pin values to populate the input fields with. */
  initialValue = input<number[]>([]);
  
  /** Enable debug mode to show platform information */
  debug = input<boolean>(false);
  
  // Output event
  /** Callback function triggered when the pin values change. */
  valueChange = output<number[]>();
  
  // ViewChild for the pin input cells
  @ViewChild('cellRef') cellRef: ElementRef | undefined;
  
  // Reference to Keys enum for template
  protected readonly Keys = Keys;
  
  // Debug counter for platform changes
  protected platformChangeCount = signal(0);
  
  // Platform signal to track iOS state
  protected isIOS = signal<boolean>(false);
  
  // Create a controller using the PinInputService
  private normalizedPinCount = computed(() => {
    return Math.max(PIN_MIN_COUNT, this.pinCount());
  });
  
  private controller = computed(() => {
    return this.pinInputService.create({
      pinCount: this.normalizedPinCount(),
      value: this.initialValue(),
      onChange: (newValue) => this.valueChange.emit(newValue)
    });
  });
  
  // Constructor with platform change effect
  constructor() {
    // Initialize iOS state
    this.isIOS.set(this.platformService.isIOS());
    
    // Track platform changes
    effect(() => {
      // Access platform to create dependency
      const platform = this.platformService.platform();
      
      // Update iOS state
      this.isIOS.set(platform === 'ios');
      
      // Update counter
      this.platformChangeCount.update(count => count + 1);
      
      // Log for debugging
      console.log(`[PinInput] Platform changed to: ${platform}, isIOS: ${this.isIOS()}, count: ${this.platformChangeCount()}`);
    });
  }
  
  // Expose needed controller methods and values
  protected value = computed(() => this.controller().value());
  
  // Array for cells rendering
  protected cells = computed(() => {
    return new Array(this.normalizedPinCount()).fill(null);
  });
  
  // Button rows
  protected buttonRows = computed(() => {
    return createChunks(AVAILABLE_PINS, 3);
  });
  
  // Methods
  protected trackByIndex(index: number): number {
    return index;
  }
  
  protected trackByRow(index: number, row: any[]): string {
    return row.toString();
  }
  
  protected trackByElement(index: number, element: any): any {
    return element;
  }
  
  protected handleClickValue(value: number): void {
    this.controller().handleClickValue(value);
  }
  
  protected handleClickBackspace(): void {
    this.controller().handleClickBackspace();
  }
  
  protected handleButton(index: number, key: string): void {
    this.controller().handleButton(index, key);
  }
} 