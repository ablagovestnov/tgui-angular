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
import { CaptionComponent } from '@typography/caption/caption.component';
import { SubheadlineComponent } from '@typography/subheadline/subheadline.component';

/**
 * Компонент SectionFooter представляет футер для компонента Section.
 * Поддерживает режим centered для центрированного текста.
 */
@Component({
  selector: 'tgui-section-footer',
  standalone: true,
  imports: [CommonModule, NgClass, CaptionComponent, SubheadlineComponent],
  template: `
    <footer class="tgui-section-footer" [ngClass]="footerClasses">
      <ng-container *ngIf="isPlatformIOS; else baseFooter">
        <tgui-caption class="tgui-section-footer-text">
          <ng-content></ng-content>
        </tgui-caption>
      </ng-container>
      <ng-template #baseFooter>
        <tgui-subheadline level="2" class="tgui-section-footer-text">
          <ng-content></ng-content>
        </tgui-subheadline>
      </ng-template>
    </footer>
  `,
  styles: [`
    .tgui-section-footer {
      padding: 12px 24px;
    }

    .tgui-section-footer--ios {
      padding: 8px 16px 0;
    }

    .tgui-section-footer--centered {
      padding: 16px 24px 20px;
      text-align: center;
    }

    .tgui-section-footer--ios.tgui-section-footer--centered {
      padding: 16px 16px 0;
    }

    .tgui-section-footer-text {
      color: var(--tgui--section_header_text_color);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SectionFooterComponent {
  /** Центрирование текста, добавление дополнительных отступов */
  @Input() centered = false;

  private platformService = inject(PlatformService);

  get isPlatformIOS(): boolean {
    return this.platformService.isIOS();
  }

  get footerClasses(): Record<string, boolean> {
    return {
      'tgui-section-footer--ios': this.isPlatformIOS,
      'tgui-section-footer--centered': this.centered
    };
  }
} 