import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TguiIconBase } from '../icon-base.component';
import { TguiSvgPropsDirective } from '../directives';
import { TguiIconProps } from '../icon.interface';

@Component({
  selector: 'tgui-icon28-edit',
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
        d="M18.92 3.4c.21-.03.43-.03.64 0 .58.06 1.04.32 1.47.66.41.32.86.77 1.4 1.29l.06.07c.55.54 1 1 1.34 1.4.35.44.62.91.7 1.5.02.21.02.43 0 .65a2.89 2.89 0 0 1-.7 1.5c-.33.4-.8.86-1.34 1.4L10.48 23.73l-.08.08a4.6 4.6 0 0 1-1.23.97 2.9 2.9 0 0 1-.26.11c-.47.17-.97.17-1.56.17H7.12c-.74 0-1.37 0-1.88-.06a2.9 2.9 0 0 1-1.5-.55c-.2-.15-.37-.32-.52-.51a2.9 2.9 0 0 1-.54-1.5c-.06-.51-.06-1.14-.06-1.88v-.16c0-.58 0-1.07.16-1.53l.14-.33c.22-.44.56-.78.97-1.19l.08-.08L16.06 5.35c.53-.52.98-.97 1.39-1.29.43-.34.9-.6 1.47-.67Zm.44 1.78h-.24c-.1.01-.26.06-.56.3-.32.25-.7.62-1.27 1.18l-.7.7 3.96 3.9.64-.64c.6-.58.98-.96 1.23-1.28.25-.3.3-.46.31-.57v-.25c-.01-.1-.06-.27-.3-.57-.26-.32-.65-.7-1.24-1.29a17.1 17.1 0 0 0-1.27-1.18c-.3-.24-.45-.29-.56-.3Zm-.1 7.34-3.95-3.9-10.07 9.94c-.53.52-.64.64-.7.77l-.06.13a17.21 17.21 0 0 0-.01 2.77c.04.38.11.52.18.6.05.08.12.14.19.2.08.07.23.14.6.18.4.05.92.05 1.73.05h.07a3.66 3.66 0 0 0 1.17-.1c.13-.07.26-.18.8-.71l10.06-9.93Z"
        fill="currentColor" 
      />
    </svg>
  `,
})
export class TguiIcon28Edit extends TguiIconBase {
} 