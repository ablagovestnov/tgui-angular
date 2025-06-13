import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  HostBinding,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptionComponent } from '../../typography/caption/caption.component';
import { SubheadlineComponent } from '../../typography/subheadline/subheadline.component';

export type BadgeType = 'number' | 'dot';
export type BadgeMode = 'primary' | 'critical' | 'secondary' | 'gray' | 'white';

/**
 * Badge component displays a small numeric or dot indicator,
 * typically used for notifications, statuses, or counters.
 * Supports multiple visual modes for different contexts (e.g., critical, primary),
 * and can be regular or large size.
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

      <tgui-subheadline tag="span" level="2" weight="2" *ngIf="large()">
        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
      </tgui-subheadline>

      <tgui-caption weight="2" level="1" *ngIf="!large()">
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
      /* don't increase min-width, keep 20px as in React */
    }

    /* Dot type styles */
    :host.type-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      margin: 7px;
      border-radius: 50%;
    }

    /* Color modes */
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent {
  /** Visual style of the badge: 'number' displays content, 'dot' shows a simple dot. */
  type = input<BadgeType>('number');

  /** Color scheme of the badge, affecting its background and text color. */
  mode = input<BadgeMode>('primary');

  /** Increases the badge size. Applied only when type='number'. */
  large = input<boolean>(false);

  // Host bindings for type
  @HostBinding('class.type-number') get isNumber() { return this.type() === 'number'; }
  @HostBinding('class.type-dot') get isDot() { return this.type() === 'dot'; }

  // Host bindings for modes
  @HostBinding('class.mode-primary') get isPrimary() { return this.mode() === 'primary'; }
  @HostBinding('class.mode-critical') get isCritical() { return this.mode() === 'critical'; }
  @HostBinding('class.mode-secondary') get isSecondary() { return this.mode() === 'secondary'; }
  @HostBinding('class.mode-gray') get isGray() { return this.mode() === 'gray'; }
  @HostBinding('class.mode-white') get isWhite() { return this.mode() === 'white'; }

  // Host binding for size
  @HostBinding('class.large') get isLarge() { return this.large() && this.type() === 'number'; }
} 