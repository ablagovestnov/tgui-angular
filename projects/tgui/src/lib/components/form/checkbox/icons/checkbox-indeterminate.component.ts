import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Icon component for checkbox in indeterminate state
 */
@Component({
  selector: 'tgui-icon-checkbox-indeterminate',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.class]="className()">
      <path fillRule="evenodd" clipRule="evenodd"
        d="M6.4 0h7.2c2.24 0 3.36 0 4.22.44a4 4 0 0 1 1.74 1.74c.44.86.44 1.98.44 4.22v7.2c0 2.24 0 3.36-.44 4.22a4 4 0 0 1-1.74 1.74c-.86.44-1.98.44-4.22.44H6.4c-2.24 0-3.36 0-4.22-.44a4 4 0 0 1-1.74-1.74C0 16.96 0 15.84 0 13.6V6.4c0-2.24 0-3.36.44-4.22A4 4 0 0 1 2.18.44C3.04 0 4.16 0 6.4 0ZM4 10a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Z"
        fill="currentColor" />
      <path d="M4 10a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Z" fill="#fff" />
    </svg>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconCheckboxIndeterminateComponent {
  className = input<string | undefined>(undefined);
} 