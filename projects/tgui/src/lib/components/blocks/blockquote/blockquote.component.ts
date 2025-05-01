import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  input, 
  HostBinding,
  TemplateRef,
  ContentChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconContainerComponent } from '../icon-container/icon-container.component';
import { SubheadlineComponent } from '../../typography/subheadline/subheadline.component';
import { TguiIcon12Quote } from '../../../icons/icon12/tgui-icon12-quote';

/**
 * Renders a stylized blockquote element, typically used for quotations or special text.
 * The component can include an icon in the top right corner and supports different content types
 * for flexible use within UI designs.
 */
@Component({
  selector: 'tgui-blockquote',
  standalone: true,
  imports: [CommonModule, IconContainerComponent, SubheadlineComponent, TguiIcon12Quote],
  template: `
    <ng-template #contentTpl>
      <ng-content></ng-content>
    </ng-template>
    
    <ng-container *ngIf="type() === 'text'; else otherContent">
      <tgui-subheadline class="text">
        <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
      </tgui-subheadline>
    </ng-container>
    
    <ng-template #otherContent>
      <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
    </ng-template>
    
    <tgui-icon-container class="top-right-icon">
      <ng-container *ngIf="topRightIcon; else defaultIcon">
        <ng-container *ngTemplateOutlet="topRightIcon"></ng-container>
      </ng-container>
      <ng-template #defaultIcon>
        <tgui-icon12-quote></tgui-icon12-quote>
      </ng-template>
    </tgui-icon-container>
  `,
  styles: [`
    :host {
      position: relative;
      padding: 6px 28px 8px 12px;
      display: block;
      border-left: 3px solid var(--tgui--link_color);
      border-radius: 4px;
      background: var(--tgui--secondary_fill);
    }

    .text {
      color: var(--tgui--text_color);
    }

    .top-right-icon {
      position: absolute;
      top: 4px;
      right: 6px;
      display: block;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockquoteComponent {
  /** Determines the content type within the blockquote, influencing its presentation. */
  type = input<'text' | 'other'>('text');

  /** An optional template for the icon displayed in the top right corner of the blockquote. */
  @ContentChild('topRightIcon') topRightIcon?: TemplateRef<any>;
} 