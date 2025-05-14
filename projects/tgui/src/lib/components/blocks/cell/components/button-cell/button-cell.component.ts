import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  HostBinding,
  ElementRef,
  inject,
  ContentChild,
  TemplateRef,
  computed,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TappableComponent } from '../../../../utils/tappable/tappable.component';
import { SubheadlineComponent } from '../../../../typography/subheadline/subheadline.component';
import { TextComponent } from '../../../../typography/text/text.component';
import { PlatformService } from '../../../../../services/platform.service';
import { ContentSlotDirective } from '../../../../../directives/content-slot.directive';

/**
 * Renders an interactive cell component with optional leading and trailing elements.
 * Designed to be flexible, supporting various content structures and interaction models within UI designs.
 */
@Component({
  selector: 'tgui-button-cell',
  standalone: true,
  imports: [
    CommonModule,
    TappableComponent,
    SubheadlineComponent,
    TextComponent,
    ContentSlotDirective
  ],
  template: `
    <tgui-tappable
      [disabled]="disabled()"
      [interactiveAnimation]="'background'"
      class="wrapper"
    >
      <ng-content select="[content-slot='before']"></ng-content>

      <ng-container *ngIf="platformService.isIOS(); else androidContent">
        <tgui-text>
          <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
        </tgui-text>
      </ng-container>
      <ng-template #androidContent>
        <tgui-subheadline>
          <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
        </tgui-subheadline>
      </ng-template>

      <ng-content select="[content-slot='after']"></ng-content>
    </tgui-tappable>

    <!-- Template for main content -->
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
    }

    :host.button-cell-destructive {
        color: var(--tgui--destructive_text_color);
    }

    :host-context(.tgui-platform-ios) {
      --tgui--ripple-color: rgba(0, 0, 0, 0.2);
    }

    .wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      

        gap: 24px;
        height: 48px;
        padding: 10px 24px;
        box-sizing: border-box;

        color: var(--tgui--link_color);
        border: none;
        background: transparent;
    }

    :host-context(.tgui-platform-ios) .wrapper {
        gap: 18px;
  height: 44px;
  padding: 8px 18px;
    }

    .before, .after {
      display: flex;
      align-items: center;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonCellComponent {
  /** Determines the button cell's visual theme, influencing color and style. */
  mode = input<'default' | 'destructive'>('default');
  
  /** Disables button interaction */
  disabled = input<boolean>(false);

  /** Inject the platform service */
  protected platformService = inject(PlatformService);

  /** Apply destructive mode class */
  @HostBinding('class.button-cell-destructive')
  get isDestructive(): boolean {
    return this.mode() === 'destructive';
  }
} 