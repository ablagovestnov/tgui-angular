import { Component, Input, HostBinding, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent } from '../../typography/text/text.component';
import { TitleComponent } from '../../typography/title/title.component';

/**
 * A versatile component designed to display a placeholder with optional text, images, and actions.
 */
@Component({
  selector: 'tgui-placeholder',
  standalone: true,
  imports: [CommonModule, TextComponent, TitleComponent],
  template: `
    <section class="tgui-placeholder">
      <ng-content></ng-content>
      <ng-content select="[image]"></ng-content>
      <dl *ngIf="header || description" class="fields">
        <tgui-title *ngIf="header" level="3" weight="2" tag="dt">{{header}}</tgui-title>
        <tgui-text *ngIf="description" class="description" tag="dd">{{description}}</tgui-text>
      </dl>
      <ng-content select="[action]"></ng-content>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .tgui-placeholder {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 32px;
      gap: 24px;
    }
    
    .fields {
      overflow-wrap: anywhere;
      text-align: center;
      margin: 0;
    }
    
    .description {
      color: var(--tgui--hint_color);
    }
    
    .description:not(:first-child) {
      margin-top: 8px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderComponent {
  /** The primary text, usually a title or a header, for the placeholder. */
  @Input() header?: string;
  
  /** Additional descriptive text to provide more details or context. */
  @Input() description?: string;
  
} 