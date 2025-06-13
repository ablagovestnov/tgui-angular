import { Injectable, signal, computed } from '@angular/core';
import { clamp } from '../../../../utils/math';

export interface UsePinInputParams {
  pinCount: number;
  value?: number[];
  onChange?: (value: number[]) => void;
}

/**
 * Keys for keyboard accessibility
 */
export enum Keys {
  BACKSPACE = 'Backspace',
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight'
}

export const AVAILABLE_PINS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, Keys.BACKSPACE];

/**
 * Service that provides functionality for PIN input component
 * Similar to the React usePinInput hook
 */
@Injectable({
  providedIn: 'root'
})
export class PinInputService {
  // Constructor is empty as we don't need to inject anything
  constructor() {}

  /**
   * Creates a PIN input controller with the specified parameters
   * @param params The parameters for the PIN input
   * @returns An object with methods and signals for controlling the PIN input
   */
  create(params: UsePinInputParams) {
    const { pinCount, value: initialValue = [], onChange } = params;
    
    // Create signals
    const inputRefs = signal<HTMLLabelElement[]>([]);
    const value = signal<number[]>(initialValue);
    
    // Instead of using effect, use signal with a custom setter that triggers onChange
    if (onChange) {
      const originalUpdate = value.update;
      
      // Override the update method to call onChange after updating
      value.update = function(updateFn: (value: number[]) => number[]) {
        const result = originalUpdate.call(this, updateFn);
        onChange(value());
        return result;
      };
      
      // Also override set method if needed
      const originalSet = value.set;
      value.set = function(newValue: number[]) {
        const result = originalSet.call(this, newValue);
        onChange(newValue);
        return result;
      };
    }

    /**
     * Focuses the input at the specified index
     * @param index The index to focus
     */
    const focusByIndex = (index: number) => {
      requestAnimationFrame(() => {
        const refs = inputRefs();
        if (refs[index]) {
          refs[index].focus();
        }
      });
    };

    /**
     * Sets the value at the specified index
     * @param index The index to set
     * @param newValue The new value to set
     */
    const setValueByIndex = (index: number, newValue: number) => {
      value.update((prev) => {
        const nextValue = [...prev];
        nextValue[index] = newValue;
        return nextValue;
      });
    };

    /**
     * Removes the last value
     * @param currentIndex The current index
     */
    const removeLastValue = (currentIndex: number) => {
      value.update((prev) => prev.slice(0, -1));
      focusByIndex(currentIndex - 1);
    };

    /**
     * Handles a click on a value button
     * @param enteredValue The value that was clicked
     */
    const handleClickValue = (enteredValue: number) => {
      const lastIndex = clamp(value().length, 0, pinCount - 1);
      setValueByIndex(lastIndex, enteredValue);
      focusByIndex(lastIndex + 1);
    };

    /**
     * Handles a click on the backspace button
     */
    const handleClickBackspace = () => {
      removeLastValue(value().length - 1);
    };

    /**
     * Handles a button press at a specific index
     * @param index The index where the button was pressed
     * @param button The button that was pressed
     */
    const handleButton = (index: number, button: string) => {
      if (AVAILABLE_PINS.includes(Number(button))) {
        setValueByIndex(index, Number(button));
        focusByIndex(index + 1);
      }

      switch (button) {
        case Keys.BACKSPACE:
          removeLastValue(index);
          break;

        case Keys.ARROW_LEFT:
          focusByIndex(index - 1);
          break;

        case Keys.ARROW_RIGHT:
          focusByIndex(index + 1);
          break;

        default:
          break;
      }
    };

    /**
     * Sets the input reference at the specified index
     * @param index The index to set
     * @param ref The reference to set
     */
    const setInputRefByIndex = (index: number, ref: HTMLLabelElement | null) => {
      if (!ref) {
        return;
      }

      inputRefs.update(refs => {
        const newRefs = [...refs];
        newRefs[index] = ref;
        return newRefs;
      });
    };

    return {
      value,
      setInputRefByIndex,
      handleClickValue,
      handleClickBackspace,
      handleButton,
    };
  }
} 