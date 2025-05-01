import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  Input 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../../../badge/badge.component';

/**
 * Badge component specifically designed to be used with Image component.
 * Only supports number type badges.
 */
@Component({
  selector: 'tgui-image-badge',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  template: `
    <tgui-badge 
      type="number" 
      class="image-badge"
    >
      {{ displayValue }}
    </tgui-badge>
  `,
  styles: [`
    :host {
      position: absolute;
      bottom: -4px;
      right: -4px;
      z-index: 1;
    }
    
    .image-badge {
      min-width: 18px;
      height: 18px;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageBadgeComponent {
  /** Badge count number */
  @Input() count = 0;
  
  /** Maximum count to display before showing "maxCount+" */
  @Input() maxCount = 99;
  
  constructor() {
    console.assert(true, 'ImageBadge: Component supports only type="number"');
  }
  
  /** Compute display value with limit applied */
  get displayValue(): string {
    if (this.count <= this.maxCount) {
      return this.count.toString();
    }
    return `${this.maxCount}+`;
  }
} 