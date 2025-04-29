import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleWave } from '@services/ripple.service';

@Component({
  selector: 'tgui-ripple',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      class="ripple-wrapper" 
      aria-hidden="true"
    >
      <span 
        *ngFor="let wave of waves" 
        class="ripple-wave"
        [style.top.px]="wave.y"
        [style.left.px]="wave.x"
        [attr.data-id]="wave.pointerId"
      ></span>
    </span>
  `,
  styles: [`
    :host {
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      overflow: hidden;
    }
    
    .ripple-wrapper {
      display: block;
      overflow: hidden;
      position: absolute;
      inset: 0;
      border-radius: inherit;
      transition: background-color .15s ease-out;
      pointer-events: none;
      width: 100%;
      height: 100%;
    }

    .ripple-wave {
      content: '';
      position: absolute;
      height: 30px;
      width: 30px;
      margin: -15px 0;
      border-radius: 50%;
      background: var(--tgui--outline);
      animation: waveRise .3s cubic-bezier(.3, .3, .5, 1);
      opacity: 0;
    }

    @keyframes waveRise {
      0% {
        transform: scale(1);
        opacity: 1;
      }

      30% {
        opacity: 1;
      }

      100% {
        transform: scale(20);
        opacity: 0;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RippleComponent {
  /**
   * The collection of active ripple waves
   */
  @Input() waves: RippleWave[] = [];
} 