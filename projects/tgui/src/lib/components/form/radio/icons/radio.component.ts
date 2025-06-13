import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Icon component for radio button in unchecked state
 */
@Component({
  selector: 'tgui-icon-radio',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.class]="className()">
        <path fillRule="evenodd" clipRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0 2a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" fill="currentColor" />
    </svg>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconRadioComponent {
  className = input<string | undefined>(undefined);
} 