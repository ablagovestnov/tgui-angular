import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TguiIconBase } from '../icon-base.component';
import { TguiSvgPropsDirective } from '../directives';
import { TguiIconProps } from '../icon.interface';

@Component({
  selector: 'tgui-icon28-archive',
  standalone: true,
  imports: [CommonModule, TguiSvgPropsDirective],
  template: `
    <svg 
      width="28" 
      height="29" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      tguiSvgProps
      [props]="props()"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd"
        d="M9.72 5.35c-.59 0-1.14.25-1.54.67l-.9.98H20.7l-.9-.98c-.4-.42-.95-.67-1.53-.67H9.72ZM22.29 8.8H5.7c-.19.32-.3.7-.3 1.08V20.2c0 1.7 1.38 3.07 3.08 3.07h11.05c1.7 0 3.07-1.37 3.07-3.07V9.88c0-.39-.1-.76-.3-1.08ZM4.54 7.33c-.6.7-.94 1.61-.94 2.55V20.2c0 2.7 2.18 4.87 4.87 4.87h11.05c2.69 0 4.87-2.18 4.87-4.87V9.88c0-.98-.36-1.91-1.02-2.63l-2.24-2.44a3.88 3.88 0 0 0-2.86-1.26H9.72c-1.09 0-2.13.46-2.86 1.26L4.62 7.25a4.13 4.13 0 0 0-.08.08ZM14 11.55c.5 0 .9.4.9.9v5.36l1.83-1.75a.9.9 0 0 1 1.25 1.3l-3.36 3.2a.9.9 0 0 1-1.24 0l-3.35-3.2a.9.9 0 1 1 1.24-1.3l1.83 1.75v-5.36c0-.5.4-.9.9-.9Z"
        fill="currentColor" 
      />
    </svg>
  `,
})
export class TguiIcon28Archive extends TguiIconBase {
} 