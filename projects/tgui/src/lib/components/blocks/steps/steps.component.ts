import { Component, ViewEncapsulation, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Renders a visual indicator of steps or progress in a process, such as a tutorial or a multi-step form.
 * It visually represents total steps and current progress.
 */
@Component({
  selector: 'tgui-steps',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tgui-steps-wrapper">
      <div 
        *ngFor="let step of stepsArray()"
        class="tgui-steps-step"
        [class.tgui-steps-step--active]="step < progress()"
      ></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .tgui-steps-wrapper {
      display: flex;
      gap: 9px;
      padding: 12px;
    }
    
    .tgui-steps-step {
      min-width: 3px;
      height: 3px;
      width: 100%;
      border-radius: 2px;
      background: var(--tgui--tertiary_bg_color);
    }
    
    .tgui-steps-step--active {
      background: var(--tgui--link_color);
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepsComponent {
  /** Total number of steps. */
  count = input<number>(0);
  
  /** 
   * Current progress, indicating how many steps have been completed. 
   * Progress is 0-indexed and goes up to `count`. 
   */
  progress = input<number>(0);
  
  /** Array of indexes for rendering steps */
  stepsArray = computed(() => Array.from({ length: this.count() }, (_, i) => i));
} 