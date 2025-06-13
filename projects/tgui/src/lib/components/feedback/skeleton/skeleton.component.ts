import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input,
  HostBinding
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Used as a placeholder during the loading state of a component or page.
 * It can visually mimic the layout that will be replaced by the actual content once loaded,
 * improving user experience by reducing perceived loading times.
 */
@Component({
  selector: 'tgui-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      position: relative;
    }
    
    :host.visible::before,
    :host.visible::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: var(--tgui--z-index--simple);
    }
    
    :host.visible::before {
      background: var(--tgui--secondary_bg_color);
    }
    
    :host:not(.without-animation).visible::after {
      z-index: var(--tgui--z-index--skeleton);
      background-color: var(--tgui--bg_color);
      animation: fade 1.8s linear infinite;
    }
    
    @keyframes fade {
      0%, 100% {
        opacity: .4;
      }
    
      50% {
        opacity: .7;
      }
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonComponent {
  /**
   * If true, disables the shimmering animation of the skeleton.
   */
  withoutAnimation = input<boolean>(false);
  
  /**
   * If true, the skeleton overlay is shown above the content.
   * When false, the skeleton is hidden, showing any underlying content.
   */
  visible = input<boolean>(true);
  
  @HostBinding('class.without-animation')
  get isWithoutAnimation() {
    return this.withoutAnimation();
  }
  
  @HostBinding('class.visible')
  get isVisible() {
    return this.visible();
  }
} 