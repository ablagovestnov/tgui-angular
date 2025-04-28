import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  Input, 
  inject,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardContextService } from '../../card-context.service';

/**
 * Card Cell Component represents a cell within a card.
 * Styling depends on the context of the parent card.
 */
@Component({
  selector: 'tgui-card-cell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="tgui-card-cell" 
      [class.tgui-card-cell--ambient]="isAmbient()">
      
      <!-- Header content -->
      <div class="tgui-card-cell-header" *ngIf="header">
        <span class="tgui-card-cell-title">{{ header }}</span>
      </div>

      <!-- Default content slot -->
      <ng-content></ng-content>

      <!-- Subtitle content -->
      <div class="tgui-card-cell-subtitle" *ngIf="subtitle">
        <span>{{ subtitle }}</span>
      </div>
    </div>
  `,
  styles: [`
    .tgui-card-cell {
      --tgui--cell--middle--padding: 16px 0;
      padding: 0 20px 20px 20px;
      background: var(--tgui--card_bg_color);
    }

    .tgui-card-cell--ambient {
      --tgui--text_color: var(--tgui--white);
      --tgui--hint_color: rgba(255, 255, 255, .75);

      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding-top: 48px;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, var(--tgui--black) 100%);
    }

    .tgui-card-cell-subtitle {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: break-spaces;
    }

    .tgui-card-cell-title {
      font-weight: var(--tgui--font_weight--accent2);
    }

    .tgui-card-cell--ambient .tgui-card-cell-title {
      color: var(--tgui--white);
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardCellComponent {
  /**
   * Cell header text
   */
  @Input() header?: string;

  /**
   * Cell subtitle text
   */
  @Input() subtitle?: string;

  /**
   * Card context service to access the card type
   */
  private cardContextService = inject(CardContextService);

  /**
   * Computed property to determine if the cell is in an ambient card
   */
  isAmbient = computed(() => this.cardContextService.type() === 'ambient');
} 