/**
 * Checks if a node exists
 * 
 * This utility function checks if a passed value can be rendered as a React-like node.
 * It verifies if the value is not null, not undefined, and is either a primitive or a complex object.
 * 
 * @param node The node to check
 * @returns True if the node exists and can be rendered
 */
export function hasNode(node: any): boolean {
  return (
    node !== null &&
    node !== undefined &&
    (typeof node !== 'boolean' || node === true)
  );
} 