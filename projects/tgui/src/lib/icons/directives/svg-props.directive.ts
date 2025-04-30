import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TguiIconProps } from '../icon.interface';

/**
 * Директива для автоматической передачи свойств иконки в SVG элемент
 * Позволяет использовать подход, аналогичный {...props} в React
 */
@Directive({
  selector: '[tguiSvgProps]',
  standalone: true
})
export class TguiSvgPropsDirective implements OnChanges {
  @Input('tguiSvgProps') props!: TguiIconProps;

  constructor(private el: ElementRef<SVGElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['props'] && this.props) {
      this.applyProps();
    }
  }

  private applyProps(): void {
    const el = this.el.nativeElement;
    const props = this.props;

    // Применяем базовые атрибуты
    if (props.class) el.setAttribute('class', props.class);
    if (props.id) el.setAttribute('id', props.id);
    if (props.fill) el.setAttribute('fill', props.fill);
    if (props.stroke) el.setAttribute('stroke', props.stroke);
    if (props.width) el.setAttribute('width', props.width.toString());
    if (props.height) el.setAttribute('height', props.height.toString());
    if (props.role) el.setAttribute('role', props.role);
    if (props.tabIndex !== undefined) el.setAttribute('tabindex', props.tabIndex.toString());
    if (props.autoFocus) el.setAttribute('autofocus', 'true');
    if (props.ariaLabel) el.setAttribute('aria-label', props.ariaLabel);
    if (props.title) el.setAttribute('title', props.title);

    // Применяем стили
    if (props.style) {
      const styleStr = Object.entries(props.style)
        .map(([key, value]) => `${this.kebabCase(key)}: ${value}`)
        .join('; ');
      el.setAttribute('style', styleStr);
    }

    // Добавляем обработчики событий
    this.setupEventHandlers(el, props);
  }

  private setupEventHandlers(el: SVGElement, props: TguiIconProps): void {
    // Очищаем старые обработчики
    this.removeEventHandlers(el);

    // Добавляем новые
    if (props.onClick) {
      el.addEventListener('click', (e) => props.onClick?.emit(e as MouseEvent));
    }
    if (props.onFocus) {
      el.addEventListener('focus', (e) => props.onFocus?.emit(e as FocusEvent));
    }
    if (props.onBlur) {
      el.addEventListener('blur', (e) => props.onBlur?.emit(e as FocusEvent));
    }
    if (props.onMouseEnter) {
      el.addEventListener('mouseenter', (e) => props.onMouseEnter?.emit(e as MouseEvent));
    }
    if (props.onMouseLeave) {
      el.addEventListener('mouseleave', (e) => props.onMouseLeave?.emit(e as MouseEvent));
    }
    if (props.onKeyDown) {
      el.addEventListener('keydown', (e) => props.onKeyDown?.emit(e as KeyboardEvent));
    }
    if (props.onPointerDown) {
      el.addEventListener('pointerdown', (e) => props.onPointerDown?.emit(e as PointerEvent));
    }
    if (props.onPointerUp) {
      el.addEventListener('pointerup', (e) => props.onPointerUp?.emit(e as PointerEvent));
    }
  }

  private removeEventHandlers(el: SVGElement): void {
    // Функция-заглушка для удаления обработчиков
    // В реальном коде здесь должны быть removeEventListener для каждого типа события
  }

  private kebabCase(str: string): string {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
  }
} 