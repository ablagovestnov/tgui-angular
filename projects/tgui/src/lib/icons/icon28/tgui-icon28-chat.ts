import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TguiIconBase } from '../icon-base.component';
import { TguiSvgPropsDirective } from '../directives';
import { TguiIconProps } from '../icon.interface';

@Component({
  selector: 'tgui-icon28-chat',
  standalone: true,
  imports: [CommonModule, TguiSvgPropsDirective],
  template: `
    <svg 
      width="28" 
      height="28" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      tguiSvgProps
      [props]="props()"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd"
        d="M7.15 20.64c.27-.6.45-1.29.45-2.13a7.55 7.55 0 0 1-2.91-5.84c0-4.44 4.17-8.04 9.3-8.04 5.15 0 9.32 3.6 9.32 8.04 0 4.44-4.17 8.04-9.31 8.04-.8 0-1.58-.1-2.33-.26a7.55 7.55 0 0 1-3.19 1.86c-.87.29-1.94.54-3.21.7a8.4 8.4 0 0 0 1.88-2.37Zm5.12 1.93c.57.08 1.14.12 1.73.12 5.95 0 11.29-4.23 11.29-10.02 0-5.8-5.34-10.02-11.3-10.02-5.94 0-11.28 4.22-11.28 10.02 0 2.58 1.1 4.9 2.82 6.63-.2.82-.75 1.4-1.65 2.3a1.98 1.98 0 0 0 1.63 3.37c3.24-.4 5.42-1.37 6.76-2.4Z"
        fill="currentColor" 
      />
    </svg>
  `,
})
export class TguiIcon28Chat extends TguiIconBase {
} 