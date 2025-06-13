import { Placement } from '@floating-ui/dom';

import { AutoPlacementType, PlacementWithAuto } from '../types';

/**
 * Checks if the placement is not an auto-placement
 */
export const isNotAutoPlacement = (placement: PlacementWithAuto): placement is Placement => {
  return !placement.startsWith('auto');
};

/**
 * Gets the alignment for auto-placement
 */
export const getAutoPlacementAlignment = (placement: AutoPlacementType): 'start' | 'end' | null => {
  const align = placement.replace(/auto-|auto/, '');
  return align === 'start' || align === 'end' ? align : null;
}; 