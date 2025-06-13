import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TguiIconBase } from '../../../../icons/icon-base.component';
import { TguiSvgPropsDirective } from '../../../../icons/directives';

/**
 * Slash icon used in breadcrumb navigation as a separator
 */
@Component({
  selector: 'tgui-breadcrumbs-slash-icon',
  standalone: true,
  imports: [CommonModule, TguiSvgPropsDirective],
  template: `
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      tguiSvgProps
      [props]="props()"
    >
      <path 
        d="M13 5L8 15" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
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
export class BreadcrumbsSlashIconComponent extends TguiIconBase {
} 