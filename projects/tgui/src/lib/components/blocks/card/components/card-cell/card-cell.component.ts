import { Component, Input, HostBinding, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * CardCell component that represents a content section within a Card.
 */
@Component({
  selector: 'tgui-card-cell',
  templateUrl: './card-cell.component.html',
  styleUrls: ['./card-cell.component.css'],
  standalone: true,
  imports: [CommonModule],
  exportAs: 'tguiCardCell'
})
export class CardCellComponent {
  /**
   * Whether the cell contains image content
   */
  @Input() isImage = false;

  /**
   * Optional header text for the cell
   */
  @Input() header?: string;

  /**
   * Optional subtitle text for the cell
   */
  @Input() subtitle?: string;

  /** Apply appropriate class based on the cell type */
  @HostBinding('class') get className(): string {
    const baseClass = 'tgui-card-cell';
    return this.isImage ? `${baseClass} ${baseClass}--image` : baseClass;
  }
} 