import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  HostBinding,
  inject,
  Input,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../../services/platform.service';

/**
 * Renders a container for list items, applying platform-specific styles for consistency 
 * across different operating systems. This component serves as a foundational element 
 * for creating lists in a user interface.
 */
@Component({
  selector: 'tgui-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    :host ::ng-deep > :not(:last-child) {
      margin-bottom: 12px;
    }
    
    :host-context(.tgui-platform-ios) {
      padding: 10px 18px;
      box-sizing: border-box;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  protected platformService = inject(PlatformService);
} 