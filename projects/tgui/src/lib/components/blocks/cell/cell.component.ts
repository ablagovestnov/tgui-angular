import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding,
  inject,
  TemplateRef,
  input
} from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

import { TappableComponent } from '../../utils/tappable/tappable.component';
import { SubheadlineComponent } from '../../typography/subheadline/subheadline.component';
import { TitleComponent } from '../../typography/title/title.component';
import { TextComponent } from '../../typography/text/text.component';
import { CaptionComponent } from '../../typography/caption/caption.component';
import { PlatformService } from '../../../services/platform.service';
import { TypographyCellService } from './services/typography-cell.service';

/**
 * `Cell` component acts as a flexible and interactive container for various types of content,
 * enabling the creation of complex list items, form fields, and more. It leverages the `Tappable`
 * component for interaction and is designed to be flexible and extensible.
 * 
 * ## Usage
 * 
 * ```html
 * <!-- Using input properties and template references -->
 * <tgui-cell
 *   subhead="Subhead text"
 *   title="Title text"
 *   hint="Hint text"
 *   subtitle="Subtitle text"
 *   description="Description text"
 *   [titleBadge]="badgeTemplate"
 *   [beforeTemplate]="beforeTemplate"
 *   [afterTemplate]="afterTemplate">
 *   Main content
 * </tgui-cell>
 * 
 * <!-- Using with event propagation for form controls (combines semantic label with tappable effects) -->
 * <tgui-cell
 *   [propagateEvents]="true"
 *   description="Click anywhere to toggle - includes ripple effects!"
 *   [afterTemplate]="switchTemplate">
 *   Toggle option
 * </tgui-cell>
 * 
 * <ng-template #beforeTemplate>
 *   <tgui-avatar size="l"></tgui-avatar>
 * </ng-template>
 * 
 * <ng-template #afterTemplate>
 *   <tgui-badge type="number">99</tgui-badge>
 * </ng-template>
 * 
 * <ng-template #switchTemplate>
 *   <tgui-switch [checked]="true"></tgui-switch>
 * </ng-template>
 * 
 * <ng-template #badgeTemplate>
 *   <tgui-badge type="dot"></tgui-badge>
 * </ng-template>
 * ```
 * 
 * ## Template Inputs
 * 
 * The component accepts the following template inputs:
 * 
 * - `beforeTemplate`: Optional template displayed on the left side of the cell
 * - `afterTemplate`: Optional template displayed on the right side of the cell
 * - `titleBadge`: Badge template displayed next to the title
 * 
 * All other content should be provided via input properties:
 * - `subhead`: Optional content displayed above the main title
 * - `title`: Main title/header content
 * - `hint`: Optional content displayed next to the title
 * - `subtitle`: Optional content displayed below the title
 * - `description`: Optional descriptive text below the subtitle
 * - `propagateEvents`: When true, wraps content in semantic label for form control interaction
 */
@Component({
  selector: 'tgui-cell',
  standalone: true,
  imports: [
    CommonModule,
    NgTemplateOutlet,
    TappableComponent, 
    SubheadlineComponent, 
    TitleComponent, 
    TextComponent, 
    CaptionComponent
  ],
  template: `
    <!-- Conditional rendering based on propagateEvents -->
    <ng-container *ngIf="propagateEvents(); else tappableTemplate">
      <label class="label-container">
        <tgui-tappable
          [interactiveAnimation]="interactiveAnimation()"
          [disabled]="disabled()"
          [readonly]="readonly()"
          [class.wrapper--hovered]="hovered()"
          class="wrapper"
          [class.wrapper--multiline]="multiline()"
          [class.wrapper--ios]="isIOS"
        >
          <ng-container *ngTemplateOutlet="cellContent"></ng-container>
        </tgui-tappable>
      </label>
    </ng-container>

    <ng-template #tappableTemplate>
      <tgui-tappable
        [interactiveAnimation]="interactiveAnimation()"
        [disabled]="disabled()"
        [readonly]="readonly()"
        [class.wrapper--hovered]="hovered()"
        class="wrapper"
        [class.wrapper--multiline]="multiline()"
        [class.wrapper--ios]="isIOS"
      >
        <ng-container *ngTemplateOutlet="cellContent"></ng-container>
      </tgui-tappable>
    </ng-template>

    <!-- Shared cell content template -->
    <ng-template #cellContent>
      <div *ngIf="beforeTemplate()" class="before">
        <ng-container *ngTemplateOutlet="beforeTemplate()"></ng-container>
      </div>

      <div class="middle">
        <ng-content></ng-content>
        <tgui-subheadline 
          *ngIf="subhead()" 
          level="2" 
          weight="3" 
          class="subhead"
        >
          {{ subhead() }}
        </tgui-subheadline>

        <ng-container *ngIf="title() || hint() || titleBadge()">
          <!-- iOS: TextComponent -->
          <tgui-text *ngIf="isIOS" class="head">
            <span *ngIf="title()" class="title">
              {{ title() }}
            </span>
            <span *ngIf="hint()" class="hint">
              {{ hint() }}
            </span>
            <ng-container *ngIf="titleBadge()">
              <ng-container *ngTemplateOutlet="titleBadge()"></ng-container>
            </ng-container>
          </tgui-text>

          <!-- Android/Web: SubheadlineComponent -->
          <tgui-subheadline *ngIf="!isIOS" level="1" class="head">
            <span *ngIf="title()" class="title">
              {{ title() }}
            </span>
            <span *ngIf="hint()" class="hint">
              {{ hint() }}
            </span>
            <ng-container *ngIf="titleBadge()">
              <ng-container *ngTemplateOutlet="titleBadge()"></ng-container>
            </ng-container>
          </tgui-subheadline>
        </ng-container>

        <tgui-subheadline 
          *ngIf="subtitle()" 
          level="2" 
          weight="3" 
          class="subtitle"
        >
          {{ subtitle() }}
        </tgui-subheadline>

        <ng-container *ngIf="description()">
          <!-- iOS: CaptionComponent -->
          <tgui-caption 
            *ngIf="isIOS" 
            class="description"
          >
            {{ description() }}
          </tgui-caption>

          <!-- Android/Web: SubheadlineComponent -->
          <tgui-subheadline 
            *ngIf="!isIOS" 
            level="2" 
            class="description"
          >
            {{ description() }}
          </tgui-subheadline>
        </ng-container>
      </div>

      <div *ngIf="afterTemplate()" class="after">
        <ng-container *ngTemplateOutlet="afterTemplate()"></ng-container>
      </div>
    </ng-template>
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

    /* Label container styles */
    .label-container {
      display: block;
      cursor: pointer;
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
export class CellComponent {
  /** Controls the hover state of the component externally, useful for keyboard navigation */
  hovered = input<boolean>(false);

  /** Allows for multiline content without truncation */
  multiline = input<boolean>(false);

  /** Interactive animation type */
  interactiveAnimation = input<'opacity' | 'background'>('background');

  /** Readonly state */
  readonly = input<boolean>(false);

  /** Disabled state */
  disabled = input<boolean>(false);

  /** When true, wraps content in semantic label for form control interaction */
  propagateEvents = input<boolean>(false);

  /** Content displayed above the main content as a subheading */
  subhead = input<string | undefined>(undefined);

  /** Main content displayed as a header */
  title = input<string | undefined>(undefined);

  /** Content displayed alongside the header as a hint */
  hint = input<string | undefined>(undefined);

  /** Content displayed below the header as a subtitle */
  subtitle = input<string | undefined>(undefined);

  /** Additional description displayed below the subtitle */
  description = input<string | undefined>(undefined);

  /** Badge component to be displayed next to the title */
  titleBadge = input<TemplateRef<any> | null>(null);

  /** Template displayed on the left side of the cell */
  beforeTemplate = input<TemplateRef<any> | null>(null);

  /** Template displayed on the right side of the cell */
  afterTemplate = input<TemplateRef<any> | null>(null);

  /** Platform service injection */
  protected platformService = inject(PlatformService);

  /** Typography service for component selection */
  protected typographyCellService = inject(TypographyCellService);

  /** Is the platform iOS */
  get isIOS(): boolean {
    return this.platformService.isIOS();
  }

  /** Add iOS specific class */
  @HostBinding('class.ios')
  get isiOS(): boolean {
    return this.isIOS;
  }
} 