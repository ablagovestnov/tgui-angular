import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  Input, 
  HostBinding
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptionComponent } from '@typography/caption/caption.component';
import { SubheadlineComponent } from '@typography/subheadline/subheadline.component';

export type BadgeType = 'number' | 'dot';
export type BadgeMode = 'primary' | 'critical' | 'secondary' | 'gray' | 'white';

/**
 * Компонент Badge отображает небольшой числовой или точечный индикатор,
 * обычно используемый для уведомлений, статусов или счетчиков.
 * Поддерживает несколько визуальных режимов для разных контекстов (например, critical, primary),
 * и может быть обычного или увеличенного размера.
 */
@Component({
  selector: 'tgui-badge',
  standalone: true,
  imports: [CommonModule, CaptionComponent, SubheadlineComponent],
  template: `
    <ng-container *ngIf="isNumber">
      <ng-template #contentTemplate>
        <ng-content></ng-content>
      </ng-template>

      <tgui-subheadline tag="span" level="2" weight="2" *ngIf="large">
        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
      </tgui-subheadline>

      <tgui-caption weight="2" level="1" *ngIf="!large">
        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
      </tgui-caption>
    </ng-container>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      border-radius: 20px;
      overflow: hidden;
    }

    /* Number type styles */
    :host.type-number {
      height: 20px;
      min-width: 20px;
      margin: 0 6px;
      padding: 0 5px;
    }

    /* Large number badge */
    :host.type-number.large {
      height: 24px;
      padding: 0 6px;
      /* min-width не увеличиваем, оставляем 20px как в React */
    }

    /* Dot type styles */
    :host.type-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      margin: 7px;
      border-radius: 50%;
    }

    /* Цветовые режимы */
    :host.mode-primary {
      color: var(--tgui--button_text_color);
      background: var(--tgui--button_color);
    }

    :host.mode-critical {
      color: var(--tgui--button_text_color);
      background: var(--tgui--destructive_text_color);
    }

    :host.mode-secondary {
      color: var(--tgui--link_color);
      background: var(--tgui--secondary_fill);
    }

    :host.mode-gray {
      color: var(--tgui--plain_foreground);
      background: var(--tgui--plain_background);
    }

    :host.mode-white {
      color: var(--tgui--link_color);
      background: var(--tgui--white);
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent {
  /** Визуальный стиль бейджа: 'number' отображает содержимое, 'dot' показывает простую точку. */
  @Input() type: BadgeType = 'number';

  /** Цветовая схема бейджа, влияющая на его фон и цвет текста. */
  @Input() mode: BadgeMode = 'primary';

  /** Увеличивает размер бейджа. Применяется только при type='number'. */
  @Input() large = false;

  // Host bindings для типа
  @HostBinding('class.type-number') get isNumber() { return this.type === 'number'; }
  @HostBinding('class.type-dot') get isDot() { return this.type === 'dot'; }

  // Host bindings для режимов
  @HostBinding('class.mode-primary') get isPrimary() { return this.mode === 'primary'; }
  @HostBinding('class.mode-critical') get isCritical() { return this.mode === 'critical'; }
  @HostBinding('class.mode-secondary') get isSecondary() { return this.mode === 'secondary'; }
  @HostBinding('class.mode-gray') get isGray() { return this.mode === 'gray'; }
  @HostBinding('class.mode-white') get isWhite() { return this.mode === 'white'; }

  // Host binding для размера
  @HostBinding('class.large') get isLarge() { return this.large && this.type === 'number'; }
} 