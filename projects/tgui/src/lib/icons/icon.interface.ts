import { EventEmitter } from '@angular/core';

/**
 * Base interface for icon components, compatible with React version
 */
export interface TguiIconProps {
  /**
   * CSS class to apply to the icon
   */
  class?: string;
  
  /**
   * Additional styles to apply to the icon
   */
  style?: { [key: string]: string };
  
  /**
   * Aria label for accessibility
   */
  ariaLabel?: string;
  
  /**
   * Title for the icon
   */
  title?: string;

  /**
   * ID of the element
   */
  id?: string;

  /**
   * Fill color of the icon
   */
  fill?: string;

  /**
   * Stroke color of the icon
   */
  stroke?: string;

  /**
   * Width of the icon (can be CSS units or number)
   */
  width?: string | number;

  /**
   * Height of the icon (can be CSS units or number)
   */
  height?: string | number;

  /**
   * Role attribute for accessibility
   */
  role?: string;

  /**
   * Tab index for keyboard navigation
   */
  tabIndex?: number;

  /**
   * Whether the element should get focus on load
   */
  autoFocus?: boolean;

  /**
   * Click event handler
   */
  onClick?: EventEmitter<MouseEvent>;

  /**
   * Focus event handler
   */
  onFocus?: EventEmitter<FocusEvent>;

  /**
   * Blur event handler
   */
  onBlur?: EventEmitter<FocusEvent>;

  /**
   * Mouse enter event handler
   */
  onMouseEnter?: EventEmitter<MouseEvent>;

  /**
   * Mouse leave event handler
   */
  onMouseLeave?: EventEmitter<MouseEvent>;

  /**
   * Key down event handler
   */
  onKeyDown?: EventEmitter<KeyboardEvent>;

  /**
   * Pointer down event handler
   */
  onPointerDown?: EventEmitter<PointerEvent>;

  /**
   * Pointer up event handler
   */
  onPointerUp?: EventEmitter<PointerEvent>;
} 