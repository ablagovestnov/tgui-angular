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

/**
 * Wraps a standard HTML textarea element within a `FormInput` container, applying custom styles and functionality.
 * This component inherits the flexible design of the `FormInput`, allowing it to display a header and reflect different status styles.
 * The appearance and behavior of the textarea can be customized through various props, providing a seamless integration with forms.
 */
@Component({
  selector: 'tgui-textarea',
  standalone: true,
  imports: [CommonModule, FormInputComponent, SubheadlineComponent, TextComponent],
  template: `
    <tgui-form-input
      [status]="status()"
      [header]="header()"
      [disabled]="disabled()"
      [class]="wrapperClasses()"
    >
      <ng-container *ngIf="platformService.isIOS(); else baseTemplate">
        <tgui-text class="textarea">
          <textarea 
            [disabled]="disabled()"
            [attr.placeholder]="placeholder()"
            [value]="value()"
            (input)="onInput($event)"
            (change)="onChange($event)"
          ></textarea>
        </tgui-text>
      </ng-container>
      
      <ng-template #baseTemplate>
        <tgui-subheadline class="textarea">
          <textarea 
            [disabled]="disabled()"
            [attr.placeholder]="placeholder()"
            [value]="value()"
            (input)="onInput($event)"
            (change)="onChange($event)"
          ></textarea>
        </tgui-subheadline>
      </ng-template>
    </tgui-form-input>
  `,
  styles: [`
    :host {
      display: block;
    }

    .wrapper {
      display: block;
    }

    .wrapper--ios {
      display: block;
    }

    .textarea {
      display: block;
      width: 100%;
      margin: 0;
      border: 0;
      outline: 0;
      resize: none;
      background: transparent;
      color: var(--tgui--text_color);
      font-family: var(--tgui--font-family);
      min-height: 48px;
    }

    .textarea textarea {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      border: 0;
      outline: 0;
      resize: none;
      background: transparent;
      color: var(--tgui--text_color);
      font-family: var(--tgui--font-family);
      font: inherit;
    }

    .textarea textarea::placeholder {
      color: var(--tgui--secondary_hint_color);
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent {
  // Dependency injection
  protected platformService = inject(PlatformService);
  private elementRef = inject(ElementRef);

  // Input signals
  /** Header text displayed above the textarea */
  header = input<string | null>(null);
  
  /** Visual status of the textarea */
  status = input<'default' | 'error' | 'focused'>('default');
  
  /** Whether the textarea is disabled */
  disabled = input<boolean>(false);
  
  /** Placeholder text */
  placeholder = input<string>('');
  
  /** Textarea value */
  value = input<string>('');

  // Computed values
  /** Combines wrapper classes based on platform */
  wrapperClasses = computed(() => {
    return {
      'wrapper': true,
      'wrapper--ios': this.platformService.isIOS()
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