/**
 * Utility function to combine CSS class names with conditional logic.
 * Similar to the classnames library in React ecosystem.
 * 
 * @param classes A list of class names, objects where keys are class names and values are booleans,
 * or falsy values (which will be ignored)
 * @returns A string of space-separated class names
 */
export function classNames(...classes: (string | Record<string, boolean> | null | undefined | false)[]): string {
  const result: string[] = [];

  for (const cls of classes) {
    if (!cls) continue;
    
    if (typeof cls === 'string') {
      result.push(cls);
    } else if (typeof cls === 'object') {
      for (const [key, value] of Object.entries(cls)) {
        if (value) {
          result.push(key);
        }
      }
    }
  }

  return result.join(' ');
} 