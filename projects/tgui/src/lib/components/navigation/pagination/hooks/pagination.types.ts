import { PaginationType } from './pagination.enum';

/**
 * Properties for the pagination component
 */
export interface PaginationProps {
  /** Number of always visible pages at the beginning and end. */
  boundaryCount?: number;
  /** The total number of pages. */
  count?: number;
  /** The page selected by default when the component is uncontrolled */
  defaultPage?: number;
  /** If `true`, hide the next-page button. */
  hideNextButton?: boolean;
  /** If `true`, hide the previous-page button. */
  hidePrevButton?: boolean;
  /** The current page. */
  page?: number;
  /** Number of always visible pages before and after the current page. */
  siblingCount?: number;
  /** Controls whether the Pagination component is interactive. */
  disabled?: boolean;
}

/**
 * Represents a single item in the pagination control
 */
export interface PaginationItem {
  /** Handler for when the item is clicked */
  onClick: () => void;
  /** Type of pagination item */
  type: PaginationType;
  /** Page number, or null for special items like ellipsis */
  page: number | null;
  /** Whether this item is currently selected */
  selected: boolean;
  /** Whether this item is disabled */
  disabled: boolean;
  /** ARIA current attribute */
  'aria-current'?: 'true' | undefined;
} 