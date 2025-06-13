import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input,
  computed,
  inject,
  ElementRef,
  AfterViewInit,
  signal,
  OnChanges,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Coords {
  x?: number;
  y?: number;
}

// Constants
export const DEFAULT_ARROW_WIDTH = 22;
export const DEFAULT_ARROW_HEIGHT = 6;
export const DEFAULT_ARROW_PADDING = 12;

/**
 * Gets the position data for the arrow based on placement and coordinates
 */
function getArrowPositionData(
  placement: string,
  coords?: Coords,
  offset = 0,
  isStaticOffset = false
): [string | null, Record<string, number | string>] {
  console.log('🎯 getArrowPositionData called with:', { placement, coords, offset, isStaticOffset });
  
  // Ensure we have coordinates, even if they are undefined
  const safeCoords = coords || { x: 0, y: 0 };
  
  // Function to calculate offset, similar to React version
  const withOffset = (isVerticalPlacement: boolean): number => {
    const coordValue = isVerticalPlacement ? (safeCoords.y ?? 0) : (safeCoords.x ?? 0);
    return isStaticOffset ? offset : coordValue + offset;
  };

  // Handle each placement separately, as in React version
  if (placement.includes('top')) {
    console.log('🎯 Placement includes "top" - setting arrowPlacement to "bottom"');
    return [
      'bottom',
      {
        top: '100%',
        left: withOffset(false)
      }
    ];
  }

  if (placement.includes('right')) {
    console.log('🎯 Placement includes "right" - setting arrowPlacement to "left"');
    return [
      'left',
      {
        top: withOffset(true),
        left: 0
      }
    ];
  }

  if (placement.includes('bottom')) {
    console.log('🎯 Placement includes "bottom" - setting arrowPlacement to "top"');
    return [
      'top',
      {
        bottom: '100%',
        left: withOffset(false)
      }
    ];
  }

  // Handle as left placement by default
  console.log('🎯 Placement includes "left" - setting arrowPlacement to "right"');
  return [
    'right',
    {
      top: withOffset(true),
      right: 0
    }
  ];
}

/**
 * FloatingArrow dynamically positions an arrow indicator relative to a floating element,
 * such as a tooltip to signify its association with a target element.
 * Supports custom arrow icons and positioning adjustments.
 */
@Component({
  selector: 'tgui-floating-arrow',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      [attr.width]="DEFAULT_ARROW_WIDTH"
      [attr.height]="ARROW_HEIGHT_WITH_WHITE_SPACE"
      [attr.viewBox]="'0 0 ' + DEFAULT_ARROW_WIDTH + ' ' + ARROW_HEIGHT_WITH_WHITE_SPACE"
      xmlns="http://www.w3.org/2000/svg"
      class="icon"
    >
      <path d="M10.804 0C6.387 0 6.94 6 .865 6h19.878c-6.074 0-5.521-6-9.939-6Z" fill="currentColor" />
    </svg>
  `,
  styles: [`
    :host {
      position: absolute;
      color: inherit;
      pointer-events: none;
      z-index: 0;
    }

    :host.placement-right {
      transform: rotate(90deg) translate(50%, -50%);
      transform-origin: right;
    }

    :host.placement-bottom {
      transform: rotate(180deg);
    }

    :host.placement-left {
      transform: rotate(-90deg) translate(-50%, -50%);
      transform-origin: left;
    }

    .icon {
      display: block;
      transform: translateY(1px);
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.placement-right]': 'arrowPlacement() === "right"',
    '[class.placement-bottom]': 'arrowPlacement() === "bottom"',
    '[class.placement-left]': 'arrowPlacement() === "left"',
    '[style]': 'computedStyles()'
  }
})
export class FloatingArrowComponent implements OnInit, AfterViewInit, OnChanges {
  private elementRef = inject(ElementRef);

  // Constants
  readonly DEFAULT_ARROW_WIDTH = DEFAULT_ARROW_WIDTH;
  readonly DEFAULT_ARROW_HEIGHT = DEFAULT_ARROW_HEIGHT;
  readonly PLATFORM_HEIGHT = 1;
  readonly ARROW_HEIGHT_WITH_WHITE_SPACE = DEFAULT_ARROW_HEIGHT + this.PLATFORM_HEIGHT;

  // Inputs
  placement = input<string>('bottom');
  offset = input<number | undefined>(undefined);
  isStaticOffset = input<boolean>(false);
  coords = input<Coords | undefined>(undefined);

  // Internal state
  private styles = signal<Record<string, number | string>>({});
  private _arrowPlacement = signal<string | null>(null);

  // Computed values
  arrowPlacement = computed(() => this._arrowPlacement());
  computedStyles = computed(() => {
    const styleObj = this.styles();
    
    const result = Object.entries(styleObj).reduce((acc, [key, value]) => {
      acc[key] = typeof value === 'number' ? `${value}px` : value;
      return acc;
    }, {} as Record<string, string>);
    
    return result;
  });

  ngOnInit(): void {
    this.updateArrowPosition();
  }

  ngAfterViewInit(): void {
    this.updateArrowPosition();
  }
  
  ngOnChanges(): void {
    this.updateArrowPosition();
  }

  private updateArrowPosition(): void {
    console.log('🎯 updateArrowPosition called');
    
    const [arrowPlacement, styles] = getArrowPositionData(
      this.placement(),
      this.coords(),
      this.offset(),
      this.isStaticOffset()
    );

    console.log('🎯 Setting arrow placement:', arrowPlacement);
    this._arrowPlacement.set(arrowPlacement);
    
    console.log('🎯 Setting arrow styles:', styles);
    this.styles.set(styles);
  }
} 