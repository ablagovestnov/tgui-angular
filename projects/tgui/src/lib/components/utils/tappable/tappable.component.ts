import {
  Component,
  Input,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  signal,
  inject,
  effect,
  Signal,
  input,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformService, RippleService, RippleWave } from '../../../services';
import { RippleComponent } from './components/ripple/ripple.component';

@Component({
  selector: 'tgui-tappable',
  standalone: true,
  imports: [CommonModule, RippleComponent],
  template: `
    <tgui-ripple *ngIf="hasRippleEffect()" [waves]="rippleWaves()"></tgui-ripple>
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      position: relative;
      isolation: isolate;
      cursor: pointer;
      display: block;
      touch-action: manipulation;
      border-radius: inherit;
      overflow: hidden;
      user-select: none;
    }

    :host::after {
      content: '';
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity .15s ease-out;
      background: var(--tgui--bg_color);
      border-radius: inherit;
      pointer-events: none;
    }

    :host.readonly {
      cursor: default;
      pointer-events: none;
    }

    :host.disabled {
      cursor: default;
      opacity: .35;
      pointer-events: none;
    }

    /* iOS disables ::after overlay by default */
    :host.platform-ios::after {
      content: unset;
    }
    
    /* iOS uses direct opacity for hover (like original React) */
    :host.platform-ios:hover {
      opacity: .85;
    }

    /* iOS uses direct opacity for active (like original React) */
    :host.platform-ios.is-active {
      opacity: .65;
    }

    /* Non-iOS platforms use ::after overlay on active */
    :host:not(.platform-ios).is-active::after {
      opacity: var(--tgui--button--hovered-opacity, .15);
    }

    @media (hover: hover) and (pointer: fine) {
      /* Hover effect uses ::after overlay for all platforms */
      :host:hover::after {
        opacity: var(--tgui--button--hovered-opacity, .07);      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TappableComponent implements OnInit {
  /** Animation type for clicks */
  interactiveAnimation = input<'opacity' | 'background'>('background');
  
  /** Make component read-only */
  readonly = input<boolean>(false);
  
  /** Disable component */
  disabled = input<boolean>(false);

  /** Ripple effect waves */
  rippleWaves = signal<RippleWave[]>([]);

  /** Active state signal for programmatic control */
  private isActiveState = signal<boolean>(false);

  /** Service injections */
  private rippleService = inject(RippleService);
  private platformService = inject(PlatformService);

  /** Platform signal */
  private platformSignal = this.platformService.platform;

  /** Computed values */
  private isIOS = computed(() => {
    return this.platformSignal() === 'ios';
  });
  
  private isReadOnlyState = computed(() => this.readonly() || this.disabled());

  /** Computed ripple effect state */
  hasRippleEffect = computed(() => 
    !this.isIOS() &&
    this.interactiveAnimation() === 'background' &&
    !this.isReadOnlyState()
  );

  constructor() {
    // No need for explicit effect since we're using computed signals
  }

  ngOnInit(): void {
    // Initialization is handled by computed signals
  }

  /**
   * Pointerdown event handler
   */
  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    if (!this.isReadOnlyState()) {
      // Set active state programmatically
      this.isActiveState.set(true);
      
      // Handle ripple effect if needed
      if (this.hasRippleEffect()) {
        this.rippleService.handlePointerDown(event, this.rippleWaves);
      }
    }
  }

  /**
   * Pointercancel/pointerup/pointerleave event handler
   */
  @HostListener('pointercancel', ['$event'])
  @HostListener('pointerup', ['$event'])
  @HostListener('pointerleave', ['$event'])
  onPointerCancel(event: PointerEvent): void {
    // Always remove active state
    this.isActiveState.set(false);
    
    if (this.hasRippleEffect()) {
      this.rippleService.handlePointerCancel(event.pointerId);
    }
  }

  /** Host bindings */

  @HostBinding('class.readonly')
  get isReadonlyClass(): boolean {
    return this.readonly();
  }

  @HostBinding('class.disabled')
  get isDisabledClass(): boolean {
    return this.disabled();
  }

  @HostBinding('class.tappable--opacity')
  get isOpacityAnimation(): boolean {
    return this.interactiveAnimation() === 'opacity' && !this.isIOS();
  }

  @HostBinding('class.platform-ios')
  get isPlatformIOS(): boolean {
    return this.isIOS();
  }

  @HostBinding('class.is-active')
  get isActive(): boolean {
    return this.isActiveState();
  }

  @HostBinding('attr.readonly')
  get readonlyAttr() {
    return this.readonly() ? '' : null;
  }

  @HostBinding('attr.disabled')
  get disabledAttr() {
    return this.disabled() ? '' : null;
  }
}