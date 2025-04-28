import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyComponent } from '@typography/typography.component';

/**
 * The Caption component is a text wrapper that applies specific typographic styles,
 * based on the provided `level` prop. It's built on top of the Typography component,
 * ensuring consistent text styling across the application. It primarily serves for text
 * that acts as a small, descriptive label or annotation.
 */
@Component({
  selector: 'tgui-caption',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: inline-block;
    }
    
    :host.level-1 {
      font-size: var(--tgui--caption1--font_size);
      line-height: var(--tgui--caption1--line_height);
    }
    
    :host.level-2 {
      font-size: var(--tgui--caption2--font_size);
      line-height: var(--tgui--caption2--line_height);
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
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaptionComponent extends TypographyComponent {
  /**
   * The size level of the caption, influencing its styling and typography size.
   */
  @Input() level: '1' | '2' = '1';
  
  // Host bindings for CSS classes
  @Input() override tag = 'span';
  
  // Host bindings for level classes
  @HostBinding('class.level-1') get isLevel1() { return this.level === '1'; }
  @HostBinding('class.level-2') get isLevel2() { return this.level === '2'; }
  
  // Добавляем привязки хоста для CSS-классов весов и других свойств
  @HostBinding('class.plain') override get isPlain() { return this.plain; }
  @HostBinding('class.caps') override get isCaps() { return this.caps; }
  @HostBinding('class.weight-1') override get isWeight1() { return this.weight === '1'; }
  @HostBinding('class.weight-2') override get isWeight2() { return this.weight === '2'; }
  @HostBinding('class.weight-3') override get isWeight3() { return this.weight === '3'; }
} 