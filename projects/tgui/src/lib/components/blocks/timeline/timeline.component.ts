import { Component, ViewEncapsulation, ContentChildren, QueryList, input, HostBinding, AfterContentInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineItemComponent } from './components/timeline-item/timeline-item.component';
import { HorizontalScrollDirective } from '../../../directives/horizontal-scroll.directive';

@Component({
  selector: 'tgui-timeline',
  standalone: true,
  imports: [CommonModule, TimelineItemComponent, HorizontalScrollDirective],
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 32px 44px;
      margin: 0;
    }
    
    :host.horizontal {
      flex-direction: row;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated
})
export class TimelineComponent implements AfterContentInit {
  active = input<number | undefined>(undefined);
  horizontal = input<boolean | undefined>(undefined);
  
  @ContentChildren(TimelineItemComponent) items!: QueryList<TimelineItemComponent>;
  
  constructor() {
    effect(() => {
      const activeValue = this.active();
      console.log('Active signal changed to:', activeValue);
      
      // We need to access the value inside the effect to track it
      // But we'll only update items when they're available
      if (this.items && activeValue !== undefined) {
        this.updateItemsMode();
      }
    });
  }
  
  @HostBinding('class.horizontal')
  get isHorizontal(): boolean {
    return !!this.horizontal();
  }
  
  @HostBinding('attr.tguiHorizontalScroll')
  get needsHorizontalScroll(): any {
    return this.horizontal() ? '' : null;
  }
  
  ngAfterContentInit(): void {
    // Initial setup of items after they're available
    if (this.active() !== undefined) {
      this.updateItemsMode();
    }
    
    // Listen for changes to the items QueryList
    this.items.changes.subscribe(() => {
      if (this.active() !== undefined) {
        this.updateItemsMode();
      }
    });
  }
  
  private updateItemsMode(): void {
    console.log('updateItemsMode called, active value:', this.active());
    
    this.items.forEach((item, index) => {
      // Convert to 1-based index for comparison (like in React implementation)
      const oneBasedIndex = index + 1;
      
      if (oneBasedIndex <= this.active()!) {
        item.mode = 'active';
      } else if (oneBasedIndex === this.active()! + 1) {
        item.mode = 'pre-active';
      } else {
        item.mode = undefined;
      }
      
      // Pass horizontal property to children
      item.horizontal = this.horizontal();
    });
  }
} 