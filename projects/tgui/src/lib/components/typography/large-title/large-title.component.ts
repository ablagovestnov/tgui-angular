import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyComponent } from '@typography/typography.component';

/**
 * The LargeTitle component is designed for prominent display text, typically used for major headings
 * or titles within an application. It encapsulates the Typography component's features, offering
 * extensive styling and semantic customization options while defaulting to an `<h1>` HTML element.
 * This choice of default component underscores the importance and hierarchy of the text it encapsulates,
 * making it suitable for primary page titles or significant headings.
 */
@Component({
  selector: 'tgui-large-title',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: inline-block;
    }
    
    :host.level-1 {
      font-size: var(--tgui--large_title--font_size);
      line-height: var(--tgui--large_title--line_height);
    }
    
    :host.level-2 {
      font-size: calc(var(--tgui--large_title--font_size) * 0.92);
      line-height: var(--tgui--large_title--line_height);
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
export class LargeTitleComponent extends TypographyComponent {
  /**
   * The size level of the large title, influencing its styling.
   */
  @Input() level: '1' | '2' = '1';
  
  // Override tag to use h1 by default
  @Input() override tag = 'h1';
  
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