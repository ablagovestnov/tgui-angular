import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyComponent } from '../typography.component';

/**
 * Text component is designed for general-purpose text rendering,
 * offering a wide range of typographic options. It extends the Typography
 * component, inheriting its flexibility and styling capabilities.
 * This component is ideal for paragraphs, labels, or any textual content, providing
 * consistent styling across the application.
 */
@Component({
  selector: 'tgui-text',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: inline-block;
    }
    
    :host.level-1 {
      font-size: var(--tgui--text--font_size);
      line-height: var(--tgui--text--line_height);
    }
    
    :host.level-2 {
      font-size: var(--tgui--text--font_size);
      line-height: var(--tgui--text--line_height);
      font-size: 0.95em;
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
export class TextComponent extends TypographyComponent {
  /**
   * The size level of the text, influencing its styling.
   */
  level = input<'1' | '2'>('1');
  
  // Override plain property to keep consistency
  override plain = input<boolean>(true);
  
  // Host bindings for level classes
  @HostBinding('class.level-1') get isLevel1() { return this.level() === '1'; }
  @HostBinding('class.level-2') get isLevel2() { return this.level() === '2'; }
  
  // Add host bindings for CSS classes of weights and other properties
  @HostBinding('class.plain') override get isPlain() { return this.plain(); }
  @HostBinding('class.caps') override get isCaps() { return this.caps(); }
  @HostBinding('class.weight-1') override get isWeight1() { return this.weight() === '1'; }
  @HostBinding('class.weight-2') override get isWeight2() { return this.weight() === '2'; }
  @HostBinding('class.weight-3') override get isWeight3() { return this.weight() === '3'; }
} 