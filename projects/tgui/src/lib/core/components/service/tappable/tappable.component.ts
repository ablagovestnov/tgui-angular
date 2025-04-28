import { Component, Input, ElementRef, HostBinding, HostListener, OnInit, OnDestroy, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformService } from '@services/platform.service';
import { RippleService, RippleWave } from '@services/ripple.service';
import { RippleComponent } from './components/ripple/ripple.component';

@Component({
  selector: 'tgui-tappable',
  standalone: true,
  imports: [CommonModule, RippleComponent],
  template: `
      <tgui-ripple *ngIf="hasRippleEffect" [waves]="rippleWaves()"></tgui-ripple>
      <ng-content></ng-content>
  `,
  styles: [`
    :host {
      position: relative;
      isolation: isolate;
      cursor: pointer;
      transition: opacity .15s ease-out;
      display: block;
      touch-action: manipulation;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      overflow: hidden;
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

    :host(.tappable--opacity:active),
    :host-context(.tgui-platform-ios):host(:active) {
      opacity: .65;
    }

    @media (hover: hover) and (pointer: fine) {
      :host(.tappable--opacity:hover),
      :host-context(.tgui-platform-ios):host(:hover) {
        opacity: .85;
      }
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TappableComponent implements OnInit, OnDestroy {
  /** Animation type for interactive elements */
  @Input() interactiveAnimation: 'opacity' | 'background' = 'background';
  
  /** Disable interactions */
  @Input() set readonly(value: boolean | string) {
    this._readonly = value;
  }
  get readonly(): boolean | string {
    return this._readonly;
  }
  @HostBinding('attr.readonly') get readonlyAttr() {
    return this._readonly ? '' : null;
  }
  private _readonly: boolean | string = false;
  
  /** Disable the component */
  @Input() set disabled(value: boolean | string) {
    this._disabled = value;
  }
  get disabled(): boolean | string {
    return this._disabled;
  }
  @HostBinding('attr.disabled') get disabledAttr() {
    return this._disabled ? '' : null;
  }
  private _disabled: boolean | string = false;
  
  /** Ripple waves for the ripple effect */
  rippleWaves = signal<RippleWave[]>([]);
  
  /** Flag to determine current platform */
  private isIOS = false;
  
  /**
   * Whether to show ripple effect
   */
  get hasRippleEffect(): boolean {
    const isDisabled = this.isReadOnly();
    
    // Show ripple only for base (non-iOS) platform,
    // with 'background' animation type and not in disabled/readonly state
    return !this.isIOS && 
           this.interactiveAnimation === 'background' && 
           !isDisabled;
  }

  /**
   * Apply class for readonly state
   */
  @HostBinding('class.readonly')
  get isReadonlyClass(): boolean {
    return this._readonly === true || 
           (typeof this._readonly === 'string' && this._readonly !== 'false');
  }

  /**
   * Apply class for disabled state
   */
  @HostBinding('class.disabled')
  get isDisabledClass(): boolean {
    return this._disabled === true || 
           (typeof this._disabled === 'string' && this._disabled !== 'false');
  }

  /**
   * Apply CSS class for opacity animation
   */
  @HostBinding('class.tappable--opacity')
  get isOpacityAnimation(): boolean {
    return this.interactiveAnimation === 'opacity';
  }

  private rippleService = inject(RippleService);
  private platformService = inject(PlatformService);
  private elementRef = inject(ElementRef);

  ngOnInit(): void {
    // Get current platform from service
    this.isIOS = this.platformService.isIOS();
  }

  ngOnDestroy(): void {
    // No need to unsubscribe since we're using signals
  }

  /**
   * Handle pointer down event
   */
  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    
    // Check readonly only for ripple effect, but always process the event
    if (!this.isReadOnly() && this.hasRippleEffect) {
      this.rippleService.handlePointerDown(event, this.rippleWaves);
    }
  }

  /**
   * Handle pointer cancel event
   */
  @HostListener('pointercancel', ['$event'])
  @HostListener('pointerup', ['$event'])
  @HostListener('pointerleave', ['$event'])
  onPointerCancel(event: PointerEvent): void {
    if (this.hasRippleEffect) {
      this.rippleService.handlePointerCancel(event.pointerId);
    }
  }

  /**
   * Check if the component is read-only
   */
  private isReadOnly(): boolean {
    const isReadonlyValue = this._readonly === true || 
                          (typeof this._readonly === 'string' && this._readonly !== 'false');
    const isDisabledValue = this._disabled === true || 
                          (typeof this._disabled === 'string' && this._disabled !== 'false');
    
    return isReadonlyValue || isDisabledValue;
  }
} 