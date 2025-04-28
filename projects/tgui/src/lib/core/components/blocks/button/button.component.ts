import { 
    Component, 
    ViewEncapsulation, 
    ChangeDetectionStrategy, 
    Input, 
    HostBinding, 
    OnInit,
    ElementRef, 
    ContentChild, 
    TemplateRef,
    HostListener,
    inject
  } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { PlatformService } from '@services/platform.service';
  import { SpinnerComponent } from '@feedback/spinner/spinner.component';
  import { TappableComponent } from '@components/service/tappable/tappable.component';
  
  /**
   * Компонент Button предоставляет кастомизируемую кнопку с различными стилями и состояниями.
   * Поддерживает разные размеры, режимы отображения, состояние загрузки и др.
   */
  @Component({
    selector: 'tgui-button',
    standalone: true,
    imports: [CommonModule, SpinnerComponent, TappableComponent],
    template: `
      <tgui-tappable 
        [interactiveAnimation]="interactiveAnimation" 
        [readonly]="loading"
        [disabled]="disabled"
        class="button-tappable"
      >
        <!-- Spinner абсолютно позиционирован поверх контента -->
        <div *ngIf="loading" class="spinner">
          <tgui-spinner size="s"></tgui-spinner>
        </div>
  
        <!-- Содержимое кнопки во wrapper для корректного позиционирования -->
        <div class="button-content-wrapper">
          <ng-content select="[tguiButtonBefore]"></ng-content>
          <div *ngIf="beforeTemplate" class="before">
            <ng-container *ngTemplateOutlet="beforeTemplate"></ng-container>
          </div>
  
          <div class="content">
            <ng-content></ng-content>
          </div>
  
          <ng-content select="[tguiButtonAfter]"></ng-content>
          <div *ngIf="afterTemplate" class="after">
            <ng-container *ngTemplateOutlet="afterTemplate"></ng-container>
          </div>
        </div>
      </tgui-tappable>
    `,
    host: {
      'attr.data-refresh-platform': 'true'
    },
    styles: [`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 8px;
        text-decoration: none;
        box-sizing: border-box;
        max-inline-size: 100%;
        min-inline-size: 80px;
        position: relative;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation; /* Оптимизация для мобильных устройств */
      }
  
      :host.stretched {
        inline-size: 100%;
        flex-grow: 1;
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
  
      .button-tappable {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: inherit;
      }
  
      /* Обертка для всего контента кнопки */
      .button-content-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: inherit; /* Наследовать gap от host элемента */
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        padding: var(--tgui--button--padding, 0);
        box-sizing: border-box;
        user-select: none;
        -webkit-user-select: none;
      }
  
      .before,
      .after {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 1;
        user-select: none;
        -webkit-user-select: none;
      }
  
      .content {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        z-index: var(--tgui--z-index--simple);
        position: relative; /* Чтобы был над ripple */
        user-select: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none; /* Предотвращает появление контекстного меню на iOS при долгом нажатии */
      }
  
      .spinner {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: auto;
        background: inherit;
        border-radius: inherit;
        color: var(--tgui--button--spinner-color);
        z-index: 2; /* Поднимаем над контентом */
      }
  
      /* Size Variants */
      :host.size-s {
        height: 36px;
        min-width: 34px;
        gap: 6px;
        border-radius: 20px;
        --tgui--button--padding: 8px 12px;
      }
  
      :host.size-m {
        height: 42px;
        min-width: 42px;
        gap: 8px;
        border-radius: 8px;
        --tgui--button--padding: 8px 14px;
      }
  
      :host.size-l {
        height: 50px;
        gap: 10px;
        --tgui--button--padding: 10px 20px;
      }
  
      /* Mode Variants */
      :host.mode-filled {
        --tgui--button--hovered-opacity: .15;
        --tgui--button--spinner-color: var(--tgui--button_text_color);
        --tgui--ripple-color: rgba(255, 255, 255, 0.5);
        color: var(--tgui--button_text_color);
        background: var(--tgui--button_color);
      }
  
      :host.mode-bezeled {
        --tgui--button--hovered-opacity: .07;
        --tgui--button--spinner-color: var(--tgui--link_color);
        --tgui--ripple-color: rgba(0, 120, 255, 0.5);
        color: var(--tgui--link_color);
        background: var(--tgui--secondary_fill);
      }
  
      :host.mode-plain {
        --tgui--button--hovered-opacity: .03;
        --tgui--button--spinner-color: var(--tgui--plain_foreground);
        --tgui--ripple-color: rgba(0, 120, 255, 0.5);
        color: var(--tgui--link_color);
        background: transparent;
      }
  
      :host.mode-gray {
        --tgui--button--hovered-opacity: .5;
        --tgui--button--spinner-color: var(--tgui--plain_foreground);
        --tgui--ripple-color: rgba(0, 0, 0, 0.4);
        color: var(--tgui--plain_foreground);
        background: var(--tgui--plain_background);
      }
  
      :host.mode-outline {
        --tgui--button--hovered-opacity: .5;
        --tgui--button--spinner-color: var(--tgui--plain_foreground);
        --tgui--ripple-color: rgba(0, 0, 0, 0.3);
        color: var(--tgui--plain_foreground);
        background: inherit;
        box-shadow: 0 0 0 1px var(--tgui--outline);
      }
  
      :host.mode-white {
        --tgui--button--hovered-opacity: .5;
        --tgui--button--spinner-color: var(--tgui--surface_dark);
        --tgui--ripple-color: rgba(0, 0, 0, 0.3);
        background: var(--tgui--white);
        color: var(--tgui--black);
      }
  
      /* Platform Specific */
      .tgui-platform-ios :host.size-m {
        border-radius: 12px;
      }
  
      .tgui-platform-ios :host::after {
        content: unset;
      }
  
      /* Loading State */
      :host.loading .before,
      :host.loading .after,
      :host.loading .content {
        opacity: 0;
      }
  
      /* Disabled State */
      :host.disabled {
        opacity: 0.6;
        cursor: default;
        pointer-events: none;
      }
  
      /* Hover Effects */
      @media (hover: hover) and (pointer: fine) {
        :host:hover::after {
          opacity: var(--tgui--button--hovered-opacity);
        }
      }
  
      /* Button Typography Sizing */
      :host.size-l .content {
        font-size: var(--tgui--text--font_size);
        line-height: var(--tgui--text--line_height);
        font-weight: var(--tgui--font_weight--accent2);
      }
  
      :host.size-m .content,
      :host.size-s .content {
        font-size: var(--tgui--subheadline2--font_size);
        line-height: var(--tgui--subheadline2--line_height);
        font-weight: var(--tgui--font_weight--accent2);
      }
    `],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class ButtonComponent implements OnInit {
    /**
     * Размер кнопки ('s', 'm', 'l')
     */
    @Input() size: 's' | 'm' | 'l' = 'm';
  
    /**
     * Визуальный стиль кнопки
     */
    @Input() mode: 'filled' | 'bezeled' | 'plain' | 'gray' | 'outline' | 'white' = 'filled';
  
    /**
     * Если true, кнопка будет растянута по ширине контейнера
     */
    @Input() stretched = false;
  
    /**
     * Если true, показывает индикатор загрузки вместо содержимого кнопки
     */
    @Input() loading = false;
  
    /**
     * Если true, кнопка будет отключена
     */
    @Input() disabled = false;
  
    /**
     * Тип кнопки (для HTML-атрибута type)
     */
    @Input() type: 'button' | 'submit' | 'reset' = 'button';
  
    /**
     * Тип интерактивной анимации ('opacity' | 'background')
     */
    @Input() interactiveAnimation: 'opacity' | 'background' = 'background';
  
    /**
     * Шаблон для контента перед основным текстом кнопки
     */
    @ContentChild('beforeContent') beforeTemplate?: TemplateRef<any>;
  
    /**
     * Шаблон для контента после основного текста кнопки
     */
    @ContentChild('afterContent') afterTemplate?: TemplateRef<any>;
  
    /**
     * Флаг, указывающий, является ли текущая платформа iOS
     */
    isIOS = false;
  
    @HostBinding('class.size-s') get isSizeS() { return this.size === 's'; }
    @HostBinding('class.size-m') get isSizeM() { return this.size === 'm'; }
    @HostBinding('class.size-l') get isSizeL() { return this.size === 'l'; }
  
    @HostBinding('class.mode-filled') get isModeFilled() { return this.mode === 'filled'; }
    @HostBinding('class.mode-bezeled') get isModeBezeled() { return this.mode === 'bezeled'; }
    @HostBinding('class.mode-plain') get isModePlain() { return this.mode === 'plain'; }
    @HostBinding('class.mode-gray') get isModeGray() { return this.mode === 'gray'; }
    @HostBinding('class.mode-outline') get isModeOutline() { return this.mode === 'outline'; }
    @HostBinding('class.mode-white') get isModeWhite() { return this.mode === 'white'; }
  
    @HostBinding('class.stretched') get isStretched() { return this.stretched; }
    @HostBinding('class.loading') get isLoading() { return this.loading; }
    @HostBinding('class.disabled') get isDisabled() { return this.disabled; }
  
    @HostBinding('attr.type') get buttonType() { return this.type; }
    @HostBinding('attr.disabled') get buttonDisabled() { return this.disabled ? true : null; }
    
    private platformService = inject(PlatformService);
    private elementRef = inject(ElementRef);
  
    @HostListener('selectstart', ['$event'])
    onSelectStart(event: Event): boolean {
      // Предотвращаем выделение текста
      event.preventDefault();
      return false;
    }
  
    ngOnInit(): void {
      // Получаем текущую платформу из сервиса
      this.isIOS = this.platformService.isIOS();
      
      // Преобразуем компонент в настоящую кнопку для лучшей доступности
      this.transformToButton();
    }
    
    /**
     * Преобразует хост-элемент в настоящую HTML-кнопку для лучшей доступности и семантики
     */
    private transformToButton(): void {
      const element = this.elementRef.nativeElement;
      
      // Добавляем атрибуты для улучшения доступности
      if (!element.hasAttribute('role')) {
        element.setAttribute('role', 'button');
      }
      
      if (!element.hasAttribute('tabindex') && !this.disabled) {
        element.setAttribute('tabindex', '0');
      }
      
      // Добавляем CSS для предотвращения выделения текста (для старых браузеров)
      element.style.webkitUserSelect = 'none';
      element.style.userSelect = 'none';
      
      // Добавляем обработчики событий клавиатуры для доступности
      element.addEventListener('keydown', (event: KeyboardEvent) => {
        if ((event.key === 'Enter' || event.key === ' ') && !this.disabled) {
          event.preventDefault();
          element.click();
        }
      });
      
      // Дополнительный слушатель для предотвращения выделения текста
      element.addEventListener('selectstart', (event: Event) => {
        event.preventDefault();
        return false;
      });
    }
  } 