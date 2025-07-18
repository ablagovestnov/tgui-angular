import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TguiIconBase } from '../icon-base.component';
import { TguiSvgPropsDirective } from '../directives';
import { TguiIconProps } from '../icon.interface';

@Component({
  selector: 'tgui-icon12-quote',
  standalone: true,
  imports: [CommonModule, TguiSvgPropsDirective],
  template: `
    <svg 
      width="12" 
      height="12" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      tguiSvgProps
      [props]="props()"
    >
      <path
        d="M3.07 7.7c.14-.36-.14-.74-.5-.93A2 2 0 1 1 5.5 5V5c0 1.55-.27 2.67-.57 3.43a5.33 5.33 0 0 1-.67 1.22 1 1 0 0 1-1.53-1.3h.01l.07-.1c.06-.1.16-.28.26-.54ZM4.26 9.65ZM8.07 7.7c.14-.36-.14-.74-.5-.93A2 2 0 1 1 10.5 5V5c0 1.55-.27 2.67-.57 3.43a5.33 5.33 0 0 1-.67 1.22 1 1 0 0 1-1.53-1.3h.01l.07-.1c.06-.1.16-.28.26-.54ZM9.26 9.65Z"
        fill="currentColor" 
      />
    </svg>
  `,
})
export class TguiIcon12Quote extends TguiIconBase {
} 