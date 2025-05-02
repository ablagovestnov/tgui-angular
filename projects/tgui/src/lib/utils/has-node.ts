/**
 * Utility function to check if a node exists in Angular
 * Used to conditionally render elements based on whether content exists
 */
export function hasNode(node: any): boolean {
  if (node === null || node === undefined) {
    return false;
  }
  
  if (typeof node === 'string') {
    return node.trim() !== '';
  }
  
  if (Array.isArray(node)) {
    return node.length > 0;
  }
  
  return true;
} 