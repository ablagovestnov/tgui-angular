import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input, 
  signal,
  computed,
  inject,
  ElementRef,
  effect,
  output,
  forwardRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisuallyHiddenDirective } from '../../../directives/visually-hidden.directive';
import { 
  IconCheckboxComponent, 
  IconCheckboxCheckedComponent,
  IconCheckboxIndeterminateComponent 
} from './icons';
import { PlatformService } from '../../../services/platform.service';

/**
 * Renders a checkbox input with custom styling and optional indeterminate state.
 * The component visually hides the actual input element for accessibility 
 * while providing a custom styled appearance.
 */
@Component({
  selector: 'tgui-checkbox',
  standalone: true,
  imports: [
    CommonModule, 
    VisuallyHiddenDirective, 
    IconCheckboxComponent, 
    IconCheckboxCheckedComponent,
    IconCheckboxIndeterminateComponent
  ],
  template: `
    <label
      class="wrapper"
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
      <tgui-icon-checkbox class="icon" aria-hidden="true" />
      <div aria-hidden="true" class="checkedIcon">
        <tgui-icon-checkbox-indeterminate *ngIf="indeterminate()" />
        <tgui-icon-checkbox-checked *ngIf="!indeterminate() && checked()" />
      </div>
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
      transition: opacity .15s ease-out;
    }

    .input:checked ~ .checkedIcon {
      opacity: 1;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent {
  // Service injection
  private platformService = inject(PlatformService);
  private elementRef = inject(ElementRef);

  // Input parameters
  /** Value of the name attribute for input */
  name = input<string>('');
  
  /** Value of the value attribute for input */
  value = input<string>('');
  
  /** Set checked state */
  checked = input<boolean>(false);
  
  /** Set disabled state */
  disabled = input<boolean>(false);
  
  /** Set indeterminate state */
  indeterminate = input<boolean>(false);
  
  // Output events
  /** Event when state changes */
  change = output<Event>();
  
  // Methods
  /** Change event handler */
  onChange(event: Event): void {
    if (!this.disabled()) {
      // Останавливаем всплытие оригинального события чтобы избежать двойного вызова
      event.stopPropagation();
      
      // Pass event outward
      this.change.emit(event);
    }
  }
} 