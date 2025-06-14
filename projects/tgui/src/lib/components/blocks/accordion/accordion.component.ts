import { 
  Component, 
  ViewEncapsulation, 
  input,
  signal, 
  computed,
  inject,
  HostBinding,
  effect,
  output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
  NgZone,
  model
} from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { CellComponent } from '../cell/cell.component';
import { TguiIcon24ChevronDown } from '../../../icons/icon24/tgui-icon24-chevron-down';

/**
 * This component serves as an accordion container with built-in summary and content sections.
 * It uses a signal-based approach to manage its state.
 * 
 * ## Usage
 * ```html
 * <!-- With string summary -->
 * <tgui-accordion 
 *   summary="Simple string title"
 *   [(expanded)]="isExpanded">
 *   Accordion content here
 * </tgui-accordion>
 * 
 * <!-- With template summary -->
 * <tgui-accordion 
 *   [summary]="summaryTemplate"
 *   [afterTemplate]="afterTemplate"
 *   [(expanded)]="isExpanded">
 *   Accordion content here
 * </tgui-accordion>
 * ```
 */
@Component({
  selector: 'tgui-accordion',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet, CellComponent, TguiIcon24ChevronDown],
  template: `
    <!-- Summary section -->
    <tgui-cell
      [id]="labelId()"
      [attr.aria-expanded]="expanded()"
      [attr.aria-controls]="contentId()"
      [afterTemplate]="getAfterTemplate()"
      (click)="toggleExpanded()"
    >
      <ng-container *ngTemplateOutlet="getSummaryTemplate()"></ng-container>
    </tgui-cell>
    
    <!-- Content section -->
    <div
      class="accordion-content"
      [attr.id]="contentId()"
      [attr.role]="'region'"
      [attr.aria-labelledby]="labelId()"
      [attr.aria-hidden]="!expanded()"
    >
      <div 
        class="accordion-body"
        #bodyElement
        [style.maxHeight]="maxHeight()"
      >
        <ng-content></ng-content>
      </div>
    </div>

    <!-- Default summary template for string input -->
    <ng-template #defaultStringTemplate>
      {{summary()}}
    </ng-template>

    <!-- Default chevron template -->
    <ng-template #defaultChevronTemplate>
      <tgui-icon24-chevron-down 
        class="chevron"
        [class.chevron--expanded]="expanded()"
      ></tgui-icon24-chevron-down>
    </ng-template>
  `,
  styles: [`
    :host {
      display: block;
    }

    .accordion-content {
      display: block;
      overflow: hidden;
      background: var(--tgui--bg_color);
    }
    
    .accordion-body {
      max-block-size: 0;
      transition: max-height 200ms ease-in-out;
    }

    .chevron {
      transition: transform .15s ease-out;
      color: var(--tgui--link_color);
    }
    
    .chevron--expanded {
      transform: rotate(180deg);
    }

    .default-summary {
      color: var(--tgui--text_color);
      opacity: 0.5;
      font-style: italic;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated
})
export class AccordionComponent implements AfterViewInit, OnDestroy {
  /**
   * Optional ID for the accordion element
   */
  readonly id = input<string>(`tgui-accordion-${Math.random().toString(36).substring(2, 9)}`);

  /**
   * Summary content - can be either a string or a template
   */
  readonly summary = input.required<string | TemplateRef<any>>();

  /**
   * Template displayed on the right side of the summary (replaces the default chevron)
   */
  readonly afterTemplate = input<TemplateRef<any> | null>(null);

  /**
   * Model value for expanded state with two-way binding support
   */
  readonly expanded = model(false);

  /**
   * @deprecated Use expanded() instead
   * Internal signal for expansion state, kept for backward compatibility
   */
  readonly _expanded = signal(false);

  /** Signal for dynamically setting max-height */
  protected maxHeight = signal('0px');

  /** Track when component is initialized */
  private initialized = signal(false);

  @ViewChild('bodyElement') private bodyElement!: ElementRef<HTMLDivElement>;
  @ViewChild('defaultChevronTemplate', { static: true }) private defaultChevronTemplate!: TemplateRef<any>;
  @ViewChild('defaultStringTemplate', { static: true }) private defaultStringTemplate!: TemplateRef<any>;

  private ngZone = inject(NgZone);
  
  /** Computed ID for the label element */
  readonly labelId = computed(() => `${this.id()}-label`);
  
  /** Computed ID for the content element */
  readonly contentId = computed(() => `${this.id()}-content`);

  // Observer for changes in content height
  private mutationObserver: MutationObserver | null = null;
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    // Sync expanded model with internal state
    effect(() => {
      this._expanded.set(this.expanded());
    });

    // Effect to update max-height when expanded status changes
    effect(() => {
      this.updateMaxHeight(this.expanded(), this.initialized());
    });
  }

  /** Get appropriate template based on summary type */
  getSummaryTemplate(): TemplateRef<any> {
    const summary = this.summary();
    if (summary instanceof TemplateRef) {
      return summary;
    }
    return this.defaultStringTemplate;
  }

  /** Get the template to display in the after slot */
  getAfterTemplate(): TemplateRef<any> | null {
    return this.afterTemplate() || this.defaultChevronTemplate;
  }

  /**
   * Toggle the expanded state of the accordion
   */
  toggleExpanded(): void {
    this.expanded.update(state => !state);
  }

  ngAfterViewInit(): void {
    this.initialized.set(true);
    this.updateMaxHeight(this.expanded(), true);
    this.setupContentObservers();
  }
  
  ngOnDestroy(): void {
    this.disconnectObservers();
  }

  /**
   * Set up observers to detect changes in content size
   */
  private setupContentObservers(): void {
    if (!this.bodyElement?.nativeElement) return;
    
    // Run outside Angular zone for better performance
    this.ngZone.runOutsideAngular(() => {
      // Observer for attribute changes
      this.mutationObserver = new MutationObserver(() => {
        if (this.expanded()) {
          this.updateContentHeight();
        }
      });
      
      this.mutationObserver.observe(this.bodyElement.nativeElement, {
        attributes: true,
        childList: true,
        subtree: true
      });
      
      // Observer for size changes of child elements
      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(() => {
          if (this.expanded()) {
            this.updateContentHeight();
          }
        });
        
        this.resizeObserver.observe(this.bodyElement.nativeElement);
      }
    });
  }

  /**
   * Disconnect all observers during component destruction
   */
  private disconnectObservers(): void {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
    
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  /**
   * Update height based on current content
   */
  private updateContentHeight(): void {
    if (!this.bodyElement?.nativeElement) return;
    
    // Need to run this inside Angular zone to update the UI
    this.ngZone.run(() => {
      const scrollHeight = this.bodyElement.nativeElement.scrollHeight;
      this.maxHeight.set(`${scrollHeight}px`);
    });
  }

  /**
   * Calculates and sets the appropriate max-height based on content
   */
  private updateMaxHeight(expanded: boolean, initialized: boolean): void {
    if (!expanded) {
      this.maxHeight.set('0px');
      return;
    }
    
    // We don't know the height of the element in the first render
    if (!initialized || !this.bodyElement) {
      this.maxHeight.set('inherit');
      return;
    }
    
    const scrollHeight = this.bodyElement.nativeElement.scrollHeight;
    this.maxHeight.set(`${scrollHeight}px`);
  }
} 