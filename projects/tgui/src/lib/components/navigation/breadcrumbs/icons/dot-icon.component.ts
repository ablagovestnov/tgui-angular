import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TguiIconBase } from '../../../../icons/icon-base.component';
import { TguiSvgPropsDirective } from '../../../../icons/directives';

/**
 * Dot icon used in breadcrumb navigation as a separator
 */
@Component({
  selector: 'tgui-breadcrumbs-dot-icon',
  standalone: true,
  imports: [CommonModule, TguiSvgPropsDirective],
  template: `
    <svg 
      width="21" 
      height="20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      [tguiSvgProps]="props"
    >
      <circle cx="10.5" cy="10" r="2" fill="currentColor" />
    </svg>
  `,
    styles: [`
        :host {
          display: flex;
          align-items: center;
          line-height: 0;
        }
      `]
})
export class BreadcrumbsDotIconComponent extends TguiIconBase {
} 