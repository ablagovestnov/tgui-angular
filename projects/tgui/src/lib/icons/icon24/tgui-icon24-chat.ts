import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TguiIconBase } from '../icon-base.component';
import { TguiSvgPropsDirective } from '../directives';
import { TguiIconProps } from '../icon.interface';

@Component({
  selector: 'tgui-icon24-chat',
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
        d="M6.665 18.088A4.269 4.269 0 0 0 7 16.37c-1.54-1.259-2.5-3.04-2.5-5.017 0-3.815 3.582-6.908 8-6.908 4.419 0 8 3.093 8 6.908 0 3.816-3.581 6.909-8 6.909-.69 0-1.36-.076-2-.218-.423.464-1.236 1.062-2.59 1.539-.78.274-1.741.508-2.91.652.644-.635 1.288-1.27 1.665-2.148Zm4.38 1.88c.475.062.961.095 1.455.095 5.156 0 9.8-3.66 9.8-8.709 0-5.048-4.644-8.708-9.8-8.708-5.155 0-9.8 3.66-9.8 8.708 0 2.232.938 4.227 2.414 5.73-.175.65-.623 1.126-1.379 1.871a1.8 1.8 0 0 0 1.485 3.068c2.768-.341 4.648-1.165 5.824-2.056Z"
        fill="currentColor" 
      />
    </svg>
  `,
})
export class TguiIcon24Chat extends TguiIconBase {
} 