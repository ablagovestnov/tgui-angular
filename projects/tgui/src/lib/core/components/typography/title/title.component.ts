import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyComponent } from '@typography/typography.component';

/**
 * The Title component is designed to render text as a page or section heading,
 * providing clear hierarchy and structure within content. It supports three levels of emphasis,
 * allowing for flexibility in design while maintaining semantic integrity. By default, it uses `h3`
 * for its semantic HTML element but can be customized via the `level` prop or explicitly with the `tag` property.
 */
@Component({
  selector: 'tgui-title',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: inline-block;
    }
    
    :host.level-1 {
      font-size: var(--tgui--title1--font_size);
      line-height: var(--tgui--title1--line_height);
    }
    
    :host.level-2 {
      font-size: var(--tgui--title2--font_size);
      line-height: var(--tgui--title2--line_height);
    }
    
    :host.level-3 {
      font-size: var(--tgui--title3--font_size);
      line-height: var(--tgui--title3--line_height);
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
export class TitleComponent extends TypographyComponent {
  /**
   * Determines the size and semantic tag of the title, with options for `h2`, `h3`, or `h4`.
   */
  @Input() level: '1' | '2' | '3' = '2';
  
  // Host bindings for level classes
  @HostBinding('class.level-1') get isLevel1() { return this.level === '1'; }
  @HostBinding('class.level-2') get isLevel2() { return this.level === '2'; }
  @HostBinding('class.level-3') get isLevel3() { return this.level === '3'; }
  
  // Добавляем привязки хоста для CSS-классов весов и других свойств
  @HostBinding('class.plain') override get isPlain() { return this.plain; }
  @HostBinding('class.caps') override get isCaps() { return this.caps; }
  @HostBinding('class.weight-1') override get isWeight1() { return this.weight === '1'; }
  @HostBinding('class.weight-2') override get isWeight2() { return this.weight === '2'; }
  @HostBinding('class.weight-3') override get isWeight3() { return this.weight === '3'; }
  
  // Set the correct semantic HTML tag based on level
  private titleLevelTags: Record<string, string> = {
    '1': 'h2',
    '2': 'h3',
    '3': 'h4'
  };
  
  // Override ngOnInit to set the tag based on level
  override ngOnInit() {
    // Set the tag based on level if no custom tag is specified
    if (!this.tag) {
      this.tag = this.titleLevelTags[this.level];
    }
    
    // Call the parent's ngOnInit
    super.ngOnInit();
  }
} 