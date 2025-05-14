import { 
  Component, 
  ViewEncapsulation, 
  Input, 
  signal, 
  computed,
  ContentChild,
  inject,
  HostBinding
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * This component serves as a container for an accordion item, comprising a summary and
 * content sections. It uses a signal-based approach to manage its state and to allow its children
 * (`tgui-accordion-summary` and `tgui-accordion-content`) to access shared state.
 */
@Component({
  selector: 'tgui-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class AccordionComponent {
  /**
   * Optional ID for the accordion element, enhancing accessibility (a11y) by associating the accordion
   * summary and content. If not provided, a unique ID will be generated automatically.
   * This ID is crucial for screen readers and other assistive technologies to understand the
   * relationship between the accordion header and content.
   */
  @Input() set id(value: string | undefined) {
    if (value) {
      this._id.set(value);
    }
  }

  /**
   * Determines whether the accordion is currently expanded or collapsed.
   */
  @Input() set expanded(value: boolean) {
    this._expanded.set(value);
  }
  
  get expanded(): boolean {
    return this._expanded();
  }

  /**
   * Host binding to add the expanded class when the accordion is expanded
   */
  @HostBinding('class.accordion-expanded') get isExpanded(): boolean {
    return this.expanded;
  }

  /** Public readonly signal for expansion state */
  readonly _expanded = signal(false);
  
  /** Internal signal for ID */
  private _id = signal(`tgui-accordion-${Math.random().toString(36).substring(2, 9)}`);
  
  /** Computed ID for the label element */
  readonly labelId = computed(() => `${this._id()}-label`);
  
  /** Computed ID for the content element */
  readonly contentId = computed(() => `${this._id()}-content`);

  /**
   * Toggle the expanded state of the accordion
   */
  toggleExpanded(): void {
    this._expanded.update(state => !state);
  }
} 