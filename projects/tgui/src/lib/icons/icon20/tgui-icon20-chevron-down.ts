import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TguiIconBase } from '../icon-base.component';
import { TguiSvgPropsDirective } from '../directives';
import { TguiIconProps } from '../icon.interface';

@Component({
  selector: 'tgui-icon20-chevron-down',
  standalone: true,
  imports: [CommonModule, TguiSvgPropsDirective],
  template: `
    <svg 
      width="20" 
      height="20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      tguiSvgProps
      [props]="props()"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd"
        d="M3.29289 6.29289c.39053-.39052 1.02369-.39052 1.41422 0L10 11.5858l5.2929-5.29291c.3905-.39052 1.0237-.39052 1.4142 0 .3905.39053.3905 1.02369 0 1.41422l-6 5.99999c-.3905.3905-1.02368.3905-1.41421 0l-6-5.99999c-.39052-.39053-.39052-1.02369 0-1.41422Z"
        fill="currentColor" 
      />
    </svg>
  `,
})
export class TguiIcon20ChevronDown extends TguiIconBase {
} 