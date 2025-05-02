import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  EventEmitter,
  inject,
  input,
  Output,
  ElementRef,
  AfterContentInit,
  ContentChildren,
  QueryList
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../../services/platform.service';
import { TappableComponent } from '../../utils/tappable/tappable.component';
import { SubheadlineComponent } from '../../typography/subheadline/subheadline.component';
import { TextComponent } from '../../typography/text/text.component';
import { CaptionComponent } from '../../typography/caption/caption.component';
import { TguiDynamicIconComponent } from '../../../icons/dynamic-icon.component';
import { ContentSlotDirective } from '../../../directives/content-slot.directive';

/**
 * The `Banner` component renders a prominent graphical element, typically displayed at the top of a page or section, 
 * designed to grab the user's attention and convey important information. 
 * It is a versatile tool used for various purposes such as branding, promotion, announcements, or navigation.
 * 
 * ## Usage
 * 
 * ```html
 * <tgui-banner type="inline" (onCloseIcon)="onCloseIcon($event)">
 *   <div content-slot="before" class="..."><tgui-icon24-qr></tgui-icon24-qr></div>
 *   <div content-slot="callout">Urgent notification</div>
 *   <div content-slot="header">Introducing TON Space</div>
 *   <div content-slot="description">Start exploring TON in a new, better way</div>
 *   <div content-slot="buttons">
 *     <tgui-button size="s">Try it out</tgui-button>
 *     <tgui-button size="s" mode="plain">Maybe later</tgui-button>
 *   </div>
 * </tgui-banner>
 * ```
 * 
 * ## Content Slots
 * 
 * The component accepts the following content slots:
 * 
 * - `before`: Optional content displayed at the start of the banner, useful for icons
 * - `callout`: Optional callout text displayed above the header
 * - `header`: Main header/title of the banner
 * - `subheader`: Optional text displayed below the header
 * - `description`: Optional descriptive text
 * - `background`: Optional background content
 * - `buttons`: Optional action buttons
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
    TguiDynamicIconComponent,
    ContentSlotDirective
  ],
  template: `
    <section 
      class="wrapper"
      [class.wrapper--ios]="platformService.isIOS()"
      [class.wrapper--base]="!platformService.isIOS()"
      [class.wrapper--withBackground]="hasBackgroundContent"
      [class.wrapper--inline]="type() === 'inline'"
    >
      <div *ngIf="hasBackgroundContent" class="background">
        <ng-content select="[content-slot=background]"></ng-content>
      </div>

      <ng-content select="[content-slot=before]"></ng-content>

      <div class="middle">
        <tgui-subheadline *ngIf="hasCalloutContent" class="subheader" level="2">
          <ng-content select="[content-slot=callout]"></ng-content>
        </tgui-subheadline>

        <tgui-text *ngIf="hasHeaderContent" class="title" weight="2">
          <ng-content select="[content-slot=header]"></ng-content>
        </tgui-text>

        <tgui-subheadline *ngIf="hasSubheaderContent" class="subheader" level="2">
          <ng-content select="[content-slot=subheader]"></ng-content>
        </tgui-subheadline>

        <ng-container *ngIf="hasDescriptionContent">
          <ng-container *ngIf="platformService.isIOS(); else baseDescription">
            <tgui-caption class="description" level="1">
              <ng-content select="[content-slot=description]"></ng-content>
            </tgui-caption>
          </ng-container>
          <ng-template #baseDescription>
            <tgui-subheadline class="description" level="2">
              <ng-content select="[content-slot=description]"></ng-content>
            </tgui-subheadline>
          </ng-template>
        </ng-container>

        <div *ngIf="hasButtonsContent" class="buttons">
          <ng-content select="[content-slot=buttons]"></ng-content>
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
export class BannerComponent implements AfterContentInit {
  // Event emitter for close icon clicks
  @Output() onCloseIcon = new EventEmitter<MouseEvent>();

  // Service injections
  protected platformService = inject(PlatformService);
  private elementRef = inject(ElementRef);
  
  // Query for content slot directives
  @ContentChildren(ContentSlotDirective) contentSlots!: QueryList<ContentSlotDirective>;
  
  /** Specifies the banner's layout style, which can affect its positioning and styling. */
  public type = input<'section' | 'inline'>('section');
  
  /** The close icon to use. Can be overridden by input */
  public closeIcon = input<string | undefined>(undefined);

  public isIOS = this.platformService.isIOS();

  // Properties to track content presence
  private _hasBeforeContent = false;
  private _hasCalloutContent = false;
  private _hasHeaderContent = false;
  private _hasSubheaderContent = false;
  private _hasDescriptionContent = false;
  private _hasBackgroundContent = false;
  private _hasButtonsContent = false;

  // Getters for content presence
  get hasBeforeContent(): boolean {
    return this._hasBeforeContent;
  }

  get hasCalloutContent(): boolean {
    return this._hasCalloutContent;
  }

  get hasHeaderContent(): boolean {
    return this._hasHeaderContent;
  }

  get hasSubheaderContent(): boolean {
    return this._hasSubheaderContent;
  }

  get hasDescriptionContent(): boolean {
    return this._hasDescriptionContent;
  }

  get hasBackgroundContent(): boolean {
    return this._hasBackgroundContent;
  }

  get hasButtonsContent(): boolean {
    return this._hasButtonsContent;
  }

  // Check for content after view initialization
  ngAfterContentInit(): void {
    this.updateContentFlags();
    
    // Listen for changes to content slots
    this.contentSlots.changes.subscribe(() => {
      this.updateContentFlags();
    });
  }
  
  /**
   * Updates content flags based on available slots
   */
  private updateContentFlags(): void {
    this._hasBeforeContent = this.hasSlot('before');
    this._hasCalloutContent = this.hasSlot('callout');
    this._hasHeaderContent = this.hasSlot('header');
    this._hasSubheaderContent = this.hasSlot('subheader');
    this._hasDescriptionContent = this.hasSlot('description');
    this._hasBackgroundContent = this.hasSlot('background');
    this._hasButtonsContent = this.hasSlot('buttons');
  }

  /**
   * Check if a slot exists in the content
   */
  private hasSlot(slotName: string): boolean {
    return this.contentSlots.some(slot => slot.slotName === slotName);
  }

  /**
   * Determines which close icon to use based on platform and background
   */
  getCloseIconName(): string {
    // If user provided a specific icon, use that
    if (this.closeIcon()) {
      return this.closeIcon()!;
    }
    
    // Otherwise select icon based on platform and background
    if (this.hasBackgroundContent) {
      return 'tgui-icon28-close-ambient';
    }
    
    return this.platformService.isIOS() ? 'tgui-icon24-cancel' : 'tgui-icon28-close';
  }
} 