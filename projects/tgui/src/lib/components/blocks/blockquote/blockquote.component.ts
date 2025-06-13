import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconContainerComponent } from '../icon-container/icon-container.component';
import { SubheadlineComponent } from '../../typography/subheadline/subheadline.component';
import { TguiDynamicIconComponent } from '../../../icons/dynamic-icon.component';
/**
 * Renders a stylized blockquote element, typically used for quotations or special text.
 * The component can display a text in the subheadline and content below it.
 * The component can include a customizable icon in the top right corner.
 * 
 * ## Usage
 * 
 * ```html
 * <tgui-blockquote icon="quote" text="Optional headline text">
 *   Content of the blockquote
 * </tgui-blockquote>
 * ```
 * 
 * ### Properties
 * 
 * - `icon`: Optional input to specify which icon to display in the top-right corner.
 *   Default is "quote" icon. Uses the dynamic icon component.
 *   
 * - `text`: Optional text to be displayed as a headline above the content.
 *   If provided, it will be wrapped in the subheadline component.
 */
@Component({
  selector: 'tgui-blockquote',
  standalone: true,
  imports: [
    CommonModule, 
    IconContainerComponent, 
    SubheadlineComponent,
    TguiDynamicIconComponent
  ],
  template: `
    <!-- Text displayed as subheadline if provided -->
    <tgui-subheadline *ngIf="text()">
      {{ text() }}
    </tgui-subheadline>
    
    <!-- Main content -->
    <ng-content></ng-content>
    
    <!-- Icon -->
    <tgui-icon-container class="top-right-icon">
      <tgui-dynamic-icon [icon]="icon()"></tgui-dynamic-icon>
    </tgui-icon-container>
  `,
  styles: [`
    :host {
      position: relative;
      padding: 6px 28px 8px 12px;
      display: block;
      border-left: 3px solid var(--tgui--link_color);
      border-radius: 4px;
      background: var(--tgui--secondary_fill);
    }

    .top-right-icon {
      position: absolute;
      top: 4px;
      right: 6px;
      display: block;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockquoteComponent {
  /** The icon to display in the top right corner. Default is "quote". */
  icon = input<string>('quote');
  
  /** Optional text to display as a headline above the content. */
  text = input<string | undefined>(undefined);
} 