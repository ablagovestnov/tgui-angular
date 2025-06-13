/**
 * Creates chunks of the given array with specified size
 * @param array The array to create chunks from
 * @param chunkSize The size of each chunk
 * @returns An array of chunks
 */
export function createChunks<T>(array: T[], chunkSize: number): T[][] {
  const result: T[][] = [];
  
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  
  return result;
} 