import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TguiIconBase } from '../icon-base.component';
import { TguiSvgPropsDirective } from '../directives';
import { TguiIconProps } from '../icon.interface';

@Component({
  selector: 'tgui-icon16-cancel',
  standalone: true,
  imports: [CommonModule, TguiSvgPropsDirective],
  template: `
    <svg 
      width="16" 
      height="16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      [tguiSvgProps]="props"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd"
        d="M3.3 3.3a1 1 0 0 1 1.4 0L8 6.58l3.3-3.3a1 1 0 1 1 1.4 1.42L9.42 8l3.3 3.3a1 1 0 0 1-1.42 1.4L8 9.42l-3.3 3.3a1 1 0 0 1-1.4-1.42L6.58 8l-3.3-3.3a1 1 0 0 1 0-1.4Z"
        fill="currentColor" 
      />
    </svg>
  `,
})
export class TguiIcon16Cancel extends TguiIconBase {
} 