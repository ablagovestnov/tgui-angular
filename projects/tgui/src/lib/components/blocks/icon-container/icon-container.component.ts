import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  HostBinding,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Icon container component provides a wrapper for icons with proper styling
 */
@Component({
  selector: 'tgui-icon-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      display: inline-flex;
      color: var(--tgui--link_color);
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconContainerComponent {
  // Additional functionality can be added here if needed
} 