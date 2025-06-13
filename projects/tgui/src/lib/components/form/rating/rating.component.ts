import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input, 
  signal,
  computed,
  inject,
  ElementRef,
  effect,
  output,
  model
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisuallyHiddenDirective } from '../../../directives/visually-hidden.directive';
import { clamp } from '../../../utils/math';

export interface RatingProps {
  /** The precision of the rating, determining the fraction of the star that can be selected. */
  precision?: 0.1 | 0.2 | 0.25 | 0.5 | 1;
  /** The maximum rating value, representing the number of icons displayed. */
  max?: number;
  /** The current value of the rating. */
  value?: number;
  /** Callback function invoked when the rating value changes. */
  onChange?: (value: number) => void;
}

const MINIMUM_PRECISION = 0.1;

/**
 * Renders a customizable rating component, allowing users to provide a rating by selecting a value using stars.
 * Supports fractional ratings through precision control.
 * 
 * @example
 * <tgui-rating
 *   [(ratingValue)]="userRating"
 *   [precision]="0.5"
 *   [max]="5">
 * </tgui-rating>
 */
@Component({
  selector: 'tgui-rating',
  standalone: true,
  imports: [
    CommonModule,
    VisuallyHiddenDirective
  ],
  template: `
    <div class="wrapper" [attr.aria-label]="'Rating: ' + ratingValue()">
      <input tguiVisuallyHidden name="rating" type="radio" [value]="0" (click)="onRatingChange(0)" [checked]="ratingValue() === 0" />
      <ng-container *ngFor="let key of getKeys()">
        <label [class]="elementClass" [attr.aria-label]="'Rate ' + (key + 1)">
          <svg *ngIf="getPickedElementWidth(key + 1) !== undefined" 
               width="40" 
               height="40" 
               fill="none" 
               xmlns="http://www.w3.org/2000/svg" 
               [class]="elementPickedClass" 
               [style.width.%]="getPickedElementWidth(key + 1)! * 100"
               aria-hidden="true">
            <path
              d="M16.228 9.993c1.166-3.164 1.75-4.746 2.598-5.199a2.492 2.492 0 0 1 2.348 0c.849.453 1.432 2.035 2.598 5.199l.562 1.525c.337.914.506 1.372.796 1.715.257.303.58.54.945.694.413.173.895.194 1.86.235l1.608.07c3.338.143 5.006.215 5.694.89a2.56 2.56 0 0 1 .726 2.258c-.164.955-1.472 2.005-4.088 4.104l-1.262 1.011c-.756.607-1.134.91-1.367 1.296-.206.34-.33.725-.361 1.123-.036.45.094.92.353 1.86l.432 1.568c.896 3.253 1.345 4.88.921 5.75a2.518 2.518 0 0 1-1.9 1.395c-.949.137-2.34-.796-5.124-2.663l-1.341-.9c-.805-.54-1.207-.809-1.642-.914a2.488 2.488 0 0 0-1.168 0c-.435.105-.837.375-1.642.914l-1.341.9c-2.783 1.867-4.175 2.8-5.124 2.663a2.518 2.518 0 0 1-1.9-1.396c-.424-.87.025-2.496.921-5.749l.432-1.568c.26-.94.389-1.41.353-1.86a2.563 2.563 0 0 0-.361-1.123c-.233-.386-.611-.689-1.367-1.296l-1.262-1.011c-2.616-2.1-3.924-3.149-4.088-4.104a2.56 2.56 0 0 1 .726-2.258c.688-.675 2.356-.747 5.694-.89l1.608-.07c.965-.041 1.447-.062 1.86-.235.364-.153.688-.391.945-.694.29-.343.459-.8.796-1.715l.562-1.525Z"
              fill="currentColor" opacity=".8" />
          </svg>
          <svg width="40" 
               height="40" 
               fill="none" 
               xmlns="http://www.w3.org/2000/svg"
               aria-hidden="true">
            <path
              d="M16.228 9.993c1.166-3.164 1.75-4.746 2.598-5.199a2.492 2.492 0 0 1 2.348 0c.849.453 1.432 2.035 2.598 5.199l.562 1.525c.337.914.506 1.372.796 1.715.257.303.58.54.945.694.413.173.895.194 1.86.235l1.608.07c3.338.143 5.006.215 5.694.89a2.56 2.56 0 0 1 .726 2.258c-.164.955-1.472 2.005-4.088 4.104l-1.262 1.011c-.756.607-1.134.91-1.367 1.296-.206.34-.33.725-.361 1.123-.036.45.094.92.353 1.86l.432 1.568c.896 3.253 1.345 4.88.921 5.75a2.518 2.518 0 0 1-1.9 1.395c-.949.137-2.34-.796-5.124-2.663l-1.341-.9c-.805-.54-1.207-.809-1.642-.914a2.488 2.488 0 0 0-1.168 0c-.435.105-.837.375-1.642.914l-1.341.9c-2.783 1.867-4.175 2.8-5.124 2.663a2.518 2.518 0 0 1-1.9-1.396c-.424-.87.025-2.496.921-5.749l.432-1.568c.26-.94.389-1.41.353-1.86a2.563 2.563 0 0 0-.361-1.123c-.233-.386-.611-.689-1.367-1.296l-1.262-1.011c-2.616-2.1-3.924-3.149-4.088-4.104a2.56 2.56 0 0 1 .726-2.258c.688-.675 2.356-.747 5.694-.89l1.608-.07c.965-.041 1.447-.062 1.86-.235.364-.153.688-.391.945-.694.29-.343.459-.8.796-1.715l.562-1.525Z"
              fill="currentColor" opacity=".8" />
          </svg>
          <ng-container *ngFor="let element of getElementsWithPrecision()">
            <input
              type="radio"
              [value]="(key + (element + 1) * normalizedPrecision()).toFixed(1)"
              name="rating"
              [style.width.%]="normalizedPrecision() * 100"
              [style.left.%]="element * normalizedPrecision() * 100"
              [class]="inputClass"
              [attr.aria-label]="'Rate ' + (key + 1) + ' stars'"
              [checked]="isInputChecked(key, element)"
              (click)="onRatingChange(+((key + (element + 1) * normalizedPrecision()).toFixed(1)))"
            />
          </ng-container>
        </label>
      </ng-container>
    </div>
  `,
  styles: [`
    .wrapper {
      position: relative;
      display: flex;
      gap: 4px;
      padding: 12px;
    }

    .element {
      position: relative;
      color: var(--tgui--tertiary_bg_color);
      cursor: pointer;
    }

    .element:focus-visible {
      outline: 2px solid var(--tgui--link_color);
    }

    .element--picked {
      position: absolute;
      color: var(--tgui--link_color);
      pointer-events: none;
    }

    .input {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: 0;
      opacity: 0;
      cursor: pointer;
      z-index: 1;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tgui-rating',
    'role': 'group',
    'attr.aria-label': 'Rating selector'
  }
})
export class RatingComponent {
  // Service injection
  private elementRef = inject(ElementRef);

  // Input parameters
  /** The precision of the rating, determining the fraction of the star that can be selected. */
  precision = input<0.1 | 0.2 | 0.25 | 0.5 | 1>(1);
  
  /** The maximum rating value, representing the number of icons displayed. */
  max = input<number>(5);
  
  /** The current value of the rating using Angular's two-way binding with model(). */
  ratingValue = model<number>(0);

  // Computed properties
  normalizedPrecision = computed(() => clamp(this.precision(), MINIMUM_PRECISION, 1));

  // CSS Classes
  elementClass = 'element';
  elementPickedClass = 'element--picked';
  inputClass = 'input';

  constructor() {
    // Constructor remains empty after removing debug code
  }

  // Helpers
  getKeys(): number[] {
    return Array.from(Array(this.max()).keys());
  }

  getElementsWithPrecision(): number[] {
    const elementsWithPrecision = Math.floor(1 / this.normalizedPrecision());
    return Array.from(Array(elementsWithPrecision).keys());
  }

  getPickedElementWidth(elementNumber: number): number | undefined {
    // Use the model value
    const currentValue = this.ratingValue();
    
    if (elementNumber <= currentValue) {
      return 1;
    }

    const valueRange = elementNumber - currentValue;
    if (valueRange > 0 && valueRange < 1) {
      return 1 - valueRange;
    }

    return undefined;
  }

  // Check if specific input is selected
  isInputChecked(key: number, element: number): boolean {
    const value = +((key + (element + 1) * this.normalizedPrecision()).toFixed(1));
    return Math.abs(this.ratingValue() - value) < 0.001;
  }

  // Rating change handler
  onRatingChange(value: number): void {
    this.ratingValue.set(value);
  }
} 