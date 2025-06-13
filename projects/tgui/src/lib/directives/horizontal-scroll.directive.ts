import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[tguiHorizontalScroll]',
  standalone: true
})
export class HorizontalScrollDirective {
  @HostBinding('style.display') display = 'flex';
  @HostBinding('style.overflow-x') overflowX = 'scroll';
  @HostBinding('style.-webkit-overflow-scrolling') webkitOverflowScrolling = 'touch';
  @HostBinding('style.scrollbar-width') scrollbarWidth = 'none';        // Firefox
  @HostBinding('style.-ms-overflow-style') msOverflowStyle = 'none';    // IE/Edge
  @HostBinding('class.tgui-hide-scrollbar') hideScrollbar = true;       // Chrome/Safari
}