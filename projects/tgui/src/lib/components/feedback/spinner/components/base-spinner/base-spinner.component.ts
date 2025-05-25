import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input,
  computed,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tgui-base-spinner',
  standalone: true,
  imports: [
    CommonModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  template: `
    <ng-container [ngSwitch]="size()">
    <svg *ngSwitchCase="'l'" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <use xlink:href="#spinner_44" fill="none">
      <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 22 22"
              to="360 22 22"
              dur="0.7s"
              repeatCount="indefinite"
            />
      </use>
      <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" id="spinner_44">
        <path
          d="M22 4C25.1288 4 28.2036 4.81556 30.9211 6.36624C33.6386 7.91693 35.9049 10.1492 37.4967 12.8429C39.0884 15.5365 39.9505 18.5986 39.9979 21.727C40.0454 24.8555 39.2765 27.9423 37.7672 30.683C36.258 33.4237 34.0603 35.7236 31.3911 37.356C28.7219 38.9884 25.6733 39.8968 22.5459 39.9917C19.4185 40.0866 16.3204 39.3647 13.5571 37.8971C10.7939 36.4296 8.46085 34.2671 6.78817 31.6229"
          stroke="currentColor" stroke-width="4" stroke-linecap="round" />
      </symbol>
    </svg>

      <svg *ngSwitchCase="'m'" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <use xlink:href="#spinner_36" fill="none">
          <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="0.7s"
              repeatCount="indefinite"
            />
        </use>
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" id="spinner_36">
          <path
            d="M18 4c2.4335 0 4.825.63432 6.9386 1.84041S28.815 8.7827 30.053 10.8778c1.238 2.0951 1.9085 4.4766 1.9454 6.9099.0369 2.4332-.5611 4.8341-1.735 6.9657-1.1739 2.1317-2.8831 3.9205-4.9592 5.1902-2.0761 1.2696-4.4472 1.9762-6.8796 2.05-2.4324.0738-4.842-.4877-6.9913-1.6292-2.14918-1.1414-3.96375-2.8234-5.26472-4.8799"
            stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        </symbol>
      </svg>

      <svg *ngSwitchCase="'s'" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <use xlink:href="#spinner_24" fill="none">
        <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 12 12"
              to="360 12 12"
              dur="0.7s"
              repeatCount="indefinite"
            />        </use>
        <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="spinner_24">
          <path
            d="M12 3c1.5644 0 3.1018.40778 4.4605 1.18312 1.3588.77535 2.492 1.89147 3.2878 3.23831.7959 1.34683 1.2269 2.87787 1.2507 4.44207.0237 1.5642-.3607 3.1076-1.1154 4.478-.7546 1.3703-1.8534 2.5203-3.188 3.3365-1.3347.8162-2.859 1.2704-4.4227 1.3179-1.5636.0474-3.11269-.3136-4.49433-1.0473-1.38163-.7338-2.54815-1.8151-3.38448-3.1371"
            stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
        </symbol>
      </svg>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseSpinnerComponent {
  size = input<'s' | 'm' | 'l'>('s');
} 