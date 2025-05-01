import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  ContentChild,
  ElementRef,
  EventEmitter,
  inject,
  input,
  Output,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../../services/platform.service';
import { TappableComponent } from '../../utils/tappable/tappable.component';
import { SubheadlineComponent } from '../../typography/subheadline/subheadline.component';
import { TextComponent } from '../../typography/text/text.component';
import { CaptionComponent } from '../../typography/caption/caption.component';
import { TguiIcon24Cancel } from '../../../icons/icon24/tgui-icon24-cancel';
import { TguiIcon28Close } from '../../../icons/icon28/tgui-icon28-close';
import { TguiIcon28CloseAmbient } from '../../../icons/icon28/tgui-icon28-close-ambient';

/**
 * The `Banner` component renders a prominent graphical element, typically displayed at the top of a page or section, 
 * designed to grab the user's attention and convey important information. 
 * It is a versatile tool used for various purposes such as branding, promotion, announcements, or navigation.
 */
@Component({
  selector: 'tgui-banner',
  standalone: true,
  imports: [
    CommonModule,
    TappableComponent,
    SubheadlineComponent,
    TextComponent,
    CaptionComponent,
    TguiIcon24Cancel,
    TguiIcon28Close,
    TguiIcon28CloseAmbient
  ],
  template: `
    <section 
      class="wrapper"
      [class.wrapper--ios]="platformService.isIOS()"
      [class.wrapper--base]="!platformService.isIOS()"
      [class.wrapper--withBackground]="backgroundTemplate"
      [class.wrapper--inline]="type() === 'inline'"
    >
      <div *ngIf="backgroundTemplate" class="background">
        <ng-container *ngTemplateOutlet="backgroundTemplate"></ng-container>
      </div>

      <ng-container *ngIf="beforeTemplate">
        <ng-container *ngTemplateOutlet="beforeTemplate"></ng-container>
      </ng-container>

      <div class="middle">
        <ng-container *ngIf="calloutTemplate">
          <tgui-subheadline class="subheader" level="2">
            <ng-container *ngTemplateOutlet="calloutTemplate"></ng-container>
          </tgui-subheadline>
        </ng-container>

        <ng-container *ngIf="headerTemplate">
          <tgui-text class="title" weight="2">
            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
          </tgui-text>
        </ng-container>

        <ng-container *ngIf="subheaderTemplate">
          <tgui-subheadline class="subheader" level="2">
            <ng-container *ngTemplateOutlet="subheaderTemplate"></ng-container>
          </tgui-subheadline>
        </ng-container>

        <ng-container *ngIf="descriptionTemplate">
          <ng-container *ngIf="platformService.isIOS(); else baseDescription">
            <tgui-caption class="description" level="1">
              <ng-container *ngTemplateOutlet="descriptionTemplate"></ng-container>
            </tgui-caption>
          </ng-container>
          <ng-template #baseDescription>
            <tgui-subheadline class="description" level="2">
              <ng-container *ngTemplateOutlet="descriptionTemplate"></ng-container>
            </tgui-subheadline>
          </ng-template>
        </ng-container>

        <ng-container *ngIf="buttonsTemplate">
          <div class="buttons">
            <ng-container *ngTemplateOutlet="buttonsTemplate"></ng-container>
          </div>
        </ng-container>
      </div>

      <tgui-tappable *ngIf="onCloseIcon.observers?.length" 
        (click)="onCloseIcon.emit($event)" 
        class="close"
      >
        <ng-container *ngIf="!backgroundTemplate">
          <tgui-icon24-cancel *ngIf="platformService.isIOS()"></tgui-icon24-cancel>
          <tgui-icon28-close *ngIf="!platformService.isIOS()"></tgui-icon28-close>
        </ng-container>
        <tgui-icon28-close-ambient *ngIf="backgroundTemplate"></tgui-icon28-close-ambient>
      </tgui-tappable>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .wrapper {
      overflow: hidden;
      position: relative;
      display: flex;
      gap: 20px;
      padding: 16px 20px;
      background: var(--tgui--bg_color);
    }

    .wrapper--base:not(.wrapper--withBackground) {
      box-shadow: var(--tgui--base--section--box_shadow);
    }

    .wrapper--ios {
      border-radius: 16px;
    }

    .wrapper--withBackground {
      padding: 20px;
    }

    .wrapper--withBackground .title {
      color: var(--tgui--white);
    }

    .wrapper--withBackground .subheader {
      opacity: .8;
      color: var(--tgui--white);
    }

    .wrapper--inline {
      background: var(--tgui--bg_color);
    }

    .wrapper--base.wrapper--inline {
      margin: 8px 20px;
      border-radius: 16px;
      border: 1px solid var(--tgui--outline);
      box-shadow: none;
    }

    .wrapper--ios.wrapper--inline {
      margin: 8px 16px;
      background: var(--tgui--quartenary_bg_color);
    }

    .background {
      position: absolute;
      inset: 0;
    }

    .middle {
      flex: 1 1 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
      z-index: var(--tgui--z-index--simple);
    }

    .subheader {
      color: var(--tgui--subtitle_text_color);
    }

    .description {
      color: var(--tgui--hint_color);
    }

    .buttons {
      display: flex;
      gap: 4px;
      margin-top: 10px;
    }

    .close {
      height: 28px;
      border-radius: 50%;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerComponent {
  // Event emitter for close icon clicks
  @Output() onCloseIcon = new EventEmitter<MouseEvent>();

  // Service injections
  protected platformService = inject(PlatformService);
    /** Specifies the banner's layout style, which can affect its positioning and styling. */
  public type = input<'section' | 'inline'>('section');

  public isIOS = this.platformService.isIOS();

  @ContentChild('before') beforeTemplate?: TemplateRef<any>;
  @ContentChild('callout') calloutTemplate?: TemplateRef<any>;
  @ContentChild('header') headerTemplate?: TemplateRef<any>;
  @ContentChild('subheader') subheaderTemplate?: TemplateRef<any>;
  @ContentChild('description') descriptionTemplate?: TemplateRef<any>;
  @ContentChild('background') backgroundTemplate?: TemplateRef<any>;
  @ContentChild('buttons') buttonsTemplate?: TemplateRef<any>;

} 