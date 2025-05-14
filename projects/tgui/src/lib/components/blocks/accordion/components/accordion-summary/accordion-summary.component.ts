import { 
  Component, 
  ViewEncapsulation, 
  HostListener,
  inject,
  input,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { CellComponent } from '../../../cell/cell.component';
import { AccordionComponent } from '../../accordion.component';
import { TguiIcon24ChevronDown } from '../../../../../icons/icon24/tgui-icon24-chevron-down';
import { ContentSlotDirective } from '../../../../../directives/content-slot.directive';

/**
 * `AccordionSummary` serves as the clickable header for an accordion section, toggling the visibility of the content.
 * It incorporates an expand/collapse icon to visually indicate state. This component extends `Cell` to provide
 * a consistent UI and accessibility features.
 */
@Component({
  selector: 'tgui-accordion-summary',
  standalone: true,
  imports: [CommonModule, CellComponent, TguiIcon24ChevronDown, ContentSlotDirective],
  template: `
    <tgui-cell
      [id]="accordion.labelId()"
      [attr.aria-expanded]="accordion.expanded"
      [attr.aria-controls]="accordion.contentId()"
    >
      <ng-content></ng-content>
      <div 
        content-slot="after" 
        *ngIf="!hasCustomAfter()"
      >
        <tgui-icon24-chevron-down 
          class="chevron"
          [class.chevron--expanded]="isExpanded"
        ></tgui-icon24-chevron-down>
      </div>
      <ng-content select="[content-slot=after]"></ng-content>
    </tgui-cell>
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
  /** Enables using a custom after element */
  hasCustomAfter = input<boolean>(false);
  
  protected accordion = inject(AccordionComponent);
  
  // Property to track expanded state instead of calling the function in template
  isExpanded = false;
  
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
} 