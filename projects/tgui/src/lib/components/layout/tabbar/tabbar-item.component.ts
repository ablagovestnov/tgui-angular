import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  input, 
  HostBinding,
  inject,
  ContentChild,
  HostListener,
  signal,
  WritableSignal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../../services/platform.service';
import { TappableComponent } from '../../utils/tappable/tappable.component';
import { CaptionComponent } from '../../typography/caption/caption.component';

/**
 * Represents an individual tab within a `Tabbar`.
 * Each `TabbarItem` typically contains an icon and optional text.
 * When selected, the tab exhibits different visual styles to indicate its active state.
 *
 * The component adapts its styling based on the platform, providing a consistent look and feel across different devices.
 */
@Component({
  selector: 'tgui-tabbar-item',
  standalone: true,
  imports: [CommonModule, TappableComponent, CaptionComponent],
  template: `
    <tgui-tappable interactiveAnimation="opacity">
      <div *ngIf="hasIcon" class="icon">
        <ng-content></ng-content>
      </div>
      <tgui-caption 
        *ngIf="text()" 
        class="text"
        [weight]="'2'"
        [level]="platformService.isIOS() ? '2' : '1'"
      >
        {{ text() }}
      </tgui-caption>
    </tgui-tappable>
  `,
  styles: [`
    :host {
      display: flex;
      flex: 1 0 0;
      max-inline-size: 100%;
      min-inline-size: 0;
    }

    tgui-tappable {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 6px;
      width: 100%;
      padding: 12px 16px 16px;
      color: var(--tgui--secondary_hint_color);
    }

    :host-context(.tgui-platform-ios) tgui-tappable {
      padding: 8px 12px 4px;
      gap: 4px;
    }

    :host.selected tgui-tappable {
      color: var(--tgui--link_color);
    }

    .icon {
      display: flex;
      justify-content: center;
      min-width: 64px;
      padding: 2px 10px;
      border-radius: 35px;
    }

    :host:not(.platform-ios).selected .icon {
      background: var(--tgui--secondary_fill);
    }

    :host-context(.tgui-platform-ios) .icon {
      padding: 0;
    }

    .text {
      white-space: nowrap;
      max-inline-size: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'attr.data-refresh-platform': 'true'
  }
})
export class TabbarItemComponent {
  // Inject services
  protected platformService = inject(PlatformService);

  // Inputs
  text = input<string>('');
  selected = signal<boolean>(false);

  // Индекс вкладки, устанавливается родительским компонентом
  tabIndex = -1;
  
  // Callback на выбор вкладки, вызывается при клике
  onSelect: () => void = () => {};

  // Platform-specific class binding
  @HostBinding('class.platform-ios')
  get isIOS(): boolean {
    return this.platformService.isIOS();
  }

  // Selected state class binding
  @HostBinding('class.selected')
  get isSelected(): boolean {
    return this.selected();
  }

  // Обработчик клика
  @HostListener('click')
  onClick(): void {
    this.onSelect();
  }

  // Content projection check
  @ContentChild('icon') iconContent: any;
  
  get hasIcon(): boolean {
    return !!this.iconContent || true; // Default to true to match React behavior
  }
} 