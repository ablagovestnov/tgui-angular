import { Component, Input, HostBinding, ViewEncapsulation, ElementRef, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCellComponent } from './components/card-cell/card-cell.component';
import { CardChipComponent } from './components/card-chip/card-chip.component';

/**
 * Card types that define the visual style of the card
 */
export type CardType = 'plain' | 'ambient';

/**
 * Serves as a container for card-styled UI elements, providing context for its child components.
 * It supports different visual styles and can encapsulate various content types.
 */
@Component({
  selector: 'tgui-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
  exportAs: 'tguiCard'
})
export class CardComponent implements AfterContentInit {
  /**
   * Defines the visual style of the card, influencing background, shadow, and border.
   */
  @Input() type: CardType = 'plain';

  /**
   * Defines the border radius of the card. Default is 24px.
   */
  @Input() set borderRadius(value: string) {
    this._borderRadius = value;
    this.updateCustomStyle();
  }
  
  get borderRadius(): string {
    return this._borderRadius;
  }

  /**
   * URL of the image to display at the top of the card
   */
  @Input() image?: string;

  /**
   * Alt text for the image
   */
  @Input() imageAlt = '';

  /**
   * Height of the image block
   */
  @Input() imageHeight = '200px';

  /** 
   * Custom style for card wrapper 
   */
  customStyle: { [key: string]: string } = {};

  /**
   * Styles for the image block
   */
  imageStyle: { [key: string]: string } = {};

  /** Get all child cells */
  @ContentChildren(CardCellComponent) cardCells!: QueryList<CardCellComponent>;

  private _borderRadius = '24px';

  constructor(private elementRef: ElementRef) {
    this.updateCustomStyle();
  }

  ngAfterContentInit() {
    // Update styles for the image
    this.updateImageStyle();
  }

  /** Apply appropriate class based on the type */
  @HostBinding('class') get className(): string {
    return `tgui-card tgui-card--${this.type}`;
  }
  
  /**
   * Updates custom style object when properties change
   */
  private updateCustomStyle(): void {
    this.customStyle = {
      'border-radius': this._borderRadius
    };
    
    // Update CSS variable for use in child components
    this.elementRef.nativeElement.style.setProperty('--tgui-card-border-radius', this._borderRadius);
    
    // Also update styles for the image if it's set
    this.updateImageStyle();
  }

  /**
   * Updates styles for the image block
   */
  private updateImageStyle(): void {
    if (this.image) {
      this.imageStyle = {
        'height': this.imageHeight,
        'background-image': `url(${this.image})`,
        'background-size': 'cover',
        'background-position': 'center',
        'border-top-left-radius': this._borderRadius,
        'border-top-right-radius': this._borderRadius,
        'overflow': 'hidden'
      };
    }
  }

  /**
   * Checks if the card has an image
   */
  get hasImage(): boolean {
    return !!this.image;
  }
} 