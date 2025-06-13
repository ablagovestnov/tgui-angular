import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyComponent } from '../typography.component';

/**
 * The Subheadline component is designed to render text that serves as a secondary heading
 * or subheading within content. It leverages the Typography component for consistent text styling,
 * offering additional control over the text's size through the `level` prop. By default, it renders
 * as an `<h6>` element but can be customized with the `tag` property.
 */
@Component({
  selector: 'tgui-subheadline',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: inline-block;
    }
    
    :host.level-1 {
      font-size: var(--tgui--subheadline1--font_size);
      line-height: var(--tgui--subheadline1--line_height);
    }
    
    :host.level-2 {
      font-size: var(--tgui--subheadline2--font_size);
      line-height: var(--tgui--subheadline2--line_height);
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
export class SubheadlineComponent extends TypographyComponent {
  /**
   * Determines the size of the subheadline, with `1` being the default and '2' providing a smaller option.
   */
  level = input<'1' | '2'>('1');
  
  // Override tag to use h6 by default
  override tag = input<string | undefined>('h6');
  
  // Host bindings for level classes
  @HostBinding('class.level-1') get isLevel1() { return this.level() === '1'; }
  @HostBinding('class.level-2') get isLevel2() { return this.level() === '2'; }
  
  // Add host bindings for CSS weight classes and other properties
  @HostBinding('class.plain') override get isPlain() { return this.plain(); }
  @HostBinding('class.caps') override get isCaps() { return this.caps(); }
  @HostBinding('class.weight-1') override get isWeight1() { return this.weight() === '1'; }
  @HostBinding('class.weight-2') override get isWeight2() { return this.weight() === '2'; }
  @HostBinding('class.weight-3') override get isWeight3() { return this.weight() === '3'; }
} 