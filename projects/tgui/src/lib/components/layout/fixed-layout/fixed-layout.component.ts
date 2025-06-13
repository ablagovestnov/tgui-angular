import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  input, 
  computed, 
  HostBinding,
  inject,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../../services/platform.service';

/**
 * This component provides a flexible way to create a layout that is fixed to either the top or bottom of its parent container.
 * It's useful for creating headers, footers, or any element that should remain in view regardless of the scrolling content.
 */
@Component({
  selector: 'tgui-fixed-layout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      position: fixed;
      left: 0;
      right: 0;
      display: block;
    }

    :host.vertical-top {
      top: 0;
    }

    :host.vertical-bottom {
      padding-bottom: var(--tgui--safe_area_inset_bottom);
      bottom: 0;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'attr.data-refresh-platform': 'true'
  }
})
export class FixedLayoutComponent {

  // Inputs
  vertical = input<'top' | 'bottom'>('bottom');

  // Host bindings for vertical position
  @HostBinding('class.vertical-top')
  get isTopPosition(): boolean {
    return this.vertical() === 'top';
  }

  @HostBinding('class.vertical-bottom')
  get isBottomPosition(): boolean {
    return this.vertical() === 'bottom';
  }

} 