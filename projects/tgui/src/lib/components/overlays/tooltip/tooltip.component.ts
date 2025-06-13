import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input,
  computed,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopperComponent } from '../popper/popper.component';
import { CaptionComponent } from '../../typography/caption/caption.component';
import { ThemeService } from '../../../services/theme.service';
import { PlacementWithAuto } from '../popper/hooks';
import { PlatformService } from '../../../services/platform.service';

/**
 * TODO: Implement as a directive to allow usage like:
 * <tgui-button tguiTooltip [tguiTooltipContent]="TEMPLATE OR STRING CONTENT">
 * 
 * The Tooltip component provides text labels that appear when the user hovers over, focuses on,
 * or touches an element. It's built on top of the Popper component for automatic positioning
 * relative to the target element. The tooltip supports light and dark modes for different visual
 * contexts and uses the Caption component for its content to ensure consistent typography.
 */
@Component({
  selector: 'tgui-tooltip',
  standalone: true,
  imports: [CommonModule, PopperComponent, CaptionComponent],
  template: `
    <tgui-popper
      [withArrow]="true"
      [arrowProps]="{
        style: arrowStyle()
      }"
      [targetRef]="targetRef()"
      [sameWidth]="sameWidth()"
      [placement]="placement()"
      [offsetByMainAxis]="offsetByMainAxis()"
      [offsetByCrossAxis]="offsetByCrossAxis()"
      [autoUpdateOnTargetResize]="autoUpdateOnTargetResize()"
      [customMiddlewares]="customMiddlewares()"
    >
      <div [class]="tooltipClass()">
        <tgui-caption level="1">
          <ng-content></ng-content>
        </tgui-caption>
      </div>
    </tgui-popper>
  `,
  styles: [`
    :host {
      display: block;
      position: absolute;
    }

    .tooltip-wrapper {
      padding: 12px;
      border-radius: 12px;
      color: var(--tgui--black);
      background: var(--tgui--white);
      box-shadow: 0 8px 24px 0 rgba(0, 0, 0, .10);
    }

    .tooltip-wrapper--dark {
      box-shadow: none;
      color: var(--tgui--white);
      background: var(--tgui--secondary_bg_color);
    }

    :host-context(.tgui-platform-ios) .tooltip-wrapper--dark {
      backdrop-filter: blur(50px);
      -webkit-backdrop-filter: blur(50px);
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'attr.data-refresh-platform': 'true'
  }
})
export class TooltipComponent {
  /** Reference to the target element or virtual element for precise positioning. */
  targetRef = input<HTMLElement | { getBoundingClientRect: () => DOMRect } | null>(null);

  /** Defines the theme of the tooltip, affecting its background and text color. */
  mode = input<'light' | 'dark'>('light');

  /** Placement of the tooltip relative to the target element */
  placement = input<PlacementWithAuto>('auto');

  /** Match width of the tooltip with target element */
  sameWidth = input<boolean>(false);

  /** Offset along the main axis */
  offsetByMainAxis = input<number>(8);

  /** Offset along the cross axis */
  offsetByCrossAxis = input<number>(0);

  /** Whether to update tooltip position when target element resizes */
  autoUpdateOnTargetResize = input<boolean>(false);

  /** Custom middlewares for floating-ui positioning */
  customMiddlewares = input<any[]>([]);

  private themeService = inject(ThemeService);
  private platformService = inject(PlatformService);

  // Computed values for class bindings
  tooltipClass = computed(() => {
    const isDark = this.mode() === 'dark';
    const isIOS = this.platformService.isIOS();
    
    return `tooltip-wrapper ${isDark ? 'tooltip-wrapper--dark' : ''} ${isIOS ? 'tooltip-wrapper--ios' : ''}`;
  });

  // Computed values for arrow styles
  arrowStyle = computed(() => {
    const isDark = this.mode() === 'dark';
    
    return {
      color: isDark ? 'var(--tgui--secondary_bg_color)' : 'var(--tgui--white)'
    };
  });
} 