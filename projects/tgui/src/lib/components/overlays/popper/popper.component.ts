import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input,
  computed,
  signal,
  inject,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  type ElementRef as TypeElementRef,
  output
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  computePosition, 
  VirtualElement, 
  Placement,
  MiddlewareData,
  ComputePositionReturn
} from '@floating-ui/dom';

import { RootRendererComponent } from '../../utils/root-renderer/root-renderer.component';
import { FloatingArrowComponent, DEFAULT_ARROW_HEIGHT, DEFAULT_ARROW_PADDING } from './components/floating-arrow';
import { FloatingMiddlewaresService, type UseFloatingMiddlewaresOptions, PlacementWithAuto } from './hooks';
import { autoUpdateFloatingElement } from './helpers';

export interface PopperProps extends Omit<UseFloatingMiddlewaresOptions, 'arrowHeight' | 'arrowPadding' | 'arrowRef'> {
  /** Reference to the target element or virtual element for precise positioning. */
  targetRef: HTMLElement | VirtualElement | null;
  /** Configuration and customization options for the floating arrow component. */
  arrowProps?: {
    /** Optionally override the default arrow height. */
    height?: number;
    /** Optionally override the default arrow padding. */
    padding?: number;
    /** Additional styles for the arrow */
    style?: Record<string, string>;
    /** Additional class name for the arrow */
    className?: string;
  };
  /** Opt-in feature to automatically update Popper's position when the target element resizes. */
  autoUpdateOnTargetResize?: boolean;
}

/**
 * Renders a Popper component, leveraging floating UI for dynamic, responsive positioning.
 * Supports advanced configurations like virtual elements, custom arrows, and auto-position updates.
 */
@Component({
  selector: 'tgui-popper',
  standalone: true,
  imports: [CommonModule, RootRendererComponent, FloatingArrowComponent],
  template: `
    <tgui-root-renderer>
      <div
        #floatingEl
        [ngStyle]="floatingStyles()"
        class="wrapper"
      >
        <tgui-floating-arrow
          *ngIf="withArrow()"
          #arrowEl
          [placement]="resolvedPlacement()"
          [coords]="arrowCoords()"
          [style]="arrowStyle()"
          [class]="arrowClassName()"
        ></tgui-floating-arrow>
        <ng-content></ng-content>
      </div>
    </tgui-root-renderer>
  `,
  styles: [`
    .wrapper {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1000;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopperComponent implements AfterViewInit, OnDestroy {
  private floatingMiddlewaresService = inject(FloatingMiddlewaresService);
  private elementRef = inject(ElementRef);

  // ViewChild references
  @ViewChild('floatingEl') floatingEl!: TypeElementRef<HTMLElement>;
  @ViewChild('arrowEl') arrowEl?: FloatingArrowComponent;

  // Inputs
  placement = input<PlacementWithAuto>('auto');
  targetRef = input<HTMLElement | VirtualElement | null>(null);
  sameWidth = input<boolean>(false);
  offsetByMainAxis = input<number>(8);
  offsetByCrossAxis = input<number>(0);
  withArrow = input<boolean>(true);
  arrowProps = input<PopperProps['arrowProps']>({});
  autoUpdateOnTargetResize = input<boolean>(false);
  customMiddlewares = input<UseFloatingMiddlewaresOptions['customMiddlewares']>([]);

  // Outputs
  popperCreated = output<any>();
  popperUpdated = output<ComputePositionReturn>();
  popperShown = output<void>();

  // State
  private cleanup = signal<(() => void) | null>(null);
  private _floatingStyles = signal<Record<string, string>>({});
  private _resolvedPlacement = signal<Placement>('bottom');
  private _arrowCoords = signal<{ x?: number; y?: number } | undefined>(undefined);
  private _middlewareData = signal<MiddlewareData>({});

  // Computed values
  floatingStyles = computed(() => this._floatingStyles());
  resolvedPlacement = computed(() => this._resolvedPlacement());
  arrowCoords = computed(() => this._arrowCoords());
  
  // Arrow props
  arrowStyle = computed(() => this.arrowProps()?.style || {});
  arrowClassName = computed(() => this.arrowProps()?.className || '');
  arrowHeight = computed(() => this.arrowProps()?.height || DEFAULT_ARROW_HEIGHT);
  arrowPadding = computed(() => this.arrowProps()?.padding || DEFAULT_ARROW_PADDING);

  ngAfterViewInit(): void {
    console.log('🚀 PopperComponent ngAfterViewInit');
    this.setupFloating();
  }

  ngOnDestroy(): void {
    this.cleanupFloating();
  }

  public setupFloating(): void {
    if (!this.targetRef() || !this.floatingEl) {
      return;
    }

    // Find DOM arrow element using querySelector and cast to HTMLElement
    const arrowElement = this.floatingEl.nativeElement.querySelector('tgui-floating-arrow') as HTMLElement | null;
    console.log('🚀 Arrow element from querySelector:', arrowElement);
    
    const { middlewares, strictPlacement } = this.floatingMiddlewaresService.getMiddlewares({
      placement: this.placement(),
      sameWidth: this.sameWidth(),
      offsetByMainAxis: this.offsetByMainAxis(),
      offsetByCrossAxis: this.offsetByCrossAxis(),
      withArrow: this.withArrow(),
      arrowRef: arrowElement, // Use DOM element found through querySelector
      arrowHeight: this.arrowHeight(),
      arrowPadding: this.arrowPadding(),
      customMiddlewares: this.customMiddlewares()
    });

    const update = () => {
      if (!this.targetRef() || !this.floatingEl) {
        return;
      }

      computePosition(this.targetRef() as any, this.floatingEl.nativeElement, {
        placement: strictPlacement as Placement,
        middleware: middlewares
      }).then((positionData) => {
        const { x, y, placement, middlewareData } = positionData;
        
        this._floatingStyles.set({
          left: `${x}px`,
          top: `${y}px`
        });
        
        this._resolvedPlacement.set(placement);
        this._middlewareData.set(middlewareData);
        
        // Log arrow coordinates update
        this._arrowCoords.set(middlewareData.arrow);
        console.log('🚀 Arrow coordinates updated:', middlewareData.arrow);
        
        // Emit the position data
        this.popperUpdated.emit(positionData);
        
        // Emit that the popper is now shown
        setTimeout(() => {
          this.popperShown.emit();
        }, 0);
      });
    };

    // Initial update
    update();

    // Setup auto-updating
    const cleanupFn = autoUpdateFloatingElement(
      this.targetRef() as any,
      this.floatingEl.nativeElement,
      update,
      {
        elementResize: this.autoUpdateOnTargetResize()
      }
    );

    // Store cleanup function
    this.cleanup.set(cleanupFn);
    
    // Emit that the popper instance is created
    this.popperCreated.emit({
      update,
      cleanup: cleanupFn,
      targetRef: this.targetRef(),
      floatingEl: this.floatingEl.nativeElement
    });
  }

  public cleanupFloating(): void {
    if (this.cleanup()) {
      this.cleanup()!();
      this.cleanup.set(null);
    }
  }
} 