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
  Signal
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformService, RippleService, RippleWave } from '../../../services';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TappableComponent implements OnInit, OnChanges {
  /** Тип анимации для кликов */
  @Input() interactiveAnimation: 'opacity' | 'background' = 'background';
  
  /** Сделать компонент только для чтения */
  @Input() set readonly(value: boolean | string) {
    this._readonly = value;
    this.updateHasRippleEffect();
  }
  get readonly(): boolean | string {
    return this._readonly;
  }
  private _readonly: boolean | string = false;
  
  /** Отключить компонент */
  @Input() set disabled(value: boolean | string) {
    this._disabled = value;
    this.updateHasRippleEffect();
  }
  get disabled(): boolean | string {
    return this._disabled;
  }
  private _disabled: boolean | string = false;

  /** Волны ripple эффекта */
  rippleWaves = signal<RippleWave[]>([]);

  /** Приватное кешированное значение ripple эффекта */
  private _hasRippleEffect = false;

  /** Подключения сервисов */
  private rippleService = inject(RippleService);
  private platformService = inject(PlatformService);

  private isIOS = false;
  private platformSignal?: Signal<string>;

  /** Public API для шаблона */
  get hasRippleEffect(): boolean {
    return this._hasRippleEffect;
  }

  constructor() {
    this.platformSignal = this.platformService.platform;
    effect(() => {
      const platform = this.platformSignal!();
      this.isIOS = platform === 'ios';
      this.updateHasRippleEffect();
    });
  }

  ngOnInit(): void {
    this.isIOS = this.platformService.isIOS();
    this.updateHasRippleEffect();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['interactiveAnimation']) {
      this.updateHasRippleEffect();
    }
  }

  private updateHasRippleEffect(): void {
    const isDisabled = this.isReadOnly();
    this._hasRippleEffect = !this.isIOS &&
                            this.interactiveAnimation === 'background' &&
                            !isDisabled;
  }

  /**
   * Обработчик pointerdown
   */
  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    if (!this.isReadOnly() && this.hasRippleEffect) {
      this.rippleService.handlePointerDown(event, this.rippleWaves);
    }
  }

  /**
   * Обработчик pointercancel/pointerup/pointerleave
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
   * Проверка на readonly состояние
   */
  private isReadOnly(): boolean {
    const isReadonlyValue = this._readonly === true || 
                            (typeof this._readonly === 'string' && this._readonly !== 'false');
    const isDisabledValue = this._disabled === true || 
                            (typeof this._disabled === 'string' && this._disabled !== 'false');
    return isReadonlyValue || isDisabledValue;
  }

  /** Биндим классы */

  @HostBinding('class.readonly')
  get isReadonlyClass(): boolean {
    return this.isReadOnly();
  }

  @HostBinding('class.disabled')
  get isDisabledClass(): boolean {
    return this._disabled === true || 
           (typeof this._disabled === 'string' && this._disabled !== 'false');
  }

  @HostBinding('class.tappable--opacity')
  get isOpacityAnimation(): boolean {
    return this.interactiveAnimation === 'opacity';
  }

  @HostBinding('attr.readonly')
  get readonlyAttr() {
    return this._readonly ? '' : null;
  }

  @HostBinding('attr.disabled')
  get disabledAttr() {
    return this._disabled ? '' : null;
  }
}