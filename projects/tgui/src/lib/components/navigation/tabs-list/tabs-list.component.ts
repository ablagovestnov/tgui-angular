import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  ContentChildren,
  QueryList,
  AfterContentInit,
  input,
  output,
  signal,
  effect,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsItemComponent } from './tabs-item.component';
import { Subscription } from 'rxjs';

/**
 * The TabsList component renders a list of tabs, typically used for navigating between different views
 * or filtering content. It visually indicates the currently active tab and supports custom styling.
 */
@Component({
  selector: 'tgui-tabs-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tabs-container" role="tablist">
      <div 
        *ngIf="hasSelectedTab()"
        aria-hidden="true"
        class="slider"
        [style.width.%]="100 / tabsCount()"
        [style.transform]="getSliderTransform()"
      ></div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      overflow: hidden; /* Clip content if it overflows */
    }

    .tabs-container {
      overflow: hidden;
      position: relative;
      display: flex;
      align-items: center;
      align-content: stretch;
      width: 100%;
      height: 100%;
      /* Remove gap as it can interfere with compression */
      /* Use flex container for even space distribution */
    }

    /* Ensure TabsItem child elements are evenly distributed */
    ::ng-deep .tabs-container > tgui-tabs-item {
      flex: 1 1 0;
      min-width: 0; /* Important for flex element compression */
      margin: 0 6px; /* Add horizontal margins instead of gap */
    }

    /* Remove margin from first and last elements for alignment */
    ::ng-deep .tabs-container > tgui-tabs-item:first-child {
      margin-left: 0;
    }

    ::ng-deep .tabs-container > tgui-tabs-item:last-child {
      margin-right: 0;
    }

    .slider {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 3px;
      transition: transform 125ms;
      border-radius: 4px 4px 1px 1px;
      background: var(--tgui--button_color);
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsListComponent implements AfterContentInit, OnDestroy {
  /** Index of selected tab */
  selectedIndex = input<number>(0);
  
  /** Event for selected tab change */
  selectedIndexChange = output<number>();
  
  /** Number of tabs */
  tabsCount = signal<number>(0);
  
  /** Check if there is a selected tab */
  hasSelectedTab = signal<boolean>(false);
  
  /** Current selected index (internal) */
  private activeTabIndex = signal<number>(0);
  
  /** Get all TabsItem child elements */
  @ContentChildren(TabsItemComponent) tabItems!: QueryList<TabsItemComponent>;
  
  /** Subscriptions to tab events */
  private subscriptions: Subscription[] = [];
  
  constructor() {
    effect(() => {
      this.activeTabIndex.update(() => this.selectedIndex());
      this.updateSelectedState();
    });
  }
  
  ngAfterContentInit(): void {
    // Initialize tabs
    this.updateTabsCount();
    this.updateSelectedState();
    
    // Track changes in tab composition
    this.tabItems.changes.subscribe(() => {
      this.updateTabsCount();
      this.updateSelectedState();
    });
  }
  
  ngOnDestroy(): void {
    // Clean up subscriptions on component destruction
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  /** Gets transformation for slider */
  getSliderTransform(): string {
    return `translateX(${100 * this.activeTabIndex()}%)`;
  }
  
  /** Updates number of tabs */
  private updateTabsCount(): void {
    if (this.tabItems) {
      this.tabsCount.update(val => this.tabItems.length);
    }
  }
  
  /** Selects tab by index */
  selectTab(index: number): void {
    if (index !== this.activeTabIndex()) {
      this.activeTabIndex.update(() => index);
      this.selectedIndexChange.emit(index);
      this.updateSelectedState();
    }
  }
  
  /** Updates selected tabs state */
  private updateSelectedState(): void {
    if (!this.tabItems) return;
    
    const activeIndex = this.activeTabIndex();
    this.hasSelectedTab.update(() => activeIndex > -1 && activeIndex < this.tabItems.length);
    
    // Clear previous subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
    
    this.tabItems.forEach((item, index) => {
      // Update selected property in each tab through public method
      const isSelected = index === activeIndex;
      item.setSelected(isSelected);
      
      // Subscribe to selection event
      const subscription = item.select.subscribe(() => {
        this.selectTab(index);
      });
      
      this.subscriptions.push(subscription);
    });
  }
} 