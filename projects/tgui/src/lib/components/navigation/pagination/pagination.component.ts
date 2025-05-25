import { 
    Component, 
    ViewEncapsulation, 
    ChangeDetectionStrategy,
    input,
    output,
    HostBinding,
    computed,
    signal
  } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { HeadlineComponent } from '../../typography/headline/headline.component';
  import { TguiDynamicIconComponent } from '../../../icons/dynamic-icon.component';
  import { PaginationItem } from './hooks/pagination.types';
  import { PaginationType } from './hooks/pagination.enum';
  import { usePagination } from './hooks/use-pagination';

/**
 * The Pagination component displays a set of navigation controls allowing users to navigate through pages of content.
 * It is built on top of a custom hook that manages pagination logic and state.
 * This component can be customized to hide next/previous buttons, specify boundary and sibling count for pagination items, 
 * and handle page changes through a pageChange output.
 */
@Component({
  selector: 'tgui-pagination',
  standalone: true,
  imports: [CommonModule, HeadlineComponent, TguiDynamicIconComponent],
  template: `
    <div
      role="tablist"
      class="pagination-wrapper"
      [attr.aria-disabled]="disabled()"
    >
      <ng-container *ngFor="let item of paginationItems()">
        <tgui-headline
          [attr.tag]="isEllipsis(item) ? 'div' : 'button'"
          weight="2"
          [class.button]="true"
          [class.button--ellipsis]="isEllipsis(item)"
          [class.button--selected]="item.selected"
          [class.button--disabled]="item.disabled"
          [attr.aria-disabled]="item.disabled || undefined"
          [attr.aria-current]="item['aria-current']"
          (click)="handleItemClick(item)"
        >
          <ng-container [ngSwitch]="item.type">
            <tgui-dynamic-icon *ngSwitchCase="'previous'" icon="chevron-left" class="icon"></tgui-dynamic-icon>
            <tgui-dynamic-icon *ngSwitchCase="'next'" icon="chevron-right" class="icon"></tgui-dynamic-icon>
            <ng-container *ngSwitchCase="'start-ellipsis'">...</ng-container>
            <ng-container *ngSwitchCase="'end-ellipsis'">...</ng-container>
            <ng-container *ngSwitchDefault>{{ item.page }}</ng-container>
          </ng-container>
        </tgui-headline>
      </ng-container>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .pagination-wrapper {
      display: flex;
      gap: 8px;
      padding: 16px;
    }
    
    :host.disabled .pagination-wrapper {
      opacity: .35;
    }
    
    .button {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    
      min-width: 44px;
      height: 44px;
    
      color: var(--tgui--hint_color);
      padding: 0 10px;
      border: none;
      border-radius: 12px;
      background: transparent;
    }
    
    .button--selected {
      color: var(--tgui--text_color);
      background: var(--tgui--tertiary_bg_color);
    }
    
    .button--disabled {
      cursor: default;
      opacity: .35;
    }
    
    .button--ellipsis {
      cursor: default;
      opacity: 1;
    }
    
    .icon {
      color: var(--tgui--link_color);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    
    /* Ensure the icon container takes full space of the button */
    :host ::ng-deep tgui-dynamic-icon svg {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  /**
   * Number of always visible pages at the beginning and end.
   */
  boundaryCount = input<number>(1);
  
  /**
   * The total number of pages.
   */
  count = input<number>(1);
  
  /**
   * The page selected by default when the component is uncontrolled.
   */
  defaultPage = input<number>(1);
  
  /**
   * If `true`, hide the next-page button.
   */
  hideNextButton = input<boolean>(false);
  
  /**
   * If `true`, hide the previous-page button.
   */
  hidePrevButton = input<boolean>(false);
  
  /**
   * The current page.
   */
  page = input<number | undefined>(undefined);
  
  /**
   * Number of always visible pages before and after the current page.
   */
  siblingCount = input<number>(1);
  
  /**
   * Controls whether the Pagination component is interactive.
   */
  disabled = input<boolean>(false);
  
  /**
   * Event emitted when the page changes.
   */
  pageChange = output<number>();
  
  /**
   * Items for pagination calculated by the hook
   */
  paginationItems = usePagination({
    boundaryCount: this.boundaryCount,
    count: this.count,
    defaultPage: this.defaultPage,
    hideNextButton: this.hideNextButton,
    hidePrevButton: this.hidePrevButton,
    page: this.page,
    siblingCount: this.siblingCount,
    onPageChange: (page: number) => this.pageChange.emit(page)
  });
  
  /**
   * Apply the disabled class to the host element
   */
  @HostBinding('class.disabled')
  get isDisabled(): boolean {
    return this.disabled();
  }
  
  /**
   * Handle item click if the item is not disabled and not an ellipsis
   */
  handleItemClick(item: PaginationItem): void {
    if (!this.disabled() && !item.disabled && !this.isEllipsis(item)) {
      item.onClick();
    }
  }
  
  /**
   * Check if an item is an ellipsis
   */
  isEllipsis(item: PaginationItem): boolean {
    return [
      PaginationType.StartEllipsis,
      PaginationType.EndEllipsis
    ].includes(item.type);
  }
}