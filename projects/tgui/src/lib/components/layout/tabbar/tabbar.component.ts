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
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixedLayoutComponent } from '../fixed-layout/fixed-layout.component';
import { TabbarItemComponent } from './tabbar-item.component';

/**
 * Serves as a container for `TabbarItem` components, rendering a navigational tab bar.
 * Utilizes a `FixedLayout` to ensure the tab bar remains positioned at a specific area within a view,
 * typically at the bottom of the screen, making it ideal for mobile or web application navigation menus.
 *
 * The component adapts its styling based on the platform, providing a consistent look and feel across different devices.
 */
@Component({
  selector: 'tgui-tabbar',
  standalone: true,
  imports: [CommonModule, FixedLayoutComponent],
  template: `
    <tgui-fixed-layout vertical="bottom">
      <div class="tabbar-container">
        <ng-content></ng-content>
      </div>
    </tgui-fixed-layout>
  `,
  styles: [`
    :host {
      display: block;
    }

    .tabbar-container {
      display: flex;
      justify-items: stretch;
      box-shadow: 0 -1px 0 var(--tgui--divider);
      background: var(--tgui--surface_primary);
      padding: 0 16px;
    }

    :host-context(.tgui-platform-ios) .tabbar-container {
      padding: 0;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'attr.data-refresh-platform': 'true'
  }
})
export class TabbarComponent implements AfterContentInit {
  /** Index of the selected tab */
  selectedIndex = input<number>(0);
  
  /** Event emitted when selected tab changes */
  selectedIndexChange = output<number>();
  
  /** Internal signal for tracking active tab */
  private activeTabIndex = signal<number>(0);
  
  /** All tab items */
  @ContentChildren(TabbarItemComponent) tabbarItems!: QueryList<TabbarItemComponent>;
  
  constructor() {
    // Synchronize external selectedIndex with internal activeTabIndex
    effect(() => {
      this.activeTabIndex.set(this.selectedIndex());
      this.updateSelectedState();
    });
  }
  
  ngAfterContentInit(): void {
    // Initialize selected element
    this.updateSelectedState();
    
    // Subscribe to tabbarItems changes to update selected tab
    this.tabbarItems.changes.subscribe(() => {
      this.updateSelectedState();
    });
  }
  
  /**
   * Handles tab selection event
   * @param index Index of selected tab
   */
  selectTab(index: number): void {
    if (index !== this.activeTabIndex()) {
      this.activeTabIndex.set(index);
      this.selectedIndexChange.emit(index);
      this.updateSelectedState();
    }
  }
  
  /**
   * Updates "selected" state for all child elements
   */
  private updateSelectedState(): void {
    if (!this.tabbarItems) return;
    
    const activeIndex = this.activeTabIndex();
    this.tabbarItems.forEach((item, index) => {
      // Set selected state through signal
      item.selected.set(index === activeIndex);
      // Set index for tab
      item.tabIndex = index;
      // Set callback for click tracking
      item.onSelect = () => this.selectTab(index);
    });
  }
} 