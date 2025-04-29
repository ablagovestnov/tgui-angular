import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformService } from '@services/platform.service';
import { TappableComponent } from '@components/utils/tappable';
import { SubheadlineComponent } from '@components/typography/subheadline/subheadline.component';

/**
 * Renders a compact element representing an input, attribute, or action. 
 * Chips can include icons, text, or both, and are used to trigger actions, 
 * input information, or represent a complex piece of information in a compact form.
 */
@Component({
  selector: 'tgui-chip',
  standalone: true,
  imports: [CommonModule, TappableComponent, SubheadlineComponent],
  template: `
    <tgui-tappable 
      interactiveAnimation="background"
      [class]="'tgui-chip tgui-chip--' + mode" 
      [ngClass]="className">
      <div *ngIf="before" class="tgui-chip__before">
        <ng-container *ngTemplateOutlet="before"></ng-container>
      </div>
      <tgui-subheadline 
        class="tgui-chip__text"
        tag="span"
        [level]="platformService.isIOS() ? '2' : '1'"
        weight="2">
        <ng-content></ng-content>
      </tgui-subheadline>
      <div *ngIf="after" class="tgui-chip__after">
        <ng-container *ngTemplateOutlet="after"></ng-container>
      </div>
    </tgui-tappable>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    .tgui-chip {
      user-select: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-sizing: border-box;
      padding: 8px 12px;
      border-radius: 12px;
    }

    .tgui-chip--elevated {
      background: var(--tgui--surface_primary);
      box-shadow: 0 12px 24px 0 rgba(0, 0, 0, .05);
    }

    .tgui-chip--mono {
      background: var(--tgui--plain_background);
    }

    .tgui-chip--outline {
      border-radius: 12px;
      box-shadow: 0 0 0 1px var(--tgui--outline);
    }

    .tgui-chip__text {
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1 1 0;
      color: var(--tgui--plain_foreground);
    }

    .tgui-chip__before {
      margin-right: 2px;
    }

    .tgui-chip__after {
      display: flex;
      align-items: center;
      margin-top: 1.5px;
      color: var(--tgui--secondary_hint_color);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipComponent {
  /** Defines the visual style of the chip, affecting its background, border, and shadow. */
  @Input() mode: 'elevated' | 'mono' | 'outline' = 'elevated';
  
  /** Content or component to be placed before the main text, typically an icon or avatar. */
  @Input() before: any;
  
  /** Content or component to be placed after the main text, such as an icon indicating an action. */
  @Input() after: any;
  
  /** Custom class name */
  @Input() className: string = '';
  
  protected platformService = inject(PlatformService);
} 