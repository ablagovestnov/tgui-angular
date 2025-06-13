/**
 * Utility function to call multiple event handlers
 * Similar to the callMultiple function in the React version
 * 
 * @param handlers List of event handlers to call
 * @returns A function that calls all handlers with the same arguments
 */
export function callMultiple<T = any>(...handlers: Array<((e: T) => void) | undefined>): (e: T) => void {
  return (e: T) => {
    handlers.forEach((handler) => {
      if (typeof handler === 'function') {
        handler(e);
      }
    });
  };
} 