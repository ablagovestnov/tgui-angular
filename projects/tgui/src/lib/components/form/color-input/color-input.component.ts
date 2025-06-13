import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input,
  inject,
  effect,
  signal,
  InputSignal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../../services/platform.service';
import { VisuallyHiddenDirective } from '../../../directives/visually-hidden.directive';
import { FormInputComponent } from '../form-input/form-input.component';
import { TextComponent } from '../../typography/text/text.component';
import { SubheadlineComponent } from '../../typography/subheadline/subheadline.component';
import { callMultiple } from '../../../utils/function';

/**
 * Renders a color picker input within a form structure, displaying the selected color value.
 * It adapts the text style based on the platform and supports additional properties like header and status.
 */
@Component({
  selector: 'tgui-color-input',
  standalone: true,
  imports: [
    CommonModule, 
    FormInputComponent, 
    TextComponent, 
    SubheadlineComponent,
    VisuallyHiddenDirective
  ],
  template: `
    <tgui-form-input
      [header]="header()"
      [inputBefore]="before()"
      [inputAfter]="circleTemplate"
      [status]="status()"
      [class]="wrapperClasses()"
    >
      <ng-container *ngIf="platformService.platform() === 'ios'; else baseTemplate">
        <tgui-text [caps]="true" class="text">{{ colorValue() }}</tgui-text>
      </ng-container>
      <ng-template #baseTemplate>
        <tgui-subheadline [caps]="true" class="text">{{ colorValue() }}</tgui-subheadline>
      </ng-template>
    </tgui-form-input>

    <ng-template #circleTemplate>
      <div class="circle">
        <input
          tguiVisuallyHidden
          type="color"
          [value]="colorValue()"
          (input)="handleInput($event)"
          (change)="handleChange($event)"
          [disabled]="disabled()"
        />
        <div class="circleColor" [style.backgroundColor]="colorValue()"></div>
      </div>
    </ng-template>
  `,
  styles: [`
    :host {
      display: block;
    }

    .wrapper {
      display: flex;
      gap: 10px;
      min-height: 48px;
      padding: 10px 12px 10px 16px;
    }

    .wrapper--ios {
      padding: 10px 16px;
      min-height: 50px;
    }

    .circle {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: conic-gradient(
        from 0deg at 50% 50%,
        #0C28FF 0deg,
        #03FFFF 60deg,
        #24D627 120deg,
        #FDFF22 180deg,
        #FF2227 240deg,
        #FE2DF6 300deg,
        #7122FF 360deg
      );
    }

    .circleColor {
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }

    .circleColor::before,
    .circleColor::after {
      content: '';
      position: absolute;
      border-radius: inherit;
    }

    .circleColor::before {
      inset: 2px;
      background: var(--tgui--bg_color);
    }

    .circleColor::after {
      inset: 4px;
      background: inherit;
    }

    .text {
      flex: 1 1 0;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorInputComponent {
  // Dependency injection
  protected platformService = inject(PlatformService);

  // Platform shorthand
  protected platform = computed(() => this.platformService.platform());

  // Input signals
  /** The header label for the color input */
  header = input<string | null>(null);
  
  /** Content to be displayed before the color input */
  before = input<any>(null);
  
  /** The status of the input - error, default or focused */
  status = input<'error' | 'default' | 'focused'>('default');
  
  /** The current color value */
  value = input<string>('#EFEFF4');
  
  /** The default color value */
  defaultValue = input<string>('#EFEFF4');
  
  /** Whether the input is disabled */
  disabled = input<boolean>(false);
  
  /** CSS class to apply to the component */
  class = input<string>('');

  /** Event handler for color change */
  onChange = input<((event: Event) => void) | undefined>(undefined);

  // Internal state
  private internalValue = signal(this.value() || this.defaultValue());
  // A separate signal to track temporary values during input
  private temporaryValue = signal(this.value() || this.defaultValue());

  // Watch for external value changes
  constructor() {
    effect(() => {
      const newValue = this.value();
      if (newValue) {
        this.internalValue.set(newValue);
      }
    });
  }

  // Computed values
  /** Current color value, combining input value or internal state */
  protected colorValue = computed(() => this.temporaryValue());

  /** Classes for the wrapper element */
  protected wrapperClasses = computed(() => {
    return {
      'wrapper': true,
      'wrapper--ios': this.platform() === 'ios',
      [`${this.class()}`]: !!this.class()
    };
  });

  /**
   * Handle input event from the color picker
   * This updates the UI immediately as the user selects colors
   */
  protected handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.temporaryValue.set(input.value);
  }

  /**
   * Handle change event from the color input
   * This is triggered when the color picker is closed or Enter is pressed
   */
  protected handleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.internalValue.set(input.value);
    this.temporaryValue.set(input.value);
    
    if (this.onChange()) {
      this.onChange()?.(event);
    }
  }
} 