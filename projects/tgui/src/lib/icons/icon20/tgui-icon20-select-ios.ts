import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TguiIconBase } from '../icon-base.component';
import { TguiSvgPropsDirective } from '../directives';
import { TguiIconProps } from '../icon.interface';

@Component({
  selector: 'tgui-icon20-select-ios',
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
        d="M8.174 18c-.473 0-.876-.21-1.208-.63l-4.602-5.82a1.727 1.727 0 0 1-.284-.465 1.423 1.423 0 0 1-.08-.474c0-.365.118-.666.355-.903s.536-.356.898-.356c.408 0 .752.18 1.03.539l3.856 5.017 7.525-12.242c.154-.243.313-.414.48-.51.165-.104.372-.156.621-.156.361 0 .657.116.889.347.23.23.346.526.346.884 0 .146-.024.292-.071.438a2.017 2.017 0 0 1-.222.456L9.39 17.335c-.284.443-.69.665-1.217.665Z"
        fill="currentColor"
      />
    </svg>
  `,
})
export class TguiIcon20SelectIos extends TguiIconBase {
} 