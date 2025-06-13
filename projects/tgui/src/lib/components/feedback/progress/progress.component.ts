import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input,
  computed,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../../services/platform.service';

const PROGRESS_MIN_VALUE = 0;
const PROGRESS_MAX_VALUE = 100;

/**
 * Renders a linear progress bar that visually represents completion percentage towards a goal.
 * The component respects accessibility standards by including appropriate ARIA attributes.
 */
@Component({
  selector: 'tgui-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="wrapper" 
      [class.wrapper--base]="isPlatformBase"
      [attr.title]="progressTitle"
      role="progressbar"
      [attr.aria-valuenow]="progressValue()"
      [attr.aria-valuemin]="PROGRESS_MIN_VALUE"
      [attr.aria-valuemax]="PROGRESS_MAX_VALUE"
    >
      <div 
        class="progress" 
        aria-hidden="true"
        [style.width.%]="progressValue()"
      ></div>
    </div>
  `,
  styles: [`
    .wrapper {
      overflow: hidden;
      position: relative;
      height: 4px;
      border-radius: 2px;
    }

    .wrapper--base::after {
      content: '';
      position: absolute;
      inset: 0;
      opacity: .4;
      background: var(--tgui--link_color);
    }

    .progress {
      position: absolute;
      block-size: 100%;
      border-radius: inherit;
      transition: width 0.2s ease;
      background: var(--tgui--link_color);
      z-index: var(--tgui--z-index--simple);
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'attr.data-refresh-platform': 'true'
  }
})
export class ProgressComponent {
  private platformService = inject(PlatformService);
  
  // Constants exposed to template
  protected readonly PROGRESS_MIN_VALUE = PROGRESS_MIN_VALUE;
  protected readonly PROGRESS_MAX_VALUE = PROGRESS_MAX_VALUE;

  /**
   * The current value of the progress bar, expressed as a percentage.
   * The value should be between 0 and 100.
   */
  value = input<number>(0);

  /**
   * Computed value that ensures the progress is clamped between min and max values
   */
  progressValue = computed(() => {
    return Math.max(PROGRESS_MIN_VALUE, Math.min(this.value(), PROGRESS_MAX_VALUE));
  });

  /**
   * Computes the title attribute for accessibility
   */
  get progressTitle() {
    return `${this.progressValue()} / ${PROGRESS_MAX_VALUE}`;
  }

  /**
   * Indicates if platform is base
   */
  get isPlatformBase() {
    return this.platformService.platform() === 'base';
  }
} 