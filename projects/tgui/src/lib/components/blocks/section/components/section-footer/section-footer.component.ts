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
// import { PlatformService } from '@services/platform.service';
import { CaptionComponent } from '@typography/caption/caption.component';
import { SubheadlineComponent } from '@typography/subheadline/subheadline.component';
import { PlatformService } from '@services/platform.service';
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
      <ng-container *ngIf="_isPlatformIOS; else baseFooter">
        <tgui-caption class="tgui-section-footer-text">
        <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
        </tgui-caption>
      </ng-container>
      <ng-template #baseFooter>
        <tgui-subheadline level="2" class="tgui-section-footer-text">
        <ng-container *ngTemplateOutlet="contentTpl"></ng-container>
        </tgui-subheadline>
      </ng-template>
    </footer>
    <ng-template #contentTpl>
      <ng-content></ng-content>
    </ng-template>
  `,
  styles: [`
    .tgui-section-footer {
      padding: 12px 24px;
    }

    .tgui-section-footer--centered {
      padding: 16px 24px 20px;
      text-align: center;
    }

    :host-context(.tgui-platform-ios) .tgui-section-footer--centered {
      padding: 16px 16px 0;
    }
    :host-context(.tgui-platform-ios) .tgui-section-footer {
      padding: 8px 16px 0;
    }
    :host-context(.tgui-platform-ios) .tgui-section-footer-text {
      color: var(--tgui--section_header_text_color);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionFooterComponent {
  /** Центрирование текста, добавление дополнительных отступов */
  @Input() centered = false;

  private platformService = inject(PlatformService);
  private platformSignal = this.platformService.platform;
  public _isPlatformIOS: boolean = false
  constructor() {
    effect(() => {
      const platform = this.platformSignal()
      this._isPlatformIOS = platform === 'ios';
    });
  }

  get footerClasses(): Record<string, boolean> {
    return {
      'tgui-section-footer--centered': this.centered
    };
  }
} 