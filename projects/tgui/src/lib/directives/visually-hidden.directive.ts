import { Directive, ElementRef, OnInit } from '@angular/core';

/**
 * Directive that visually hides an element while keeping it accessible for screen readers.
 * Used for improving accessibility by providing context for screen reader users
 * without affecting the visual presentation.
 */
@Directive({
  selector: '[tguiVisuallyHidden]',
  standalone: true
})
export class VisuallyHiddenDirective implements OnInit {
  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const element = this.el.nativeElement;
    element.style.position = 'absolute';
    element.style.blockSize = '1px';
    element.style.inlineSize = '1px';
    element.style.padding = '0';
    element.style.margin = '-1px';
    element.style.whiteSpace = 'nowrap';
    element.style.clip = 'rect(0, 0, 0, 0)';
    element.style.clipPath = 'inset(50%)';
    element.style.overflow = 'hidden';
    element.style.border = '0';
    element.style.opacity = '0';
  }
} 