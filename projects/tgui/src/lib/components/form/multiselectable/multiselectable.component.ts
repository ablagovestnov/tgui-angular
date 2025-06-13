import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input, 
  output,
  inject,
  ElementRef,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisuallyHiddenDirective } from '../../../directives/visually-hidden.directive';
import { PlatformService } from '../../../services/platform.service';

/**
 * Renders a custom multiselectable checkbox input, adapting its icons based on the current platform (iOS or others).
 * Supports all standard input checkbox properties.
 */
@Component({
  selector: 'tgui-multiselectable',
  standalone: true,
  imports: [CommonModule, VisuallyHiddenDirective],
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
      <!-- Unchecked icon based on platform -->
      <svg *ngIf="!isIOS()" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon" aria-hidden="true">
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
      </svg>

      <svg *ngIf="isIOS()" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon" aria-hidden="true">
        <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" />
      </svg>

      <!-- Checked icon based on platform -->
      <svg *ngIf="!isIOS()" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" class="checkedIcon" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Z" fill="currentColor" />
        <path fillRule="evenodd" clipRule="evenodd"
          d="M15.375 6.56a1 1 0 0 1-.036 1.415l-6.31 6a1 1 0 0 1-1.416-.037l-2.84-3a1 1 0 0 1 1.453-1.375l2.15 2.272 5.585-5.31a1 1 0 0 1 1.414.036Z"
          fill="#fff" />
      </svg>

      <svg *ngIf="isIOS()" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" class="checkedIcon" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24Zm4.78-17.1a1 1 0 0 1 .32 1.38l-5.63 9a1 1 0 0 1-1.62.1l-3.37-4.12a1 1 0 1 1 1.54-1.27l2.5 3.05 4.88-7.82a1 1 0 0 1 1.38-.32Z"
          fill="currentColor" />
      </svg>
    </label>
  `,
  styles: [`

    .wrapper {
      position: relative;
      cursor: pointer;
    }
    
    .wrapper--disabled {
      cursor: default;
      opacity: .25;
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
export class MultiselectableComponent {
  // Service injection
  private platformService = inject(PlatformService);
  private elementRef = inject(ElementRef);

  // Input parameters
  /** Name attribute value for input */
  name = input<string>('');
  
  /** Value attribute value for input */
  value = input<string>('');
  
  /** Set checked state */
  checked = input<boolean>(false);
  
  /** Set disabled state */
  disabled = input<boolean>(false);
  
  // Output events
  /** Event when state changes */
  change = output<Event>();
  
  // Helper methods
  /** Checks if current platform is iOS */
  isIOS = computed(() => this.platformService.isIOS());

  /** Change event handler */
  onChange(event: Event): void {
    if (!this.disabled()) {
      // Останавливаем всплытие оригинального события чтобы избежать двойного вызова
      event.stopPropagation();
      
      this.change.emit(event);
    }
  }
} 