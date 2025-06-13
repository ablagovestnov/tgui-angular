import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TguiIconBase } from '../icon-base.component';
import { TguiSvgPropsDirective } from '../directives';
import { TguiIconProps } from '../icon.interface';

@Component({
  selector: 'tgui-icon24-chevron-left',
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
        d="M15.7071 3.79289c-.3905-.39052-1.0237-.39052-1.4142 0L6.79289 11.2929c-.39052.3905-.39052 1.0237 0 1.4142l7.50001 7.5c.3905.3905 1.0237.3905 1.4142 0 .3905-.3905.3905-1.0237 0-1.4142L8.91421 12l6.79289-6.79289c.3905-.39053.3905-1.02369 0-1.41422Z"
        fill="currentColor" 
      />
    </svg>
  `,
})
export class TguiIcon24ChevronLeft extends TguiIconBase {
} 