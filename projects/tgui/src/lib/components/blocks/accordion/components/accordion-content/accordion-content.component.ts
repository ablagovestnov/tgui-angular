import { 
  Component, 
  ViewEncapsulation, 
  inject,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  signal,
  effect,
  ViewChild,
  HostBinding,
  NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionComponent } from '../../accordion.component';

/**
 * Renders the content part of an accordion, leveraging signals to control visibility and animation.
 * Utilizes element measurements for smooth height transitions during expand/collapse actions.
 */
@Component({
  selector: 'tgui-accordion-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="body"
      #bodyElement
      [style.maxHeight]="maxHeight()"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      overflow: hidden;
      background: var(--tgui--bg_color);
    }
    
    .body {
      max-block-size: 0;
      transition: max-height 200ms ease-in-out;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated
})
export class AccordionContentComponent implements AfterViewInit, OnDestroy {
  @ViewChild('bodyElement') bodyElement!: ElementRef<HTMLDivElement>;
  
  protected accordion = inject(AccordionComponent);
  private ngZone = inject(NgZone);
  
  // Signal for dynamically setting max-height
  maxHeight = signal('0px');
  
  // Bind aria attributes for accessibility
  @HostBinding('attr.id') get contentId() { return this.accordion.contentId(); }
  @HostBinding('attr.role') role = 'region';
  @HostBinding('attr.aria-labelledby') get labelId() { return this.accordion.labelId(); }
  @HostBinding('attr.aria-hidden') get ariaHidden() { return !this.accordion.expanded; }
  
  // Track when component is initialized
  private initialized = signal(false);
  
  // Observer for changes in content height (like nested accordions expanding)
  private mutationObserver: MutationObserver | null = null;
  private resizeObserver: ResizeObserver | null = null;
  
  constructor() {
    // Effect to update max-height when expanded status changes
    effect(() => {
      this.updateMaxHeight(this.accordion._expanded(), this.initialized());
    });
  }
  
  ngAfterViewInit(): void {
    this.initialized.set(true);
    this.updateMaxHeight(this.accordion._expanded(), true);
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
      // Observer for attribute changes (like class changes on nested accordions)
      this.mutationObserver = new MutationObserver(() => {
        if (this.accordion._expanded()) {
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
          if (this.accordion._expanded()) {
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