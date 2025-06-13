import { 
  Component, 
  ViewEncapsulation, 
  HostListener,
  inject,
  input,
  effect,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

import { CellComponent } from '../../../cell/cell.component';
import { AccordionComponent } from '../../accordion.component';
import { TguiIcon24ChevronDown } from '../../../../../icons/icon24/tgui-icon24-chevron-down';

/**
 * `AccordionSummary` serves as the clickable header for an accordion section, toggling the visibility of the content.
 * It incorporates an expand/collapse icon to visually indicate state. This component extends `Cell` to provide
 * a consistent UI and accessibility features.
 * 
 * ## Usage
 * 
 * ```html
 * <!-- Using default chevron icon -->
 * <tgui-accordion-summary>
 *   Accordion title
 * </tgui-accordion-summary>
 * 
 * <!-- Using custom after template -->
 * <tgui-accordion-summary [afterTemplate]="customAfterTemplate">
 *   Accordion title
 * </tgui-accordion-summary>
 * 
 * <ng-template #customAfterTemplate>
 *   <tgui-badge type="number">5</tgui-badge>
 * </ng-template>
 * ```
 * 
 * ## Template Inputs
 * 
 * The component accepts the following template inputs:
 * 
 * - `afterTemplate`: Optional template displayed on the right side of the cell (replaces the default chevron)
 */
@Component({
  selector: 'tgui-accordion-summary',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet, CellComponent, TguiIcon24ChevronDown],
  template: `
    <tgui-cell
      [id]="accordion.labelId()"
      [attr.aria-expanded]="accordion.expanded"
      [attr.aria-controls]="accordion.contentId()"
      [afterTemplate]="getAfterTemplate()"
    >
      <ng-content></ng-content>
    </tgui-cell>
    
    <!-- Default chevron template -->
    <ng-template #defaultChevronTemplate>
      <tgui-icon24-chevron-down 
        class="chevron"
        [class.chevron--expanded]="isExpanded"
      ></tgui-icon24-chevron-down>
    </ng-template>
  `,
  styles: [`
    .chevron {
      transition: transform .15s ease-out;
      color: var(--tgui--link_color);
    }
    
    .chevron--expanded {
      transform: rotate(180deg);
    }
  `],
  encapsulation: ViewEncapsulation.Emulated
})
export class AccordionSummaryComponent {
  /** Template displayed on the right side of the cell (replaces the default chevron) */
  afterTemplate = input<TemplateRef<any> | null>(null);
  
  protected accordion = inject(AccordionComponent);
  
  // Property to track expanded state instead of calling the function in template
  isExpanded = false;
  
  // Reference to the default chevron template
  @ViewChild('defaultChevronTemplate', { static: true })
  defaultChevronTemplate!: TemplateRef<any>;
  
  constructor() {
    // Use effect to respond to changes in the expanded signal
    effect(() => {
      this.isExpanded = this.accordion._expanded();
    });
  }

  @HostListener('click')
  onClick(): void {
    this.accordion.toggleExpanded();
  }

  /** Get the template to display in the after slot */
  getAfterTemplate(): TemplateRef<any> | null {
    return this.afterTemplate() || this.defaultChevronTemplate;
  }
} 