import { Component, ChangeDetectionStrategy, ViewEncapsulation, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Represents a horizontal line used to separate content within a layout or component.
 * The component allows customization through custom CSS classes.
 */
@Component({
  selector: 'tgui-divider',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `<hr class="tgui-divider">`,
  styles: [`
    .tgui-divider {
      margin: 0;
      border-top: none;
      border-width: var(--tgui--border--width, 1px);
      border-color: var(--tgui--outline);
      width: 100%;
    }
  `]
})
export class DividerComponent {} 