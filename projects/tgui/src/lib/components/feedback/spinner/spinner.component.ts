import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  HostBinding, 
  inject,
  input,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../../services';
import { BaseSpinnerComponent } from './components/base-spinner/base-spinner.component';
import { IOSSpinnerComponent } from './components/ios-spinner/ios-spinner.component';

/**
 * Spinner component displays a loading indicator.
 * Automatically selects the appropriate indicator style based on the platform.
 */
@Component({
  selector: 'tgui-spinner',
  standalone: true,
  imports: [CommonModule, BaseSpinnerComponent, IOSSpinnerComponent],
  template: `
    <div role="status" class="wrapper" [class.wrapper--ios]="isIOS">
      <ng-container *ngIf="isIOS; else baseSpinner">
        <tgui-ios-spinner [size]="size()"></tgui-ios-spinner>
      </ng-container>
      <ng-template #baseSpinner>
        <tgui-base-spinner [size]="size()"></tgui-base-spinner>
      </ng-template>
    </div>
  `,
  styles: [`
    :host {
      display: inline-flex;
      color: inherit;
    }

    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :host.size-s .wrapper {
      width: 20px;
      height: 20px;
    }

    :host.size-m .wrapper {
      width: 28px;
      height: 28px;
    }

    :host.size-l .wrapper {
      width: 36px;
      height: 36px;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
  /**
   * Size of the loading indicator ('s' - small, 'm' - medium, 'l' - large)
   */
  size = input<'s' | 'm' | 'l'>('m');
  
  private platformService = inject(PlatformService);
  
  /**
   * Flag indicating whether the current platform is iOS
   */
  isIOS = this.platformService.isIOS();

  @HostBinding('class.size-s') get isSizeS() { return this.size() === 's'; }
  @HostBinding('class.size-m') get isSizeM() { return this.size() === 'm'; }
  @HostBinding('class.size-l') get isSizeL() { return this.size() === 'l'; }
} 