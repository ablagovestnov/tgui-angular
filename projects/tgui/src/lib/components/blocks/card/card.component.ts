import { Component, input, HostBinding, ViewEncapsulation, ElementRef, ContentChildren, QueryList, AfterContentInit, computed, signal, effect, inject, ChangeDetectionStrategy } from '@angular/core';
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
  standalone: true,
  imports: [CommonModule],
  exportAs: 'tguiCard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class CardComponent implements AfterContentInit {
  /**
   * Defines the visual style of the card, influencing background, shadow, and border.
   */
  type = input<CardType>('plain');

  /**
   * Defines the border radius of the card. Default is 24px.
   */
  borderRadius = input<string>('24px');

  /**
   * URL of the image to display at the top of the card
   */
  image = input<string>();

  /**
   * Alt text for the image
   */
  imageAlt = input<string>('');

  /**
   * Height of the image block
   */
  imageHeight = input<string>('200px');

  /** Get all child cells */
  @ContentChildren(CardCellComponent) cardCells!: QueryList<CardCellComponent>;

  private elementRef = inject(ElementRef);

  /** 
   * Custom style for card wrapper 
   */
  customStyle = computed(() => ({
    'border-radius': this.borderRadius()
  }));

  /**
   * Styles for the image block
   */
  imageStyle = computed(() => {
    if (!this.image()) return {};
    
    return {
      'height': this.imageHeight(),
      'background-image': `url(${this.image()})`,
      'background-size': 'cover',
      'background-position': 'center',
      'border-top-left-radius': this.borderRadius(),
      'border-top-right-radius': this.borderRadius(),
      'overflow': 'hidden'
    };
  });

  /**
   * Checks if the card has an image
   */
  hasImage = computed(() => !!this.image());

  constructor() {
    // Effect to update CSS variable when border radius changes
    effect(() => {
      this.elementRef.nativeElement.style.setProperty('--tgui-card-border-radius', this.borderRadius());
    });
  }

  ngAfterContentInit() {
    // No additional setup needed with signals
  }

  /** Apply appropriate class based on the type */
  @HostBinding('class') get className(): string {
    return `tgui-card tgui-card--${this.type()}`;
  }
} 