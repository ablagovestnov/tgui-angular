import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  HostBinding, 
  inject,
  input,
  computed,
  signal,
  effect
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
  host: {
    'attr.data-refresh-platform': 'true'
  },
  template: `
    <div role="status" class="wrapper" [class.wrapper--ios]="isIOS()">
      <ng-container *ngIf="isIOS(); else baseSpinner">
        <tgui-ios-spinner [size]="size()"></tgui-ios-spinner>
      </ng-container>
      <ng-template #baseSpinner>
        <tgui-base-spinner [size]="size()"></tgui-base-spinner>
      </ng-template>
    </div>
  `,
  styles: [`
    .wrapper {
      color: var(--tgui--link_color);
    }

    .wrapper--ios {
      color: var(--tgui--hint_color);
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
   * Signal indicating whether the current platform is iOS
   */
  isIOS = signal<boolean>(false);

  constructor() {
    // Initialize the iOS platform check
    this.isIOS.set(this.platformService.isIOS());
    
    // Subscribe to platform changes
    effect(() => {
      const platform = this.platformService.platform();
      this.isIOS.set(platform === 'ios');
    });
  }

  @HostBinding('class.size-s') get isSizeS() { return this.size() === 's'; }
  @HostBinding('class.size-m') get isSizeM() { return this.size() === 'm'; }
  @HostBinding('class.size-l') get isSizeL() { return this.size() === 'l'; }
} 