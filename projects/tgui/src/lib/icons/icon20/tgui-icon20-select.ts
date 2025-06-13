import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TguiIconBase } from '../icon-base.component';
import { TguiSvgPropsDirective } from '../directives';
import { TguiIconProps } from '../icon.interface';

@Component({
  selector: 'tgui-icon20-select',
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
        d="M2.5 10.821 7 15.75l10.5-11.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  `,
})
export class TguiIcon20Select extends TguiIconBase {
} 