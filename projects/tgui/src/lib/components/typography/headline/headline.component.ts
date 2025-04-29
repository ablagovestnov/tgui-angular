import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyComponent } from '@typography/typography.component';

/**
 * The Headline component serves as a wrapper for text that is intended to be displayed prominently,
 * typically used for section headings or important titles within the application. It leverages the Typography
 * component for consistent typographic styling, offering a range of customization options through its props.
 * The component defaults to an `<h5>` HTML tag, providing semantic meaning and ensuring good SEO practices,
 * but can be customized as needed.
 */
@Component({
  selector: 'tgui-headline',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: inline-block;
    }
    
    :host.level-1 {
      font-size: var(--tgui--headline--font_size);
      line-height: var(--tgui--headline--line_height);
    }
    
    :host.level-2 {
      font-size: calc(var(--tgui--headline--font_size) * 0.95);
      line-height: var(--tgui--headline--line_height);
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
export class HeadlineComponent extends TypographyComponent {
  /**
   * The size level of the headline, influencing its styling.
   */
  @Input() level: '1' | '2' = '1';
  
  // Override tag to use h5 by default
  @Input() override tag = 'h5';
  
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