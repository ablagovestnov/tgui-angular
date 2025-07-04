import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TguiIconBase } from '../icon-base.component';
import { TguiSvgPropsDirective } from '../directives';
import { TguiIconProps } from '../icon.interface';

@Component({
  selector: 'tgui-icon28-add-circle',
  standalone: true,
  imports: [CommonModule, TguiSvgPropsDirective],
  template: `
    <svg 
      width="29" 
      height="28" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      tguiSvgProps
      [props]="props()"
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd"
        d="M14.5 3.9C8.92193 3.9 4.40001 8.42192 4.40001 14c0 5.5781 4.52192 10.1 10.09999 10.1 5.5781 0 10.1-4.5219 10.1-10.1 0-5.57808-4.5219-10.1-10.1-10.1ZM2.60001 14c0-6.57219 5.32781-11.9 11.89999-11.9 6.5722 0 11.9 5.32781 11.9 11.9 0 6.5722-5.3278 11.9-11.9 11.9-6.57218 0-11.89999-5.3278-11.89999-11.9ZM14.5 8.6c.4971 0 .9.40294.9.9v3.6H19c.4971 0 .9.4029.9.9 0 .4971-.4029.9-.9.9h-3.6v3.6c0 .4971-.4029.9-.9.9-.4971 0-.9-.4029-.9-.9v-3.6H10c-.49705 0-.89999-.4029-.89999-.9 0-.4971.40294-.9.89999-.9h3.6V9.5c0-.49706.4029-.9.9-.9Z"
        fill="currentColor" 
      />
    </svg>
  `,
})
export class TguiIcon28AddCircle extends TguiIconBase {
} 