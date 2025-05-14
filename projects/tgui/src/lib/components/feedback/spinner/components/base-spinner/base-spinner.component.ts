import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tgui-base-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container [ngSwitch]="size()">
      <svg *ngSwitchCase="'l'" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle class="spinner-path" cx="22" cy="22" r="20" stroke="currentColor" stroke-width="4" fill="none"/>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 22 22"
          to="360 22 22"
          dur="0.7s"
          repeatCount="indefinite"
        />
      </svg>
      <svg *ngSwitchCase="'m'" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle class="spinner-path" cx="18" cy="18" r="16" stroke="currentColor" stroke-width="4" fill="none"/>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 18 18"
          to="360 18 18"
          dur="0.7s"
          repeatCount="indefinite"
        />
      </svg>
      <svg *ngSwitchDefault width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle class="spinner-path" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="0.7s"
          repeatCount="indefinite"
        />
      </svg>
    </ng-container>
  `,
  styles: [`
    :host {
      display: inline-flex;
      color: inherit;
    }
    
    .spinner-path {
      stroke-linecap: round;
      animation: spinner-dash 1.4s ease-in-out infinite;
    }
    
    @keyframes spinner-dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseSpinnerComponent {
  size = input<'s' | 'm' | 'l'>('s');
} 