import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input, 
  output,
  inject,
  forwardRef,
  ElementRef,
  TemplateRef
} from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ButtonCellComponent } from '../../blocks/cell/components/button-cell/button-cell.component';
import { VisuallyHiddenDirective } from '../../../directives/visually-hidden.directive';

/**
 * Renders a file input disguised as a button, enhancing the user interface and improving usability.
 * It leverages the `ButtonCell` component for consistent styling across the application.
 */
@Component({
  selector: 'tgui-file-input',
  standalone: true,
  imports: [
    CommonModule,
    NgTemplateOutlet,
    ButtonCellComponent, 
    VisuallyHiddenDirective
  ],
  template: `
    <div class="wrapper">
      <ng-content></ng-content>
      <tgui-button-cell [beforeTemplate]="beforeTemplate()">
        <label class="file-label">
          <input 
            tguiVisuallyHidden 
            type="file" 
            [attr.placeholder]="label()" 
            [attr.accept]="accept()"
            [attr.multiple]="multiple() ? true : null"
            [attr.disabled]="disabled() ? true : null"
            (change)="handleChange($event)"
          />
          {{ label() }}
        </label>
      </tgui-button-cell>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .wrapper {
      display: flex;
      flex-direction: column;
    }
    
    .file-label {
      display: flex;
      align-items: center;
      width: 100%;
      cursor: pointer;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileInputComponent {
  private elementRef = inject(ElementRef);

  /** Text label for the file input, used as the button label */
  label = input<string>('Attach file');
  
  /** File types that the input should accept */
  accept = input<string | undefined>(undefined);
  
  /** Whether multiple files can be selected */
  multiple = input<boolean>(false);
  
  /** Whether the input is disabled */
  disabled = input<boolean>(false);

  /** Template displayed before the main content */
  beforeTemplate = input<TemplateRef<any> | null>(null);
  
  /** Emitted when files are selected */
  change = output<Event>();
  
  /**
   * Handles the change event when files are selected
   */
  handleChange(event: Event): void {
    if (!this.disabled()) {
      // Останавливаем всплытие оригинального события чтобы избежать двойного вызова
      event.stopPropagation();
      
      this.change.emit(event);
    }
  }
} 