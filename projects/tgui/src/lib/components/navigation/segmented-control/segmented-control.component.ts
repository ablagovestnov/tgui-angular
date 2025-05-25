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
  OnDestroy,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegmentedControlItemComponent } from './segmented-control-item.component';
import { Subscription } from 'rxjs';
import { PlatformService } from '../../../services/platform.service';

/**
 * The SegmentedControl component renders a set of options as a segmented control,
 * commonly used for toggling between views or filtering content.
 * It is designed to adapt its appearance based on the platform,
 * offering a native look and feel.
 */
@Component({
  selector: 'tgui-segmented-control',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      role="tablist"
      class="segmented-container"
      [class.ios-platform]="isIOS"
    >
      <div class="segmented-body">
        <div 
          *ngIf="hasSelectedTab()"
          aria-hidden="true"
          class="slider"
          [class.ios-platform]="isIOS"
          [style.width.%]="100 / tabsCount()"
          [style.transform]="getSliderTransform()"
        ></div>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      overflow: hidden;
    }

    .segmented-container {
      overflow: hidden;
      width: 100%;
      height: 100%;
      padding: 2px;
      box-sizing: border-box;
      border-radius: 44px;
      background: var(--tgui--tertiary_bg_color);
    }

    .segmented-container.ios-platform {
      border-radius: 9px;
      background: var(--tgui--tertiary_bg_color);
    }

    .segmented-body {
      position: relative;
      display: flex;
      align-items: center;
      align-content: stretch;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border-radius: inherit;
    }

    .slider {
      position: absolute;
      inset: 0;
      transition: transform 150ms;
      border-radius: 40px;
      z-index: var(--tgui--z-index--simple);
      box-sizing: border-box;
      background: var(--tgui--segmented_control_active_bg);
    }

    .slider.ios-platform {
      border: var(--tgui--border--width) solid rgba(0, 0, 0, .04);
      border-radius: inherit;
      box-shadow:
          0 3px 1px 0 rgba(0, 0, 0, .04),
          0 3px 8px 0 rgba(0, 0, 0, .12);
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SegmentedControlComponent implements AfterContentInit, OnDestroy {
  /** Selected tab index */
  selectedIndex = input<number>(0);
  
  /** Selected index change event */
  selectedIndexChange = output<number>();
  
  /** Number of tabs */
  tabsCount = signal<number>(0);
  
  /** Check if there is a selected tab */
  hasSelectedTab = signal<boolean>(false);
  
  /** Current active tab index (internal) */
  private activeTabIndex = signal<number>(0);
  
  /** Get all child SegmentedControlItem elements */
  @ContentChildren(SegmentedControlItemComponent) tabItems!: QueryList<SegmentedControlItemComponent>;
  
  /** Subscriptions to tab events */
  private subscriptions: Subscription[] = [];
  
  /** Platform service to check platform type */
  private platformService = inject(PlatformService);
  
  constructor() {
    effect(() => {
      this.activeTabIndex.update(() => this.selectedIndex());
      this.updateSelectedState();
    });
  }
  
  /** Check if platform is iOS */
  get isIOS(): boolean {
    return this.platformService.isIOS();
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
    // Clean up subscriptions when component is destroyed
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  /** Get slider transform */
  getSliderTransform(): string {
    return `translateX(${100 * this.activeTabIndex()}%)`;
  }
  
  /** Update number of tabs */
  private updateTabsCount(): void {
    if (this.tabItems) {
      this.tabsCount.update(val => this.tabItems.length);
    }
  }
  
  /** Select tab by index */
  selectTab(index: number): void {
    if (index !== this.activeTabIndex()) {
      this.activeTabIndex.update(() => index);
      this.selectedIndexChange.emit(index);
      this.updateSelectedState();
    }
  }
  
  /** Update selected state of tabs */
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