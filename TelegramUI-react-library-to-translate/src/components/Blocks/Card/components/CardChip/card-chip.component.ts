import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Card Chip Component represents a label or chip that is positioned
 * usually in the top right corner of a card.
 */
@Component({
  selector: 'tgui-card-chip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tgui-card-chip">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .tgui-card-chip {
      position: absolute;
      top: 16px;
      right: 16px;
      padding: 10px 12px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 10px;
      font-size: var(--tgui--caption2--font_size, 12px);
      line-height: var(--tgui--caption2--line_height, 16px);
      font-weight: var(--tgui--font_weight--accent2, 600);
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardChipComponent {
  // In the future, properties for chip customization may be added here
} 