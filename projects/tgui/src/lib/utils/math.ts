/**
 * Clamps a value between a minimum and maximum value.
 * @param value The value to clamp
 * @param min The minimum value
 * @param max The maximum value
 * @returns The clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
} 