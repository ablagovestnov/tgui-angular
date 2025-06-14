import { Injectable, signal, computed } from '@angular/core';
import {
  arrow,
  autoPlacement,
  flip,
  Middleware,
  offset,
  shift,
  size,
  type MiddlewareState,
  type ElementRects,
  type Elements,
} from '@floating-ui/dom';

import { getAutoPlacementAlignment, isNotAutoPlacement } from './helpers/alignment';
import { PlacementWithAuto } from './types';

export interface UseFloatingMiddlewaresOptions {
  /** By default, the component will automatically choose the best placement */
  placement?: PlacementWithAuto;
  /** Offset along the main axis. */
  offsetByMainAxis?: number;
  /** Offset along the cross axis. */
  offsetByCrossAxis?: number;
  /** Ref for arrow element */
  arrowRef?: HTMLElement | null;
  /** Whether to display an arrow pointing to the anchor element. */
  withArrow?: boolean;
  /** The height of the arrow. This is added to `mainAxis` to prevent the arrow from overlapping the anchor element. */
  arrowHeight?: number;
  /** A safe zone around the arrow to prevent it from exceeding the content bounds. */
  arrowPadding?: number;
  /** Sets the width to match the target element. */
  sameWidth?: boolean;
  /** An array of custom modifiers for Popper. */
  customMiddlewares?: Middleware[];
}

@Injectable({ providedIn: 'root' })
export class FloatingMiddlewaresService {
  getMiddlewares(options: UseFloatingMiddlewaresOptions) {
    const {
      placement = 'bottom-start',
      arrowRef = null,
      withArrow = false,
      arrowHeight = 0,
      arrowPadding = 0,
      sameWidth = false,
      offsetByMainAxis = 0,
      offsetByCrossAxis = 0,
      customMiddlewares = [],
    } = options;

    const isNotAutoPlaced = isNotAutoPlacement(placement);
    const middlewares: Middleware[] = [];
    
    // Add offset middleware
    const offsetConfig = {
      crossAxis: offsetByCrossAxis,
      mainAxis: withArrow && arrowHeight ? offsetByMainAxis + arrowHeight : offsetByMainAxis,
    };
    middlewares.push(offset(offsetConfig));

    // Add placement-related middleware
    if (isNotAutoPlaced) {
      middlewares.push(
        flip({
          fallbackAxisSideDirection: 'start',
        }),
      );
    } else {
      const alignment = getAutoPlacementAlignment(placement);
      middlewares.push(autoPlacement({
        alignment
      }));
    }

    middlewares.push(shift());

    // Add size middleware if needed
    if (sameWidth) {
      middlewares.push(
        size({
          apply({ rects, elements }: { rects: ElementRects, elements: Elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
            });
          },
        }),
      );
    }

    // Add custom middlewares
    if (customMiddlewares.length > 0) {
      middlewares.push(...customMiddlewares);
    }

    // Add arrow middleware if needed
    if (withArrow && arrowRef) {
      middlewares.push(
        arrow({
          element: arrowRef,
          padding: arrowPadding,
        }),
      );
    } else if (withArrow && !arrowRef) {
      console.warn('🚀 Warning: Arrow middleware not added because arrowRef is null');
    }

    const result = {
      middlewares,
      strictPlacement: isNotAutoPlaced ? placement : undefined,
    };
    
    return result;
  }
} 