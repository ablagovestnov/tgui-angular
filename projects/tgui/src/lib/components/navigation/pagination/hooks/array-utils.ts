/**
 * Creates an array of numbers in a given range
 * @param start The start of the range (inclusive)
 * @param end The end of the range (inclusive)
 * @returns An array containing all numbers in the range
 */
export function createRange(start: number, end: number): number[] {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
} 