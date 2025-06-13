import { Component } from '@angular/core';

/**
 * This is a placeholder component for demonstrating custom icons in the Rating component.
 * In the future, you could replace the star icon with this or any other SVG icon.
 */
@Component({
  selector: 'tgui-icon-heart',
  standalone: true,
  template: `
    <svg 
      width="40" 
      height="40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      [attr.aria-hidden]="true">
      <path
        d="M20 35.42l-1.64-1.49C10.48 26.89 4 21.08 4 13.9 4 8.09 8.59 3.5 14.4 3.5c3.33 0 6.53 1.55 8.6 4 2.07-2.45 5.27-4 8.6-4 5.81 0 10.4 4.59 10.4 10.4 0 7.18-6.48 12.99-14.36 20.03l-1.64 1.49z"
        fill="currentColor" 
        opacity=".8"
      />
    </svg>
  `
})
export class IconHeartComponent {} 