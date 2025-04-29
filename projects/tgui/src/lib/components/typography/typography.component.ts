import { Component, Input, ElementRef, Renderer2, OnInit, ViewEncapsulation, HostBinding, ChangeDetectionStrategy, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * The Typography component is a versatile wrapper for text content, offering
 * customizable styling options such as weight, capitalization, and HTML tag. It's designed
 * to facilitate consistent text styling across your application, with support for customization
 * through inputs.
 */
@Component({
  selector: 'tgui-typography',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      font-family: var(--tgui--font-family);
      display: inline-block;
    }

    :host.plain {
      margin: 0;
    }

    :host.weight-1 {
      font-weight: var(--tgui--font_weight--accent1);
    }

    :host.weight-2 {
      font-weight: var(--tgui--font_weight--accent2);
    }

    :host.weight-3 {
      font-weight: var(--tgui--font_weight--accent3);
    }

    :host.caps {
      text-transform: uppercase;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypographyComponent implements OnInit, AfterViewInit {
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  /**
   * Controls the font weight of the text, with options ranging from light to bold.
   */
  @Input() weight: '1' | '2' | '3' = '3';

  /**
   * If true, transforms the text to uppercase for stylistic emphasis.
   */
  @Input() caps = false;

  /**
   * When true, removes the default margins around the text, useful for inline styling or custom layouts.
   */
  @Input() plain = true;

  /**
   * Optional custom tag to render the component as. Default is determined by the component implementation.
   */
  @Input() tag?: string;

  // Host bindings for CSS classes
  @HostBinding('class.plain') get isPlain() { return this.plain; }
  @HostBinding('class.caps') get isCaps() { return this.caps; }
  @HostBinding('class.weight-1') get isWeight1() { return this.weight === '1'; }
  @HostBinding('class.weight-2') get isWeight2() { return this.weight === '2'; }
  @HostBinding('class.weight-3') get isWeight3() { return this.weight === '3'; }

  ngOnInit() {
    // Apply the custom tag if specified
    if (this.tag) {
      const parentElement = this.elementRef.nativeElement.parentElement;
      const newElement = this.renderer.createElement(this.tag);
      
      // Transfer attributes
      for (const attr of this.elementRef.nativeElement.attributes) {
        this.renderer.setAttribute(newElement, attr.name, attr.value);
      }
      
      // Move children
      while (this.elementRef.nativeElement.childNodes.length > 0) {
        this.renderer.appendChild(newElement, this.elementRef.nativeElement.childNodes[0]);
      }
      
      // Replace the element
      this.renderer.insertBefore(parentElement, newElement, this.elementRef.nativeElement);
      this.renderer.removeChild(parentElement, this.elementRef.nativeElement);
    }
  }

  ngAfterViewInit() {
    // Handle any additional rendering tasks if needed
  }
} 