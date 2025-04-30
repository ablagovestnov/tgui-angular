import { 
  Component, 
  ChangeDetectionStrategy, 
  Input, 
  HostBinding,
  ViewEncapsulation,
  inject,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TappableComponent } from '@components/utils';
import { CaptionComponent } from '@components/typography/caption/caption.component';

/**
 * `InlineButtonsItem` is designed for use within an InlineButtons container but can also serve 
 * as a standalone button if used by itself. It supports displaying optional text and can inherit 
 * a styling mode from its parent InlineButtons context or utilize a locally defined mode.
 */
@Component({
  selector: 'tgui-inline-buttons-item',
  standalone: true,
  imports: [CommonModule, TappableComponent, CaptionComponent],
  template: `
    <tgui-tappable 
      [interactiveAnimation]="interactiveAnimation" 
      [disabled]="disabled"
      class="inline-button-tappable"
    >
        <ng-content></ng-content>
        <tgui-caption *ngIf="text" class="text" level="1" weight="2">{{ text }}</tgui-caption>

    </tgui-tappable>
  `,
  styles: [`
    :host {
      border-radius: 12px;
      background: transparent;
      color: var(--tgui--link_color);
    }
    
    :host.mode-bezeled {
      background: var(--tgui--secondary_fill);
    }

    :host.mode-gray {
      color: var(--tgui--plain_foreground);
      background: var(--tgui--plain_background);
    }
    
    :host-context(.mode-bezeled):not(.mode-bezeled):not(.mode-gray) {
      background: var(--tgui--secondary_fill);
    }

    :host-context(.mode-gray):not(.mode-bezeled):not(.mode-gray) {
      color: var(--tgui--plain_foreground);
      background: var(--tgui--plain_background);
    }
    
    .inline-button-tappable {
      flex: 1 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 3px;
      min-height: 60px;
      min-width: 64px;
      padding: 0 12px;
      max-inline-size: 100%;
      border: none;
      border-radius: 12px;
      box-sizing: border-box;
      user-select: none;
    } 

    :host-context(.tgui-platform-ios) {
      min-height: 64px;
      min-width: 72px;
      gap: 4px;
    }

    .text {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-inline-size: inherit;
    } 
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineButtonsItemComponent {
  /** Text displayed inside the button. */
  @Input() text?: string;
  
  /** Optional mode for styling the button, with 'plain' as the default. */
  @Input() mode:  'bezeled' | 'plain' | 'gray' = 'plain';
  
  /** Disables the button */
  @Input() disabled = false;
  
  /** Type of interactive animation */
  @Input() interactiveAnimation: 'opacity' | 'background' = 'background';
  

  @HostBinding('class.mode-bezeled') get isModeBezeled() { return this.mode === 'bezeled'; }
  @HostBinding('class.mode-plain') get isModePlain() { return this.mode === 'plain'; }
  @HostBinding('class.mode-gray') get isModeGray() { return this.mode === 'gray'; }

} 