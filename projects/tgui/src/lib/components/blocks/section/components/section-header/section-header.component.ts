import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  Input, 
  HostBinding,
  inject,
  effect
} from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { PlatformService } from '../../../../../services/platform.service';
import { HeadlineComponent } from '../../../../typography/headline/headline.component';
import { LargeTitleComponent } from '../../../../typography/large-title/large-title.component';

/**
 * The SectionHeader component represents a header for the Section component.
 * Supports large mode for an enlarged header.
 */
@Component({
  selector: 'tgui-section-header',
  standalone: true,
  imports: [CommonModule, NgClass, HeadlineComponent, LargeTitleComponent],
  template: `
    <header class="tgui-section-header" [ngClass]="headerClasses">
      <ng-container *ngIf="large; else defaultHeader">
        <tgui-large-title>
        <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
        </tgui-large-title>
      </ng-container>
      <ng-template #defaultHeader>
        <tgui-headline>
        <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
        </tgui-headline>
      </ng-template>
    </header>
    <ng-template #contentTpl>
      <ng-content></ng-content>
    </ng-template>
  `,
  styles: [`
    .tgui-section-header {
      padding: 20px 24px 4px 22px;
      color: var(--tgui--link_color);
    }

    .tgui-section-header--large {
      padding-left: 24px;
      color: var(--tgui--text_color);
    }

    .tgui-platform-ios .tgui-section-header {
      padding: 16px 16px 8px 16px;
      color: var(--tgui--section_header_text_color);
    }

    .tgui-section-header--ios.tgui-section-header--large {
      padding: 0 0 12px;
      color: var(--tgui--text_color);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeaderComponent {
  /** Enlarged header, changes font size, padding and color */
  @Input() large = false;


  get headerClasses(): Record<string, boolean> {
    return {
      'tgui-section-header--large': this.large
    };
  }
} 