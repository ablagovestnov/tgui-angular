import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TguiIconBase } from '../icon-base.component';
import { TguiSvgPropsDirective } from '../directives';
import { TguiIconProps } from '../icon.interface';

@Component({
  selector: 'tgui-icon28-heart',
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
        d="M14 5.126c-.994-.932-2.343-1.678-3.823-1.95-1.761-.323-3.71.03-5.402 1.524-1.128.996-1.833 2.563-2.067 4.256a9.678 9.678 0 0 0 .834 5.41c.607 1.287 2.054 2.908 3.557 4.4 1.537 1.523 3.247 3.023 4.5 4.083a3.706 3.706 0 0 0 4.803 0c1.252-1.06 2.962-2.56 4.499-4.084 1.503-1.491 2.95-3.112 3.558-4.4a9.677 9.677 0 0 0 .833-5.409c-.233-1.693-.939-3.26-2.067-4.256-1.692-1.495-3.64-1.847-5.402-1.524-1.48.272-2.828 1.018-3.823 1.95Zm-4.148-.18c-1.274-.233-2.648.01-3.886 1.103-.72.635-1.283 1.758-1.475 3.153a7.878 7.878 0 0 0 .678 4.395c.455.964 1.677 2.381 3.198 3.89 1.488 1.477 3.159 2.942 4.394 3.988.72.61 1.757.61 2.478 0 1.235-1.046 2.906-2.511 4.394-3.988 1.521-1.509 2.743-2.926 3.198-3.89a7.878 7.878 0 0 0 .678-4.395c-.192-1.395-.756-2.518-1.475-3.153-1.238-1.093-2.612-1.336-3.886-1.103-1.304.24-2.502.984-3.271 1.857a1.17 1.17 0 0 1-1.754 0c-.768-.873-1.967-1.617-3.271-1.857Z"
        fill="currentColor" 
      />
    </svg>
  `,
})
export class TguiIcon28Heart extends TguiIconBase {
} 