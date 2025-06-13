import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input,
  inject,
  HostBinding,
  ContentChild,
  ElementRef,
  computed,
  AfterContentInit,
  signal,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TappableComponent } from '../../../../utils/tappable/tappable.component';
import { LargeTitleComponent, TitleComponent } from '../../../../typography';
import { PlatformService } from '../../../../../services/platform.service';

/**
 * PinInputButton component for PIN code entry
 * Provides a button optimized for number entry in PIN inputs
 * Supports both content input property and ng-content projection
 */
@Component({
  selector: 'tgui-pin-input-button',
  standalone: true,
  imports: [CommonModule, TappableComponent, LargeTitleComponent, TitleComponent],
  host: {
    'attr.data-refresh-platform': 'true'
  },
  template: `
    <tgui-tappable 
      class="wrapper"
    >
      <ng-container *ngIf="content() == null || content() == undefined ;else inputContent">
        <ng-content></ng-content>
      </ng-container>
      <ng-template #inputContent>
        <ng-container *ngIf="isIOSPlatform(); else baseContent">
          <tgui-large-title>{{ content() }}</tgui-large-title>
        </ng-container>
        <ng-template #baseContent>
          <tgui-title>{{ content() }}</tgui-title>
        </ng-template>
      </ng-template>
    </tgui-tappable>
  `,
  styles: [`
    :host {
      display: block;
      width: var(--tgui--pin_input--button-width);
      height: 56px;
    }

    .wrapper {
      width: 100%;
      height: 100%;
      padding: 0;
      border: none;
      border-radius: 16px;
      color: var(--tgui--text_color);
      background: var(--tgui--tertiary_bg_color);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :host(.pin-button-ios) {
      width: 76px;
      height: 76px;
    }
    
    :host(.pin-button-ios) .wrapper {
      border-radius: 50%;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinInputButtonComponent {
  // Input for button content as signal
  content = input<string | number | null>(null);
  
  // Inject platform service
  protected platformService = inject(PlatformService);
  
  // Platform signal to track iOS state
  protected isIOSPlatform = signal<boolean>(false);
  
  constructor() {
    // Initialize iOS state
    this.isIOSPlatform.set(this.platformService.isIOS());
    
    // Track platform changes
    effect(() => {
      const platform = this.platformService.platform();
      this.isIOSPlatform.set(platform === 'ios');
      console.log(`[PinInputButton] Platform changed to: ${platform}, isIOS: ${this.isIOSPlatform()}`);
    });
  }
  
  // Host bindings for platform classes
  @HostBinding('class.pin-button-ios') get isIOS() {
    return this.isIOSPlatform();
  }
} 