import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Компонент AvatarBadge отображает числовой бейдж на аватаре,
 * позволяя показывать количество непрочитанных сообщений, уведомлений и т.д.
 */
@Component({
  selector: 'tgui-avatar-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="avatar-badge">
      <span class="badge-content">{{ count > 99 ? '99+' : count }}</span>
    </div>
  `,
  styles: [`
    :host {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;
      pointer-events: none;
    }
    
    .avatar-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      border-radius: 10px;
      background-color: var(--tgui--destructive_text_color);
      color: white;
      font-size: 11px;
      font-weight: var(--tgui--font_weight--accent1);
      box-sizing: border-box;
      transform: translate(50%, -50%);
      box-shadow: 0 0 0 2px var(--tgui--bg_color);
      pointer-events: auto;
    }
    
    .badge-content {
      display: flex;
      line-height: 1;
    }
    
    /* Специальные стили для больших и маленьких бейджей */
    :host-context(.size-xs) .avatar-badge,
    :host-context(.size-s) .avatar-badge {
      min-width: 14px;
      height: 14px;
      font-size: 10px;
      padding: 0 4px;
    }
    
    :host-context(.size-l) .avatar-badge,
    :host-context(.size-xl) .avatar-badge {
      min-width: 20px;
      height: 20px;
      font-size: 12px;
      padding: 0 6px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarBadgeComponent {
  /**
   * Числовое значение для отображения в бейдже
   */
  @Input() count: number = 0;
} 