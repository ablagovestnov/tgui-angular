import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TguiIconBase } from '../icon-base.component';
import { TguiSvgPropsDirective } from '../directives';
import { TguiIconProps } from '../icon.interface';

@Component({
  selector: 'tgui-icon24-cancel',
  standalone: true,
  imports: [CommonModule, TguiSvgPropsDirective],
  template: `
    <svg 
      width="24" 
      height="24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      tguiSvgProps
      [props]="props()"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd"
        d="M4.5 4.44a.9.9 0 0 1 1.27 0L12 10.56l6.22-6.14a.9.9 0 0 1 1.27 1.28l-6.21 6.13 6.2 6.13a.9.9 0 0 1-1.26 1.28L12 13.1l-6.23 6.15a.9.9 0 1 1-1.26-1.28l6.2-6.13-6.2-6.13a.9.9 0 0 1-.01-1.27Z"
        fill="currentColor" 
      />
    </svg>
  `,
})
export class TguiIcon24Cancel extends TguiIconBase {
} 