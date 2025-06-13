import { signal, computed, Signal } from '@angular/core';
import { createRange } from './array-utils';
import { PaginationType } from './pagination.enum';
import { PaginationItem, PaginationProps } from './pagination.types';

/**
 * Creates and manages the state and logic for pagination items.
 * 
 * @param props Configuration options for the pagination
 * @returns A computed signal that produces an array of pagination items
 */
export function usePagination(props: {
  boundaryCount: Signal<number>;
  count: Signal<number>;
  defaultPage: Signal<number>;
  hideNextButton: Signal<boolean>;
  hidePrevButton: Signal<boolean>;
  page: Signal<number | undefined>;
  siblingCount: Signal<number>;
  onPageChange: (page: number) => void;
}): Signal<PaginationItem[]> {
  // State for the current page
  const currentPage = signal<number>(props.page() ?? props.defaultPage());

  // Update internal state when external page changes
  const updatePage = () => {
    if (props.page() !== undefined && props.page() !== currentPage()) {
      currentPage.set(props.page() ?? props.defaultPage());
    }
  };

  // Generate pagination items
  return computed(() => {
    // Ensure the page is synchronized with the props
    updatePage();

    const boundaryCount = props.boundaryCount();
    const count = props.count();
    const hideNextButton = props.hideNextButton();
    const hidePrevButton = props.hidePrevButton();
    const siblingCount = props.siblingCount();
    const page = currentPage();

    // Generate the ranges of the pages
    const startPages = createRange(1, Math.min(boundaryCount, count));
    const endPages = createRange(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

    // Calculate sibling pages range
    const siblingsStart = Math.max(
      Math.min(
        // Natural start
        page - siblingCount,
        // Lower boundary when page is high
        count - boundaryCount - siblingCount * 2 - 1
      ),
      // Greater than startPages
      boundaryCount + 2
    );

    const siblingsEnd = Math.min(
      Math.max(
        // Natural end
        page + siblingCount,
        // Upper boundary when page is low
        boundaryCount + siblingCount * 2 + 2
      ),
      // Less than endPages
      endPages.length > 0 ? endPages[0] - 2 : count - 1
    );

    // Basic list of items to render
    const itemList: Array<PaginationType | number> = [];

    // Add previous button
    if (!hidePrevButton) {
      itemList.push(PaginationType.Previous);
    }

    // Add start pages
    itemList.push(...startPages);

    // Add start ellipsis
    if (siblingsStart > boundaryCount + 2) {
      itemList.push(PaginationType.StartEllipsis);
    } else if (boundaryCount + 1 < count - boundaryCount) {
      itemList.push(boundaryCount + 1);
    }

    // Add sibling pages
    itemList.push(...createRange(siblingsStart, siblingsEnd));

    // Add end ellipsis
    if (siblingsEnd < count - boundaryCount - 1) {
      itemList.push(PaginationType.EndEllipsis);
    } else if (count - boundaryCount > boundaryCount) {
      itemList.push(count - boundaryCount);
    }

    // Add end pages
    itemList.push(...endPages);

    // Add next button
    if (!hideNextButton) {
      itemList.push(PaginationType.Next);
    }

    // Map the button type to its page number
    const buttonPage = (type: PaginationType): number | null => {
      switch (type) {
        case PaginationType.Previous:
          return page - 1;
        case PaginationType.Next:
          return page + 1;
        default:
          return null;
      }
    };

    // Create the final pagination items
    return itemList.map((item): PaginationItem => {
      if (typeof item === 'number') {
        return {
          onClick: () => {
            currentPage.set(item);
            props.onPageChange(item);
          },
          type: PaginationType.Page,
          page: item,
          selected: item === page,
          disabled: false,
          'aria-current': item === page ? 'true' : undefined,
        };
      }

      // Handle special items
      const pageNumber = buttonPage(item);
      return {
        onClick: () => {
          if (pageNumber !== null) {
            currentPage.set(pageNumber);
            props.onPageChange(pageNumber);
          }
        },
        type: item,
        page: pageNumber,
        selected: false,
        disabled:
          (![PaginationType.StartEllipsis, PaginationType.EndEllipsis].includes(item) &&
            (item === PaginationType.Next ? page >= count : page <= 1)),
      };
    });
  });
} 