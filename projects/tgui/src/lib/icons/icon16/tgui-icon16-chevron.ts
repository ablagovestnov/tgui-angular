import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TguiIconBase } from '../icon-base.component';
import { TguiSvgPropsDirective } from '../directives';
import { TguiIconProps } from '../icon.interface';

@Component({
  selector: 'tgui-icon16-chevron',
  standalone: true,
  imports: [CommonModule, TguiSvgPropsDirective],
  template: `
    <svg 
      width="16" 
      height="16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      tguiSvgProps
      [props]="props()"
    >
      <path 
        d="m6 3 5 5-5 5" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  `,
})
export class TguiIcon16Chevron extends TguiIconBase {
} 