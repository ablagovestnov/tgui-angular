import { 
  Component, 
  ChangeDetectionStrategy, 
  Input,
  HostBinding,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * `InlineButtons` acts as a container for `InlineButtonsItem` components.
 * This component provides a unified context for styling and interaction,
 * leveraging the `mode` to apply consistent styling across all child components.
 * It ensures visual consistency across different platforms and supports custom styling modes.
 */
@Component({
  selector: 'tgui-inline-buttons',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        display: flex;
        gap: 12px;
      }

      :host-context(.tgui-platform-ios) {
        gap: 8px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'attr.data-refresh-platform': 'true'
  }
})
export class InlineButtonsComponent {
  /** Dictates the styling mode for the inline buttons, affecting color and background. */
  @Input() mode:  'bezeled' | 'plain' | 'gray' = 'plain';

  @HostBinding('class.mode-bezeled') get isModeBezeled() { return this.mode === 'bezeled'; }
  @HostBinding('class.mode-plain') get isModePlain() { return this.mode === 'plain'; }
  @HostBinding('class.mode-gray') get isModeGray() { return this.mode === 'gray'; }

} 