import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, HostBinding, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformService } from '@services/platform.service';

/**
 * Компонент Spinner отображает индикатор загрузки.
 * Автоматически выбирает соответствующий стиль индикатора в зависимости от платформы.
 */
@Component({
  selector: 'tgui-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="isIOS; else baseSpinner">
      <svg class="spinner-ios" viewBox="0 0 1024 1024" width="100%" height="100%">
        <path 
          d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"
          fill="currentColor"
        />
      </svg>
    </ng-container>
    <ng-template #baseSpinner>
      <svg class="spinner-circle" viewBox="0 0 50 50" width="100%" height="100%">
        <circle
          class="spinner-path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width="4"
        />
      </svg>
    </ng-template>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: inherit;
    }

    .spinner-circle {
      animation: spinner-rotate 1.4s linear infinite;
    }

    .spinner-path {
      stroke: currentColor;
      stroke-linecap: round;
      animation: spinner-dash 1.4s ease-in-out infinite;
    }

    :host.size-s {
      width: 20px;
      height: 20px;
    }

    :host.size-m {
      width: 28px;
      height: 28px;
    }

    :host.size-l {
      width: 36px;
      height: 36px;
    }

    .tgui-platform-ios :host .spinner-ios {
      animation: spinner-rotate 1s linear infinite;
    }

    @keyframes spinner-rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes spinner-dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent implements OnInit {
  /**
   * Размер индикатора загрузки ('s' - малый, 'm' - средний, 'l' - большой)
   */
  @Input() size: 's' | 'm' | 'l' = 'm';
  
  /**
   * Флаг, указывающий, является ли текущая платформа iOS
   */
  isIOS = false;

  private platformService = inject(PlatformService);

  @HostBinding('class.size-s') get isSizeS() { return this.size === 's'; }
  @HostBinding('class.size-m') get isSizeM() { return this.size === 'm'; }
  @HostBinding('class.size-l') get isSizeL() { return this.size === 'l'; }
  @HostBinding('attr.role') role = 'status';

  ngOnInit(): void {
    // Получаем текущую платформу из сервиса
    this.isIOS = this.platformService.isIOS();
  }
} 