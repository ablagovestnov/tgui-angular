import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input,
  HostBinding,
  ElementRef,
  inject,
  output,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy,
  signal,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompactPaginationItemComponent } from './compact-pagination-item.component';
import { Subscription } from 'rxjs';

/**
 * CompactPagination component displays a set of dots for pagination.
 * It's typically used in carousels, sliders, or any component requiring compact pagination controls.
 * 
 * The component supports different visual modes and manages the state of its pagination items.
 */
@Component({
  selector: 'tgui-compact-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      role="tablist"
      class="pagination-container"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    
    .pagination-container {
      --tgui--compact-pagination--dot--opacity--selected: .1;
      --tgui--compact-pagination--dot--background--selected: var(--tgui--link_color);
    
      display: inline-flex;
      gap: 8px;
      padding: 4px;
    }
    
    :host.ambient .pagination-container {
      --tgui--compact-pagination--dot--opacity--selected: .25;
      --tgui--compact-pagination--dot--background--selected: var(--tgui--white);
    
      padding: 8px 9px;
      gap: 6px;
      border-radius: 28px;
      background: rgba(0, 0, 0, .25);
      backdrop-filter: blur(22px);
      -webkit-backdrop-filter: blur(22px);
    }
    
    :host.white .pagination-container {
      --tgui--compact-pagination--dot--opacity--selected: .25;
      --tgui--compact-pagination--dot--background--selected: var(--tgui--white);
    
      gap: 6px;
      padding: 0;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompactPaginationComponent implements AfterContentInit, OnDestroy {
  /** Mode of the pagination */
  mode = input<'default' | 'ambient' | 'white'>('default');
  
  /** Selected index */
  selectedIndex = input<number>(0);
  
  /** Selected index change event */
  selectedIndexChange = output<number>();
  
  /** Current active index (internal) */
  private activeIndex = signal<number>(0);
  
  /** Element reference */
  private elementRef = inject(ElementRef);
  
  /** Get all pagination item components */
  @ContentChildren(CompactPaginationItemComponent) 
  paginationItems!: QueryList<CompactPaginationItemComponent>;
  
  /** Subscriptions to pagination item events */
  private subscriptions: Subscription[] = [];
  
  constructor() {
    effect(() => {
      this.activeIndex.set(this.selectedIndex());
      this.updateSelectedState();
    });
  }
  
  /** Host bindings for different modes */
  @HostBinding('class.ambient')
  get isAmbient(): boolean {
    return this.mode() === 'ambient';
  }
  
  @HostBinding('class.white')
  get isWhite(): boolean {
    return this.mode() === 'white';
  }
  
  ngAfterContentInit(): void {
    this.updateSelectedState();
    
    // Track changes in pagination items
    this.paginationItems.changes.subscribe(() => {
      this.updateSelectedState();
    });
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  /** Select item by index */
  selectItem(index: number): void {
    if (index !== this.activeIndex()) {
      this.activeIndex.set(index);
      this.selectedIndexChange.emit(index);
      this.updateSelectedState();
    }
  }
  
  /** Update the selected state of all items */
  private updateSelectedState(): void {
    if (!this.paginationItems?.length) return;
    
    // Clear previous subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
    
    const active = this.activeIndex();
    
    this.paginationItems.forEach((item, index) => {
      // Update selected state in each item
      if (item && typeof item.setSelected === 'function') {
        item.setSelected(index === active);
        
        // Subscribe to select events from items
        const subscription = item.select.subscribe(() => {
          this.selectItem(index);
        });
        
        this.subscriptions.push(subscription);
      }
    });
  }
} 