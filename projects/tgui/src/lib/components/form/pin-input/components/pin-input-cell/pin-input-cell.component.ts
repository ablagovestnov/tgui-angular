import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input, 
  computed,
  inject,
  ElementRef,
  forwardRef,
  signal,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisuallyHiddenDirective } from '../../../../../directives/visually-hidden.directive';
import { PlatformService } from '../../../../../services/platform.service';

/**
 * Individual cell component for PIN input.
 * Displays a field for a single digit of a PIN code.
 */
@Component({
  selector: 'tgui-pin-input-cell',
  standalone: true,
  imports: [CommonModule, VisuallyHiddenDirective],
  host: {
    'attr.data-refresh-platform': 'true'
  },
  template: `
    <label
      class="wrapper"
      [class.wrapper--ios]="isIOS()"
      [class.wrapper--typed]="isTyped()"
    >
      <input
        tguiVisuallyHidden
        type="number"
        maxlength="1"
        class="input"
        [disabled]="disabled()"
        [attr.name]="name()"
      />
      <div *ngIf="isTyped() && !isIOS()" class="dot"></div>
    </label>
  `,
  styles: [`
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    
      width: 40px;
      height: 44px;
    
      border-radius: 12px;
      border: 2.5px solid var(--tgui--divider);
      background: var(--tgui--bg_color);
    
      transition: border-color .15s ease-out;
      padding: 0;
    }
    
    .wrapper--ios {
      width: 13px;
      height: 13px;
    
      opacity: .1;
      border: none;
      border-radius: 50%;
      background: var(--tgui--link_color);
    }
    
    .wrapper--ios.wrapper--typed {
      opacity: 1;
    }
    
    .wrapper:focus-within {
      border-color: var(--tgui--link_color);
    }
    
    .dot {
      width: 8px;
      height: 8px;
    
      border-radius: 50%;
      background: var(--tgui--text_color);
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinInputCellComponent {
  // Service injections
  private platformService = inject(PlatformService);
  private elementRef = inject(ElementRef);

  // Input parameters
  /** Whether the cell has a value typed */
  isTyped = input<boolean>(false);
  
  /** Name attribute for input */
  name = input<string>('');
  
  /** Sets the disabled state */
  disabled = input<boolean>(false);
  
  // Platform signal to track iOS state
  protected isIOS = signal<boolean>(false);
  
  constructor() {
    // Initialize iOS state
    this.isIOS.set(this.platformService.isIOS());
    
    // Track platform changes
    effect(() => {
      const platform = this.platformService.platform();
      this.isIOS.set(platform === 'ios');
      console.log(`[PinInputCell] Platform changed to: ${platform}, isIOS: ${this.isIOS()}`);
    });
  }
} 