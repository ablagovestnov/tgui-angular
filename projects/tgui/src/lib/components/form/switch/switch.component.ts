import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input, 
  computed,
  inject,
  ElementRef,
  forwardRef,
  output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisuallyHiddenDirective } from '../../../directives/visually-hidden.directive';
import { PlatformService } from '../../../services/platform.service';

/**
 * A custom switch component that mimics the behavior of a checkbox input but with enhanced styling.
 * It supports all the standard attributes of an HTML input element of type "checkbox".
 * The appearance of the switch can be customized to match either a base or iOS platform style.
 */
@Component({
  selector: 'tgui-switch',
  standalone: true,
  imports: [
    CommonModule, 
    VisuallyHiddenDirective
  ],
  template: `
    <label
      class="wrapper"
      [class.wrapper--base]="platformService.platform() === 'base'"
      [class.wrapper--ios]="platformService.platform() === 'ios'"
      [class.wrapper--disabled]="disabled()"
    >
      <input
        tguiVisuallyHidden
        type="checkbox"
        class="input"
        [checked]="checked()"
        [disabled]="disabled()"
        [attr.name]="name()"
        [attr.value]="value()"
        (change)="onChange($event)"
      />
      <div aria-hidden="true" class="control"></div>
      <ng-content></ng-content>
    </label>
  `,
  styles: [`
    .wrapper {
      position: relative;
      overflow: hidden;

      display: flex;
      align-items: center;
      cursor: pointer;

      width: 52px;
      height: 32px;

      border-radius: 16px;
    }

    .wrapper--disabled {
      cursor: default;
      opacity: .4;
    }

    .control::before {
      position: absolute;
      content: '';
      inset: 0;

      background: var(--tgui--secondary_bg_color);
    }

    .wrapper--base .control::before {
      border-radius: 16px;
      border: 3px solid var(--tgui--secondary_hint_color);
    }

    .control::after {
      position: absolute;
      content: '';

      top: 50%;
      transform: translateY(-50%);

      border-radius: 50%;
    }

    .wrapper--base .control::after {
      width: 16px;
      height: 16px;

      margin-left: 8px;
      background: var(--tgui--secondary_hint_color);
    }

    .wrapper--ios .control::after {
      width: 28px;
      height: 28px;

      margin-left: 2px;
      box-shadow:
          0 3px 1px 0 rgba(0, 0, 0, .06),
          0 3px 8px 0 rgba(0, 0, 0, .15),
          0 0 0 1px rgba(0, 0, 0, .04);
      background: var(--tgui--white);
    }

    .input:checked + .control::before {
      border-color: var(--tgui--link_color);
      background-color: var(--tgui--link_color);
    }

    .wrapper--base .input:checked + .control::after {
      width: 24px;
      height: 24px;
    }

    .input:checked + .control::after {
      transform: translateX(20px) translateY(-50%);
    }

    .wrapper--base .input:checked + .control::after {
      background: var(--tgui--white);
      transform: translateX(16px) translateY(-50%);
    }

    @media (prefers-reduced-motion: no-preference) {
      .control::before {
        transition: background-color, border-color 67ms linear;
      }

      .control::after {
        /** Value from https://material-web.dev/components/switch/ */
        transition: transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s
      }

      .wrapper--ios .control::before {
        transition: background-color 0.2s ease;
      }

      .wrapper--ios .control::after {
        transition: transform 0.2s cubic-bezier(0.36, -0.24, 0.26, 1.32);
      }
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwitchComponent {
  // Services
  public platformService = inject(PlatformService);
  private elementRef = inject(ElementRef);

  // Input parameters
  /** The name attribute for the input */
  name = input<string>('');
  
  /** The value attribute for the input */
  value = input<string>('');
  
  /** Sets the checked state */
  checked = input<boolean>(false);
  
  /** Sets the disabled state */
  disabled = input<boolean>(false);
  
  // Output events
  /** Event emitted when the switch state changes */
  change = output<Event>();
  
  // Methods
  /** Handler for change event */
  onChange(event: Event): void {
    if (!this.disabled()) {
      // Останавливаем всплытие оригинального события чтобы избежать двойного вызова
      event.stopPropagation();
      
      // Эмитируем событие от имени switch компонента
      this.change.emit(event);
    }
  }
} 