import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input, 
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tgui-ios-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container [ngSwitch]="size()">
      <svg *ngSwitchCase="'l'" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M34.2 18.9C33.5 18.9 33 18.4 33 17.7C33 15.7 32.6 13.6 31.8 11.8C31 9.9 29.9 8.2 28.5 6.8C27.1 5.4 25.4 4.3 23.5 3.5C21.7 2.7 19.7 2.3 17.7 2.3C17 2.3 16.5 1.8 16.5 1.1C16.5 0.4 17 -0.1 17.7 -0.1C20 -0.1 22.3 0.4 24.5 1.3C26.7 2.2 28.6 3.5 30.2 5.1C31.8 6.7 33.1 8.6 34 10.8C34.9 13 35.4 15.3 35.4 17.6C35.4 18.3 34.9 18.9 34.2 18.9Z" fill="currentColor"/>
      </svg>
      <svg *ngSwitchCase="'m'" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26.6 14.7C26.1 14.7 25.7 14.3 25.7 13.8C25.7 12.2 25.4 10.6 24.8 9.2C24.2 7.7 23.3 6.4 22.2 5.3C21.1 4.2 19.8 3.3 18.3 2.7C16.9 2.1 15.3 1.8 13.7 1.8C13.2 1.8 12.8 1.4 12.8 0.9C12.8 0.4 13.2 0 13.7 0C15.5 0 17.3 0.3 19 1C20.7 1.7 22.2 2.7 23.5 4C24.8 5.3 25.8 6.8 26.5 8.5C27.2 10.2 27.5 12 27.5 13.8C27.5 14.3 27.1 14.7 26.6 14.7Z" fill="currentColor"/>
      </svg>
      <svg *ngSwitchDefault width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 10.5C18.7 10.5 18.4 10.2 18.4 9.9C18.4 8.7 18.2 7.6 17.7 6.6C17.3 5.5 16.6 4.6 15.8 3.8C15 3 14.1 2.4 13 1.9C12 1.5 10.9 1.3 9.7 1.3C9.4 1.3 9.1 1 9.1 0.7C9.1 0.4 9.4 0.1 9.7 0.1C11.1 0.1 12.4 0.4 13.6 0.9C14.8 1.4 15.9 2.1 16.8 3C17.7 3.9 18.4 5 18.9 6.2C19.4 7.4 19.7 8.7 19.7 10.1C19.9 10.2 19.5 10.5 19 10.5Z" fill="currentColor"/>
      </svg>
    </ng-container>
  `,
  styles: [`
    :host {
      display: inline-flex;
      color: inherit;
    }
    
    svg {
      animation: spinner-rotate 1s linear infinite;
    }
    
    @keyframes spinner-rotate {
      100% {
        transform: rotate(360deg);
      }
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IOSSpinnerComponent {
  size = input<'s' | 'm' | 'l'>('s');
} 