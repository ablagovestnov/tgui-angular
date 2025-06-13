import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input, 
  computed,
  inject,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../../services/platform.service';
import { FormInputComponent } from '../form-input/form-input.component';
import { SubheadlineComponent, TextComponent } from '../../typography';
import { TguiIcon20ChevronDown } from '../../../icons/icon20/tgui-icon20-chevron-down';

/**
 * Renders a custom styled select input within a `FormInput` container. This component is designed to integrate seamlessly
 * with the form input styles, providing a consistent look and enhanced features such as a custom dropdown arrow and support
 * for platform-specific typography. The `FormInput` wrapper facilitates the inclusion of headers and status messages.
 */
@Component({
  selector: 'tgui-select',
  standalone: true,
  imports: [
    CommonModule, 
    FormInputComponent, 
    SubheadlineComponent, 
    TextComponent,
    TguiIcon20ChevronDown
  ],
  template: `
    <tgui-form-input
      [status]="status()"
      [header]="header()"
      [inputBefore]="before()"
      [class]="wrapperClasses()"
    >
      <div class="select-container">
        <select 
          class="select"
          [disabled]="disabled()"
        >
          <ng-content></ng-content>
        </select>
        
        <tgui-icon20-chevron-down aria-hidden="true" class="chevron"></tgui-icon20-chevron-down>
      </div>
    </tgui-form-input>
  `,
  styles: [`
    :host {
      display: block;
    }

    .select-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }

    .select {
      appearance: none;
      width: 100%;
      height: 100%;
      border: none;
      color: var(--tgui--text_color);
      outline: none;
      border-radius: inherit;
      background: inherit;
      font-family: var(--tgui--font-family);
    }

    /* iOS styles */
    :host-context(.tgui-platform-ios) .select {
      font-size: var(--tgui--text--font_size);
      line-height: var(--tgui--text--line_height);
      font-weight: var(--tgui--font_weight--accent3);
    }

    /* Android/Web styles */
    :host-context(.tgui-platform-base) .select {
      font-size: var(--tgui--subheadline1--font_size);
      line-height: var(--tgui--subheadline1--line_height);
      font-weight: var(--tgui--font_weight--accent3);
    }

    .chevron {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      color: var(--tgui--secondary_hint_color);
      pointer-events: none;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent {
  // Dependency injection
  protected platformService = inject(PlatformService);
  private elementRef = inject(ElementRef);

  // Input signals
  /** Header text displayed above the input */
  header = input<string | null>(null);
  
  /** Content to be displayed before the form input */
  before = input<string | null>(null);
  
  /** Visual status of the input */
  status = input<'default' | 'error' | 'focused'>('default');
  
  /** Whether the input is disabled */
  disabled = input<boolean>(false);
  
  // Computed values
  /** Combines wrapper classes based on platform */
  wrapperClasses = computed(() => {
    return {
      'wrapper': true,
      'wrapper--ios': this.platformService.isIOS(),
    }
  });
} 