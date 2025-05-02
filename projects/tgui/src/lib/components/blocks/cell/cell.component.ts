import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  inject,
  AfterContentInit,
  ContentChildren,
  QueryList,
  OnInit,
  Type,
  ComponentRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { TappableComponent } from '../../utils/tappable/tappable.component';
import { SubheadlineComponent } from '../../typography/subheadline/subheadline.component';
import { TitleComponent } from '../../typography/title/title.component';
import { TextComponent } from '../../typography/text/text.component';
import { CaptionComponent } from '../../typography/caption/caption.component';
import { PlatformService } from '../../../services/platform.service';
import { ContentSlotDirective } from '../../../directives/content-slot.directive';
import { TypographyCellService } from './services/typography-cell.service';

/**
 * `Cell` component acts as a flexible and interactive container for various types of content,
 * enabling the creation of complex list items, form fields, and more. It leverages the `Tappable`
 * component for interaction and is designed to be flexible and extensible.
 * 
 * ## Usage
 * 
 * ```html
 * <!-- Using content slots -->
 * <tgui-cell>
 *   <div content-slot="before">Before content</div>
 *   <div content-slot="subhead">Subhead text</div>
 *   <div content-slot="title">Title text</div>
 *   <div content-slot="hint">Hint text</div>
 *   <div content-slot="subtitle">Subtitle text</div>
 *   <div content-slot="description">Description text</div>
 *   <div content-slot="after">After content</div>
 *   <div content-slot="title-badge">Badge content</div>
 * </tgui-cell>
 * 
 * <!-- Using input properties -->
 * <tgui-cell
 *   subhead="Subhead text"
 *   title="Title text"
 *   hint="Hint text"
 *   subtitle="Subtitle text"
 *   description="Description text">
 *   <div content-slot="before">Before content</div>
 *   <div content-slot="after">After content</div>
 *   <div content-slot="title-badge">Badge content</div>
 * </tgui-cell>
 * ```
 * 
 * ## Content Slots
 * 
 * The component accepts the following content slots:
 * 
 * - `before`: Optional content displayed on the left side of the cell
 * - `subhead`: Optional content displayed above the main title
 * - `title`: Main title/header content
 * - `hint`: Optional content displayed next to the title
 * - `title-badge`: Badge component displayed next to the title
 * - `subtitle`: Optional content displayed below the title
 * - `description`: Optional descriptive text below the subtitle
 * - `after`: Optional content displayed on the right side of the cell
 */
@Component({
  selector: 'tgui-cell',
  standalone: true,
  imports: [
    CommonModule, 
    TappableComponent, 
    SubheadlineComponent, 
    TitleComponent, 
    TextComponent, 
    CaptionComponent,
    ContentSlotDirective
  ],
  template: `
    <tgui-tappable
      [interactiveAnimation]="interactiveAnimation"
      [disabled]="disabled"
      [readonly]="readonly"
      [class.wrapper--hovered]="hovered"
      class="wrapper"
      [class.wrapper--multiline]="multiline"
      [class.wrapper--ios]="isIOS"
    >
      <div *ngIf="hasBeforeContent" class="before">
        <ng-content select="[content-slot=before]"></ng-content>
      </div>

      <div class="middle">
        <tgui-subheadline 
          *ngIf="hasSubheadContent || subhead" 
          level="2" 
          weight="3" 
          class="subhead"
        >
          <ng-container *ngIf="subhead; else subheadContent">{{ subhead }}</ng-container>
          <ng-template #subheadContent>
            <ng-content select="[content-slot=subhead]"></ng-content>
          </ng-template>
        </tgui-subheadline>

        <!-- Using platform-specific components based on typographyCellService -->
        <ng-container *ngIf="hasTitleContent || hasHintContent || hasTitleBadgeContent || title || hint">
          <!-- iOS: TextComponent -->
          <tgui-text *ngIf="isIOS" class="head">
            <span *ngIf="hasTitleContent || title" class="title">
              <ng-container *ngIf="title">{{ title }}</ng-container>
              <ng-content *ngIf="!title" select="[content-slot=title]"></ng-content>
            </span>
            <span *ngIf="hasHintContent || hint" class="hint">
              <ng-container *ngIf="hint">{{ hint }}</ng-container>
              <ng-content *ngIf="!hint" select="[content-slot=hint]"></ng-content>
            </span>
            <ng-content select="[content-slot=title-badge]"></ng-content>
          </tgui-text>

          <!-- Android/Web: SubheadlineComponent -->
          <tgui-subheadline *ngIf="!isIOS" level="1" class="head">
            <span *ngIf="hasTitleContent || title" class="title">
              <ng-container *ngIf="title">{{ title }}</ng-container>
              <ng-content *ngIf="!title" select="[content-slot=title]"></ng-content>
            </span>
            <span *ngIf="hasHintContent || hint" class="hint">
              <ng-container *ngIf="hint">{{ hint }}</ng-container>
              <ng-content *ngIf="!hint" select="[content-slot=hint]"></ng-content>
            </span>
            <ng-content select="[content-slot=title-badge]"></ng-content>
          </tgui-subheadline>
        </ng-container>

        <tgui-subheadline 
          *ngIf="hasSubtitleContent || subtitle" 
          level="2" 
          weight="3" 
          class="subtitle"
        >
          <ng-container *ngIf="subtitle; else subtitleContent">{{ subtitle }}</ng-container>
          <ng-template #subtitleContent>
            <ng-content select="[content-slot=subtitle]"></ng-content>
          </ng-template>
        </tgui-subheadline>

        <!-- Using platform-specific components for description based on typographyCellService -->
        <ng-container *ngIf="hasDescriptionContent || description">
          <!-- iOS: CaptionComponent -->
          <tgui-caption 
            *ngIf="isIOS" 
            class="description"
          >
            <ng-container *ngIf="description; else descriptionContent">{{ description }}</ng-container>
            <ng-template #descriptionContent>
              <ng-content select="[content-slot=description]"></ng-content>
            </ng-template>
          </tgui-caption>

          <!-- Android/Web: SubheadlineComponent -->
          <tgui-subheadline 
            *ngIf="!isIOS" 
            level="2" 
            class="description"
          >
            <ng-container *ngIf="description; else descriptionContentAndroid">{{ description }}</ng-container>
            <ng-template #descriptionContentAndroid>
              <ng-content select="[content-slot=description]"></ng-content>
            </ng-template>
          </tgui-subheadline>
        </ng-container>
      </div>

      <div *ngIf="hasAfterContent" class="after">
        <ng-content select="[content-slot=after]"></ng-content>
      </div>
    </tgui-tappable>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
    }

    .wrapper {
      --tgui--cell--middle--padding: 16px 0;

      display: flex;
      align-items: center;
      gap: 24px;
      padding: 0 24px;
    }

    .wrapper--ios {
      --tgui--cell--middle--padding: 12px 0;
      gap: 16px;
      padding: 0 16px;
    }

    .wrapper--hovered {
      background: var(--tgui--tertiary_bg_color);
    }

    .before, .after {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .middle {
      display: flex;
      flex-direction: column;
      gap: 2px;
      
      flex-grow: 1;
      max-inline-size: 100%;
      min-inline-size: 0;
      
      padding: var(--tgui--cell--middle--padding);
    }

    .middle > *,
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .wrapper:not(.wrapper--multiline) .middle > *,
    .wrapper:not(.wrapper--multiline) .title {
      white-space: nowrap;
    }

    .subhead {
      color: var(--tgui--subtitle_text_color);
    }

    .head {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .hint {
      color: var(--tgui--hint_color);
    }

    .subtitle {
      color: var(--tgui--hint_color);
    }

    .description {
      color: var(--tgui--hint_color);
    }

    @media (hover: hover) and (pointer: fine) {
      .wrapper:hover {
        background: var(--tgui--tertiary_bg_color);
      }
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent implements AfterContentInit {
  /** Controls the hover state of the component externally, useful for keyboard navigation */
  @Input() hovered = false;

  /** Allows for multiline content without truncation */
  @Input() @HostBinding('class.multiline') multiline = false;

  /** Interactive animation type */
  @Input() interactiveAnimation: 'opacity' | 'background' = 'background';

  /** Readonly state */
  @Input() readonly = false;

  /** Disabled state */
  @Input() disabled = false;

  /** Content displayed above the main content as a subheading */
  @Input() subhead?: string;

  /** Main content displayed as a header */
  @Input() title?: string;

  /** Content displayed alongside the header as a hint */
  @Input() hint?: string;

  /** Content displayed below the header as a subtitle */
  @Input() subtitle?: string;

  /** Additional description displayed below the subtitle */
  @Input() description?: string;

  /** Platform service injection */
  protected platformService = inject(PlatformService);

  /** Typography service for component selection */
  protected typographyCellService = inject(TypographyCellService);

  /** Query for content slot directives */
  @ContentChildren(ContentSlotDirective) contentSlots!: QueryList<ContentSlotDirective>;

  // Properties to track content presence
  private _hasBeforeContent = false;
  private _hasSubheadContent = false;
  private _hasTitleContent = false;
  private _hasHintContent = false;
  private _hasTitleBadgeContent = false;
  private _hasSubtitleContent = false;
  private _hasDescriptionContent = false;
  private _hasAfterContent = false;

  /** Is the platform iOS */
  get isIOS(): boolean {
    return this.platformService.isIOS();
  }

  /** Add iOS specific class */
  @HostBinding('class.ios')
  get isiOS(): boolean {
    return this.isIOS;
  }

  // Getters for content presence
  get hasBeforeContent(): boolean {
    return this._hasBeforeContent;
  }

  get hasSubheadContent(): boolean {
    return this._hasSubheadContent;
  }

  get hasTitleContent(): boolean {
    return this._hasTitleContent;
  }

  get hasHintContent(): boolean {
    return this._hasHintContent;
  }

  get hasTitleBadgeContent(): boolean {
    return this._hasTitleBadgeContent;
  }

  get hasSubtitleContent(): boolean {
    return this._hasSubtitleContent;
  }

  get hasDescriptionContent(): boolean {
    return this._hasDescriptionContent;
  }

  get hasAfterContent(): boolean {
    return this._hasAfterContent;
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
    this._hasSubheadContent = this.hasSlot('subhead');
    this._hasTitleContent = this.hasSlot('title');
    this._hasHintContent = this.hasSlot('hint');
    this._hasTitleBadgeContent = this.hasSlot('title-badge');
    this._hasSubtitleContent = this.hasSlot('subtitle');
    this._hasDescriptionContent = this.hasSlot('description');
    this._hasAfterContent = this.hasSlot('after');
  }

  /**
   * Check if a slot exists in the content
   */
  private hasSlot(slotName: string): boolean {
    return this.contentSlots.some(slot => slot.slotName === slotName);
  }
} 