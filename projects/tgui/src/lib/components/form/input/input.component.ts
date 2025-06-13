import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input, 
  computed,
  inject,
  forwardRef,
  ElementRef,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../../services/platform.service';
import { FormInputComponent } from '../form-input/form-input.component';
import { SubheadlineComponent, TextComponent } from '../../typography';

/**
 * Renders a text input field with enhanced styling and integration into a form structure.
 * It automatically adapts typography and layout based on the platform, ensuring a consistent user experience across devices.
 */
@Component({
  selector: 'tgui-input',
  standalone: true,
  imports: [CommonModule, FormInputComponent, SubheadlineComponent, TextComponent],
  template: `
    <tgui-form-input
      [status]="status()"
      [header]="header()"
      [inputBefore]="before()"
      [inputAfter]="after()"
      [disabled]="disabled()"
    >
      <input
        class="input"
        [class.input-ios]="platformService.isIOS()"
        [class.input-base]="!platformService.isIOS()"
        [attr.type]="type()"
        [disabled]="disabled()"
        [attr.placeholder]="placeholder()"
        [attr.value]="value()"
        (input)="onInput($event)"
        (change)="onChange($event)"
      />
    </tgui-form-input>
  `,
  styles: [`
    :host {
      display: block;
    }

    .input {
      display: block;
      width: 100%;
      margin: 0;
      border: 0;
      outline: 0;
      resize: none;
      background: transparent;
      box-sizing: border-box;
      text-overflow: ellipsis;
      color: var(--tgui--text_color);
      font-family: var(--tgui--font-family);
    }

    .input-ios {
      font-size: var(--tgui--text--font_size);
      line-height: var(--tgui--text--line_height);
      font-weight: var(--tgui--font_weight--accent3);
    }

    .input-base {
      font-size: var(--tgui--subheadline1--font_size);
      line-height: var(--tgui--subheadline1--line_height);
      font-weight: var(--tgui--font_weight--accent3);
    }

    .input::-webkit-outer-spin-button,
    .input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    .input::placeholder {
      color: var(--tgui--secondary_hint_color);
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  // Dependency injection
  protected platformService = inject(PlatformService);
  private elementRef = inject(ElementRef);

  // Input signals
  /** Input type (text, password, email, etc.) */
  type = input<string>('text');
  
  /** Header text displayed above the input */
  header = input<string | null>(null);
  
  /** Content to be displayed before the form input (can be string or TemplateRef) */
  before = input<string | TemplateRef<any> | null>(null);
  
  /** Content to be displayed after the form input (can be string or TemplateRef) */
  after = input<string | TemplateRef<any> | null>(null);
  
  /** Visual status of the input */
  status = input<'default' | 'error' | 'focused'>('default');
  
  /** Whether the input is disabled */
  disabled = input<boolean>(false);
  
  /** Placeholder text */
  placeholder = input<string>('');
  
  /** Input value */
  value = input<string>('');
  
  // Computed values
  /** Combines wrapper classes based on platform */
  wrapperClasses = computed(() => {
    return {
      'wrapper': true,
      'wrapper--ios': this.platformService.isIOS(),
    }
  });

  // Event handlers
  /** Handles input events */
  onInput(event: Event): void {
    // Forward the input event
    const nativeEvent = new Event('input', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(nativeEvent);
  }

  /** Handles change events */
  onChange(event: Event): void {
    // Forward the change event
    const nativeEvent = new Event('change', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(nativeEvent);
  }
} 