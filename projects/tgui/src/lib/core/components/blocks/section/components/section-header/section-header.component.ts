import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  Input, 
  HostBinding,
  inject
} from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { PlatformService } from '@services/platform.service';
import { HeadlineComponent } from '@typography/headline/headline.component';
import { LargeTitleComponent } from '@typography/large-title/large-title.component';

/**
 * Компонент SectionHeader представляет заголовок для компонента Section.
 * Поддерживает режим large для увеличенного заголовка.
 */
@Component({
  selector: 'tgui-section-header',
  standalone: true,
  imports: [CommonModule, NgClass, HeadlineComponent, LargeTitleComponent],
  template: `
    <header class="tgui-section-header" [ngClass]="headerClasses">
      <ng-container *ngIf="large; else defaultHeader">
        <tgui-large-title>
          <ng-content></ng-content>
        </tgui-large-title>
      </ng-container>
      <ng-template #defaultHeader>
        <tgui-headline>
          <ng-content></ng-content>
        </tgui-headline>
      </ng-template>
    </header>
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

    .tgui-section-header--ios {
      padding: 16px 16px 8px 16px;
      color: var(--tgui--section_header_text_color);
    }

    .tgui-section-header--ios.tgui-section-header--large {
      padding: 0 0 12px;
      color: var(--tgui--text_color);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SectionHeaderComponent {
  /** Увеличенный заголовок, изменяет размер шрифта, отступы и цвет */
  @Input() large = false;

  private platformService = inject(PlatformService);

  get isPlatformIOS(): boolean {
    return this.platformService.isIOS();
  }

  get headerClasses(): Record<string, boolean> {
    return {
      'tgui-section-header--ios': this.isPlatformIOS,
      'tgui-section-header--large': this.large
    };
  }
} 