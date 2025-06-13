import { autoUpdate, AutoUpdateOptions, FloatingElement, ReferenceElement } from '@floating-ui/dom';

const defaultOptions = {
  ancestorScroll: true,
  ancestorResize: true,
  elementResize: false,
  animationFrame: false,
};

/**
 * Check if the element is an HTML element
 */
function isHTMLElement(value: any): value is HTMLElement {
  return value instanceof HTMLElement;
}

/**
 * Check if an element is a virtual element
 */
function isVirtualElement(value: any): boolean {
  return value !== null && typeof value === 'object' && 'getBoundingClientRect' in value;
}

/**
 * Enhances the autoUpdate function from floating-ui with additional element resize support
 */
export const autoUpdateFloatingElement = (
  reference: ReferenceElement | null,
  floating: FloatingElement | null,
  update: () => void,
  options: Partial<AutoUpdateOptions> = defaultOptions,
): ReturnType<typeof autoUpdate> => {
  console.log('📌 autoUpdateFloatingElement called with:', {
    reference: reference ? 'provided' : 'null',
    floating: floating ? 'provided' : 'null',
    options
  });
  
  if (!reference || !floating) {
    console.warn('📌 autoUpdateFloatingElement: Missing reference or floating element, returning no-op');
    return () => {};
  }

  const { elementResize = false, ...restOptions } = options;
  console.log('📌 autoUpdateFloatingElement options:', {
    elementResize,
    ...restOptions
  });

  let autoUpdateLibDisposer: (() => void);
  try {
    console.log('📌 Setting up autoUpdate from floating-ui library');
    autoUpdateLibDisposer = autoUpdate(reference, floating, () => {
      try {
        console.log('📌 autoUpdate callback triggered');
        update();
      } catch (error) {
        console.error('📌 Error in update callback:', error);
      }
    }, {
      ...restOptions,
      elementResize: false,
    });
  } catch (error) {
    console.error('📌 Error setting up autoUpdate:', error);
    return () => {};
  }

  let observer: MutationObserver | null = null;
  if (elementResize) {
    try {
      console.log('📌 Setting up MutationObserver for element resize');
      let initialUpdate = true;
      observer = new MutationObserver(() => {
        console.log('📌 MutationObserver triggered, initialUpdate:', initialUpdate);
        if (!initialUpdate) {
          try {
            update();
            console.log('📌 Update called from MutationObserver');
          } catch (error) {
            console.error('📌 Error in MutationObserver update:', error);
          }
        }

        initialUpdate = false;
      });

      if (isHTMLElement(reference) && !isVirtualElement(reference)) {
        console.log('📌 Observing reference element (HTML element)');
        observer.observe(reference, {
          childList: true,
          subtree: true,
        });
      } else {
        console.log('📌 Reference is not an HTML element or is a virtual element, not observing');
      }

      console.log('📌 Observing floating element');
      observer.observe(floating, {
        childList: true,
        subtree: true,
      });
    } catch (error) {
      console.error('📌 Error setting up MutationObserver:', error);
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    }
  }

  return () => {
    console.log('📌 Cleanup function called for autoUpdateFloatingElement');
    if (observer !== null) {
      console.log('📌 Disconnecting MutationObserver');
      observer.disconnect();
      observer = null;
    }
    try {
      console.log('📌 Calling autoUpdateLibDisposer');
      autoUpdateLibDisposer();
    } catch (error) {
      console.error('📌 Error in autoUpdateLibDisposer:', error);
    }
    console.log('📌 Cleanup complete');
  };
}; 