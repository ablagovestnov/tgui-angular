import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  EventEmitter,
  inject,
  input,
  Output,
  ElementRef,
  TemplateRef
} from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { PlatformService } from '../../../services/platform.service';
import { TappableComponent } from '../../utils/tappable/tappable.component';
import { SubheadlineComponent } from '../../typography/subheadline/subheadline.component';
import { TextComponent } from '../../typography/text/text.component';
import { CaptionComponent } from '../../typography/caption/caption.component';
import { TguiDynamicIconComponent } from '../../../icons/dynamic-icon.component';

/**
 * The `Banner` component renders a prominent graphical element, typically displayed at the top of a page or section, 
 * designed to grab the user's attention and convey important information. 
 * It is a versatile tool used for various purposes such as branding, promotion, announcements, or navigation.
 * 
 * ## Usage
 * 
 * ```html
 * <tgui-banner 
 *   type="inline" 
 *   (onCloseIcon)="onCloseIcon($event)"
 *   [beforeTemplate]="beforeTemplate"
 *   [calloutTemplate]="calloutTemplate"
 *   [headerTemplate]="headerTemplate"
 *   [descriptionTemplate]="descriptionTemplate"
 *   [buttonsTemplate]="buttonsTemplate"
 *   [backgroundTemplate]="backgroundTemplate">
 * </tgui-banner>
 * 
 * <ng-template #beforeTemplate>
 *   <tgui-icon24-qr></tgui-icon24-qr>
 * </ng-template>
 * 
 * <ng-template #calloutTemplate>
 *   Urgent notification
 * </ng-template>
 * 
 * <ng-template #headerTemplate>
 *   Introducing TON Space
 * </ng-template>
 * 
 * <ng-template #descriptionTemplate>
 *   Start exploring TON in a new, better way
 * </ng-template>
 * 
 * <ng-template #buttonsTemplate>
 *   <tgui-button size="s">Try it out</tgui-button>
 *   <tgui-button size="s" mode="plain">Maybe later</tgui-button>
 * </ng-template>
 * ```
 * 
 * ## Template Inputs
 * 
 * The component accepts the following template inputs:
 * 
 * - `beforeTemplate`: Optional template displayed at the start of the banner, useful for icons
 * - `calloutTemplate`: Optional template for callout text displayed above the header
 * - `headerTemplate`: Template for main header/title of the banner
 * - `subheaderTemplate`: Optional template for text displayed below the header
 * - `descriptionTemplate`: Optional template for descriptive text
 * - `backgroundTemplate`: Optional template for background content
 * - `buttonsTemplate`: Optional template for action buttons
 */
@Component({
  selector: 'tgui-banner',
  standalone: true,
  imports: [
    CommonModule,
    NgTemplateOutlet,
    TappableComponent,
    SubheadlineComponent,
    TextComponent,
    CaptionComponent,
    TguiDynamicIconComponent
  ],
  template: `
    <section 
      class="wrapper"
      [class.wrapper--ios]="platformService.isIOS()"
      [class.wrapper--base]="!platformService.isIOS()"
      [class.wrapper--withBackground]="backgroundTemplate()"
      [class.wrapper--inline]="type() === 'inline'"
    >
      <div *ngIf="backgroundTemplate()" class="background">
        <ng-container *ngTemplateOutlet="backgroundTemplate()"></ng-container>
      </div>

      <ng-container *ngIf="beforeTemplate()">
        <ng-container *ngTemplateOutlet="beforeTemplate()"></ng-container>
      </ng-container>

      <div class="middle">
        <tgui-subheadline *ngIf="calloutTemplate()" class="subheader" level="2">
          <ng-container *ngTemplateOutlet="calloutTemplate()"></ng-container>
        </tgui-subheadline>

        <tgui-text *ngIf="headerTemplate()" class="title" weight="2">
          <ng-container *ngTemplateOutlet="headerTemplate()"></ng-container>
        </tgui-text>

        <tgui-subheadline *ngIf="subheaderTemplate()" class="subheader" level="2">
          <ng-container *ngTemplateOutlet="subheaderTemplate()"></ng-container>
        </tgui-subheadline>

        <ng-container *ngIf="descriptionTemplate()">
          <ng-container *ngIf="platformService.isIOS(); else baseDescription">
            <tgui-caption class="description" level="1">
              <ng-container *ngTemplateOutlet="descriptionTemplate()"></ng-container>
            </tgui-caption>
          </ng-container>
          <ng-template #baseDescription>
            <tgui-subheadline class="description" level="2">
              <ng-container *ngTemplateOutlet="descriptionTemplate()"></ng-container>
            </tgui-subheadline>
          </ng-template>
        </ng-container>

        <div *ngIf="buttonsTemplate()" class="buttons">
          <ng-container *ngTemplateOutlet="buttonsTemplate()"></ng-container>
        </div>
      </div>

      <tgui-tappable *ngIf="onCloseIcon.observers?.length" 
        (click)="onCloseIcon.emit($event)" 
        class="close"
      >
        <tgui-dynamic-icon [icon]="getCloseIconName()"></tgui-dynamic-icon>
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
  private elementRef = inject(ElementRef);
  
  /** Specifies the banner's layout style, which can affect its positioning and styling. */
  public type = input<'section' | 'inline'>('section');
  
  /** The close icon to use. Can be overridden by input */
  public closeIcon = input<string | undefined>(undefined);

  /** Template displayed at the start of the banner, useful for icons */
  public beforeTemplate = input<TemplateRef<any> | null>(null);

  /** Template for callout text displayed above the header */
  public calloutTemplate = input<TemplateRef<any> | null>(null);

  /** Template for main header/title of the banner */
  public headerTemplate = input<TemplateRef<any> | null>(null);

  /** Template for text displayed below the header */
  public subheaderTemplate = input<TemplateRef<any> | null>(null);

  /** Template for descriptive text */
  public descriptionTemplate = input<TemplateRef<any> | null>(null);

  /** Template for background content */
  public backgroundTemplate = input<TemplateRef<any> | null>(null);

  /** Template for action buttons */
  public buttonsTemplate = input<TemplateRef<any> | null>(null);

  public isIOS = this.platformService.isIOS();

  /**
   * Determines which close icon to use based on platform and background
   */
  getCloseIconName(): string {
    // If user provided a specific icon, use that
    if (this.closeIcon()) {
      return this.closeIcon()!;
    }
    
    // Otherwise select icon based on platform and background
    if (this.backgroundTemplate()) {
      return 'tgui-icon28-close-ambient';
    }
    
    return this.platformService.isIOS() ? 'tgui-icon24-cancel' : 'tgui-icon28-close';
  }
} 