import { Directive, ElementRef, input, effect } from '@angular/core';
import { TguiIconProps } from '../icon.interface';

/**
 * Directive for automatic passing of icon properties to SVG element
 * Allows using an approach similar to {...props} in React
 */
@Directive({
  selector: '[tguiSvgProps]',
  standalone: true
})
export class TguiSvgPropsDirective {
  props = input<TguiIconProps>();

  constructor(private el: ElementRef<SVGElement>) {
    // Track props changes
    effect(() => {
      if (this.props()) {
        this.applyProps();
      }
    });
  }

  private applyProps(): void {
    const el = this.el.nativeElement;
    const props = this.props();

    if (!props) return;

    // Apply basic attributes
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

    // Apply styles
    if (props.style) {
      const styleStr = Object.entries(props.style)
        .map(([key, value]) => `${this.kebabCase(key)}: ${value}`)
        .join('; ');
      el.setAttribute('style', styleStr);
    }

    // Add event handlers
    this.setupEventHandlers(el, props);
  }

  private setupEventHandlers(el: SVGElement, props: TguiIconProps): void {
    // Clear old handlers
    this.removeEventHandlers(el);

    // Add new ones
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
    // Remove all event listeners
    el.removeEventListener('click', () => {});
    el.removeEventListener('focus', () => {});
    el.removeEventListener('blur', () => {});
    el.removeEventListener('mouseenter', () => {});
    el.removeEventListener('mouseleave', () => {});
    el.removeEventListener('keydown', () => {});
    el.removeEventListener('pointerdown', () => {});
    el.removeEventListener('pointerup', () => {});
  }

  private kebabCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
  }
} 