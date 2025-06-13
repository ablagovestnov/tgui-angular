import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  getCircleAttributes, 
  CircleSize, 
  CircleAttributes 
} from './utils/get-circle-attributes';

/**
 * Renders a circular progress indicator, useful for displaying loading states or progress metrics.
 * The component dynamically adjusts its size and stroke based on the provided `size` input and visually represents
 * the `progress` input as a percentage of the circle's circumference.
 */
@Component({
  selector: 'tgui-circular-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      *ngIf="circleAttrs()"
      class="wrapper"
      [attr.width]="circleAttrs()?.size"
      [attr.height]="circleAttrs()?.size"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >

        <circle
        [attr.cx]="circleSize()"
        [attr.cy]="circleSize()"
        [attr.r]="circleAttrs()?.radius"
        stroke-opacity=".1"
        [attr.stroke-width]="circleAttrs()?.strokeWidth"
        fill="none"
      />
      <circle
        fill="none"
        [attr.cx]="circleSize()"
        [attr.cy]="circleSize()"
        [attr.r]="circleAttrs()?.radius"
        [attr.stroke-width]="circleAttrs()?.strokeWidth"
        stroke-linecap="round"
        [attr.stroke-dasharray]="circumference()"
        [attr.stroke-dashoffset]="circumference() * ((100 - progress()) / 100)"
      />
    </svg>
  `,
  styles: [`
    .wrapper {
      stroke: var(--tgui--link_color);
      transform: rotate(-90deg);
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircularProgressComponent {
  /**
   * Specifies the size of the circular progress indicator. 
   * Can be 'small', 'medium', or 'large'.
   */
  size = input<CircleSize>('medium');
  
  /**
   * Current progress of the circular indicator, expressed as a percentage from 0 to 100.
   */
  progress = input<number>(0);

  /**
   * Computed circle attributes based on size
   */
  circleAttrs = computed<CircleAttributes | undefined>(() => {
    return getCircleAttributes(this.size());
  });

  /**
   * Computed circle center position (half of circle size)
   */
  circleSize = computed<number>(() => {
    return (this.circleAttrs()?.size || 0) / 2;
  });

  /**
   * Computed circumference of the circle
   */
  circumference = computed<number>(() => {
    const radius = this.circleAttrs()?.radius || 0;
    return 2 * Math.PI * radius;
  });

  /**
   * Computed dash offset based on progress
   */
  dashOffset = computed<number>(() => {
    return this.circumference() * ((100 - this.progress()) / 100);
  });
} 