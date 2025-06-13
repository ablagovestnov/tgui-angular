import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input, 
  output,
  inject,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisuallyHiddenDirective } from '../../../directives/visually-hidden.directive';
import { 
  IconRadioComponent, 
  IconRadioCheckedComponent
} from './icons';
import { PlatformService } from '../../../services/platform.service';

/**
 * Renders a radio button input with custom styling.
 * The component visually hides the actual input element for accessibility 
 * while providing a custom styled appearance.
 */
@Component({
  selector: 'tgui-radio',
  standalone: true,
  imports: [
    CommonModule, 
    VisuallyHiddenDirective, 
    IconRadioComponent, 
    IconRadioCheckedComponent
  ],
  template: `
    <label
      class="wrapper"
      [class.wrapper--disabled]="disabled()"
    >
      <input
        tguiVisuallyHidden
        type="radio"
        class="input"
        [checked]="checked()"
        [disabled]="disabled()"
        [attr.name]="name()"
        [attr.value]="value()"
        (change)="onChange($event)"
      />
      <svg class='icon' width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0 2a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" fill="currentColor"></path>
      </svg>
      <svg class='checkedIcon' width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0 2a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" fill="currentColor"></path>
        <path d="M15 10a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" fill="currentColor"></path></svg>
    </label>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    .wrapper {
      cursor: pointer;
      position: relative;
    }

    .wrapper--disabled {
      cursor: default;
      opacity: .3;
    }

        .icon {
        display: block;
        color: var(--tgui--outline);
        }

        .checkedIcon {
        position: absolute;
        top: 0;

        opacity: 0;
        color: var(--tgui--link_color);
        }

        .icon,
        .checkedIcon {
        transition: opacity .15s ease-out;
        }

        .input:checked ~ .icon {
        opacity: 0;
        }

        .input:checked ~ .checkedIcon {
        opacity: 1;
        }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioComponent {
  // Service injections
  private platformService = inject(PlatformService);
  private elementRef = inject(ElementRef);

  // Input parameters
  /** Name attribute for input */
  name = input<string>('');
  
  /** Value attribute for input */
  value = input<string>('');
  
  /** Sets the checked state */
  checked = input<boolean>(false);
  
  /** Sets the disabled state */
  disabled = input<boolean>(false);
  
  // Output events
  /** Event emitted on change */
  change = output<Event>();
  
  // Methods
  /** Change event handler */
  onChange(event: Event): void {
    if (!this.disabled()) {
      // Останавливаем всплытие оригинального события чтобы избежать двойного вызова
      event.stopPropagation();
      
      // Emit the event
      this.change.emit(event);
    }
  }
} 