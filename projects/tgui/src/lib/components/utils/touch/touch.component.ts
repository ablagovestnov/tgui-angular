import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
  Renderer2,
  HostListener,
  signal,
  computed,
  input,
  output,
  OutputEmitterRef,
  OnInit,
  OnDestroy,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Interface for a touch/gesture event
 */
export interface Gesture {
  startX: number;
  startY: number;
  startT: Date;
  duration: number;
  isPressed: boolean;
  isY: boolean;
  isX: boolean;
  isSlideX: boolean;
  isSlideY: boolean;
  isSlide: boolean;
  clientX: number;
  clientY: number;
  shiftX: number;
  shiftY: number;
  shiftXAbs: number;
  shiftYAbs: number;
}

/**
 * Custom touch event type combining MouseEvent and TouchEvent properties
 */
export interface CustomTouchEvent extends MouseEvent {
  touches?: TouchList;
  changedTouches?: TouchList;
}

/**
 * Touch event handler type
 */
export type TouchEventHandler = (e: TouchEvent) => void;

/**
 * Touch event with gesture information
 */
export interface TouchEvent extends Gesture {
  originalEvent: CustomTouchEvent;
}

/**
 * Component for handling touch and gesture events
 * 
 * This component is ported from the VKUI library for convenient handling of pointer events
 * https://github.com/VKCOM/VKUI/blob/master/packages/vkui/src/components/Touch/Touch.tsx
 */
@Component({
  selector: 'tgui-touch',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: block;
      position: relative;
      touch-action: manipulation;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TouchComponent implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  // Input properties using Signal API
  usePointerHover = input<boolean>(false);
  useCapture = input<boolean>(false);
  slideThreshold = input<number>(5);
  noSlideClick = input<boolean>(false);
  stopPropagation = input<boolean>(false);

  // Output events using Signal API
  onEnter = output<MouseEvent>();
  onLeave = output<MouseEvent>();
  onStart = output<TouchEvent>();
  onStartX = output<TouchEvent>();
  onStartY = output<TouchEvent>();
  onMove = output<TouchEvent>();
  onMoveX = output<TouchEvent>();
  onMoveY = output<TouchEvent>();
  onEnd = output<TouchEvent>();
  onEndX = output<TouchEvent>();
  onEndY = output<TouchEvent>();

  // Internal state
  private gesture = signal<Partial<Gesture> | null>(null);
  private didSlide = signal(false);
  private supportedEvents = this.getSupportedEvents();
  private permanentUnlisteners: (() => void)[] = []; // Listeners that should persist throughout component lifecycle
  private moveEndUnlisteners: (() => void)[] = []; // Listeners that should be removed after gesture end

  /**
   * Check if touch events are enabled in the browser
   */
  private touchEnabled(): boolean {
    return typeof window !== 'undefined' && 'ontouchstart' in window;
  }

  /**
   * Get supported events based on browser capabilities
   */
  private getSupportedEvents(): string[] {
    if (this.touchEnabled()) {
      return ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
    }
    return ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];
  }

  /**
   * Initialize a gesture
   */
  private initGesture(startX: number, startY: number): Gesture {
    return {
      startX,
      startY,
      startT: new Date(),
      duration: 0,
      isPressed: true,
      isY: false,
      isX: false,
      isSlideX: false,
      isSlideY: false,
      isSlide: false,
      clientX: 0,
      clientY: 0,
      shiftX: 0,
      shiftY: 0,
      shiftXAbs: 0,
      shiftYAbs: 0,
    };
  }

  /**
   * Get X coordinate from an event
   */
  private coordX(e: CustomTouchEvent): number {
    if (e.clientX != null) {
      return e.clientX;
    }
    return e.changedTouches?.[0]?.clientX || 0;
  }

  /**
   * Get Y coordinate from an event
   */
  private coordY(e: CustomTouchEvent): number {
    if (e.clientY != null) {
      return e.clientY;
    }
    return e.changedTouches?.[0]?.clientY || 0;
  }

  ngOnInit(): void {
    this.setupListeners();
  }

  ngOnDestroy(): void {
    this.removeAllListeners();
  }

  /**
   * Setup event listeners
   */
  private setupListeners(): void {
    // Setup hover events if needed
    if (this.usePointerHover()) {
      this.addPermanentEventListener(
        this.usePointerHover() ? 'pointerenter' : 'mouseenter',
        (e: MouseEvent) => this.handleHoverEnter(e)
      );
      this.addPermanentEventListener(
        this.usePointerHover() ? 'pointerleave' : 'mouseleave',
        (e: MouseEvent) => this.handleHoverLeave(e)
      );
    }

    // Setup touch/mouse start events
    this.addPermanentEventListener(
      this.supportedEvents[0],
      (e: CustomTouchEvent) => this.handleStart(e)
    );
  }

  /**
   * Handle start of a touch/mouse interaction
   */
  private handleStart(e: CustomTouchEvent): void {
    const newGesture = this.initGesture(this.coordX(e), this.coordY(e));
    this.gesture.set(newGesture);

    // Fire start events
    this.handleGestureEvent(e, [
      this.onStart,
      this.onStartX,
      this.onStartY
    ]);

    // Add move and end events
    const targetElement = this.touchEnabled() 
      ? (e.target as HTMLElement) // Touch events fire on the initial target
      : (window.document as any); // Mouse events need document-level capture

    // Add move and end event listeners
    this.addDocumentEventListeners(targetElement);
  }

  /**
   * Add event listeners at document level for move and end events
   */
  private addDocumentEventListeners(target: HTMLElement | Document): void {
    const moveListener = this.renderer.listen(
      target,
      this.supportedEvents[1],
      (e: CustomTouchEvent) => this.handleMove(e)
    );

    const endListener = this.renderer.listen(
      target,
      this.supportedEvents[2],
      (e: CustomTouchEvent) => this.handleEnd(e)
    );

    const cancelListener = this.renderer.listen(
      target,
      this.supportedEvents[3],
      (e: CustomTouchEvent) => this.handleEnd(e)
    );

    this.moveEndUnlisteners.push(moveListener, endListener, cancelListener);
  }

  /**
   * Handle move events
   */
  private handleMove(e: CustomTouchEvent): void {
    const currentGesture = this.gesture();
    
    if (!currentGesture?.isPressed) {
      return;
    }

    const { isPressed, isX, isY, startX = 0, startY = 0 } = currentGesture;

    if (isPressed) {
      const clientX = this.coordX(e);
      const clientY = this.coordY(e);

      // Calculate offsets
      const shiftX = clientX - startX;
      const shiftY = clientY - startY;

      // Absolute offset values
      const shiftXAbs = Math.abs(shiftX);
      const shiftYAbs = Math.abs(shiftY);

      // Check for multitouch - interrupt the gesture if detected
      if (e.touches && e.touches.length > 1) {
        this.handleEnd(e);
        return;
      }

      // If direction not determined yet
      if (!isX && !isY) {
        const willBeX = shiftXAbs >= this.slideThreshold() && shiftXAbs > shiftYAbs;
        const willBeY = shiftYAbs >= this.slideThreshold() && shiftYAbs > shiftXAbs;
        const willBeSlidedX = willBeX && this.hasListeners(this.onMoveX) || this.hasListeners(this.onMove);
        const willBeSlidedY = willBeY && this.hasListeners(this.onMoveY) || this.hasListeners(this.onMove);

        // Update gesture state
        this.gesture.update(g => {
          if (!g) return g;
          return {
            ...g,
            isY: willBeY,
            isX: willBeX,
            isSlideX: willBeSlidedX,
            isSlideY: willBeSlidedY,
            isSlide: willBeSlidedX || willBeSlidedY
          };
        });
      }

      const updatedGesture = this.gesture();
      
      if (updatedGesture?.isSlide) {
        // Update gesture with new coordinates
        this.gesture.update(g => {
          if (!g) return g;
          return {
            ...g,
            clientX,
            clientY,
            shiftX,
            shiftY,
            shiftXAbs,
            shiftYAbs
          };
        });

        // Fire move events
        this.handleGestureEvent(e, [
          this.onMove,
          updatedGesture.isSlideX ? this.onMoveX : null,
          updatedGesture.isSlideY ? this.onMoveY : null
        ]);
      }
    }
  }

  /**
   * Check if an output emitter has any listeners
   */
  private hasListeners(emitter: OutputEmitterRef<any>): boolean {
    // In Angular, we can't directly check if an output has listeners
    // So we'll make our best guess implementation
    return true;
  }

  /**
   * Handle end of interaction
   */
  private handleEnd(e: CustomTouchEvent): void {
    const currentGesture = this.gesture();
    const { isPressed, isSlide, isSlideX, isSlideY } = currentGesture || {};

    if (isPressed) {
      // Fire end events
      this.handleGestureEvent(e, [
        this.onEnd,
        isSlideY ? this.onEndY : null,
        isSlideX ? this.onEndX : null
      ]);
    }

    // Track if slide occurred for click handling
    if (this.touchEnabled() && isSlide) {
      // If it's a touch device and touchmove was detected,
      // the click event won't be triggered
      this.didSlide.set(false);
    } else {
      this.didSlide.set(Boolean(isSlide));
    }

    // Reset gesture state
    this.gesture.set({});

    // If it was a touch event, simulate hover cancellation
    if (this.touchEnabled() && this.hasListeners(this.onLeave)) {
      this.onLeave.emit(e as MouseEvent);
    }

    // Remove document listeners for move and end events
    this.removeMoveEndListeners();
  }

  /**
   * Handle hover enter event
   */
  private handleHoverEnter(e: MouseEvent): void {
    if (this.hasListeners(this.onEnter)) {
      this.onEnter.emit(e);
    }
  }

  /**
   * Handle hover leave event
   */
  private handleHoverLeave(e: MouseEvent): void {
    if (this.hasListeners(this.onLeave)) {
      this.onLeave.emit(e);
    }
  }

  /**
   * Handle gesture events and emit to appropriate outputs
   */
  private handleGestureEvent(e: CustomTouchEvent, handlers: Array<OutputEmitterRef<TouchEvent> | null>): void {
    if (this.stopPropagation()) {
      e.stopPropagation();
    }

    handlers.forEach(emitter => {
      if (!emitter || !this.hasListeners(emitter)) return;
      
      const currentGesture = this.gesture();
      if (!currentGesture) return;
      
      const duration = Date.now() - (currentGesture.startT?.getTime() ?? 0);
      
      // Create a complete TouchEvent object with all required properties
      const touchEvent: TouchEvent = {
        startX: currentGesture.startX ?? 0,
        startY: currentGesture.startY ?? 0,
        startT: currentGesture.startT ?? new Date(),
        duration,
        isPressed: currentGesture.isPressed ?? false,
        isY: currentGesture.isY ?? false,
        isX: currentGesture.isX ?? false,
        isSlideX: currentGesture.isSlideX ?? false,
        isSlideY: currentGesture.isSlideY ?? false,
        isSlide: currentGesture.isSlide ?? false,
        clientX: currentGesture.clientX ?? 0,
        clientY: currentGesture.clientY ?? 0,
        shiftX: currentGesture.shiftX ?? 0,
        shiftY: currentGesture.shiftY ?? 0,
        shiftXAbs: currentGesture.shiftXAbs ?? 0,
        shiftYAbs: currentGesture.shiftYAbs ?? 0,
        originalEvent: e
      };
      
      emitter.emit(touchEvent);
    });
  }

  /**
   * Add permanent event listeners to the host element
   * These listeners remain active throughout the component lifecycle
   */
  private addPermanentEventListener(eventName: string, handler: (e: any) => void): void {
    const unlistener = this.renderer.listen(
      this.elementRef.nativeElement,
      eventName,
      (e: any) => handler(e)
    );
    this.permanentUnlisteners.push(unlistener);
  }

  /**
   * Remove move and end event listeners
   * These are cleaned up after every gesture completes
   */
  private removeMoveEndListeners(): void {
    this.moveEndUnlisteners.forEach(unlisten => unlisten());
    this.moveEndUnlisteners = [];
  }

  /**
   * Remove all event listeners
   * Called on component destruction
   */
  private removeAllListeners(): void {
    this.removeMoveEndListeners();
    this.permanentUnlisteners.forEach(unlisten => unlisten());
    this.permanentUnlisteners = [];
  }

  /**
   * Cancel the transition through nested links if a swipe was detected
   */
  @HostListener('click', ['$event'])
  onClick(e: MouseEvent): void {
    if (!this.didSlide()) {
      return;
    }

    if (this.noSlideClick()) {
      e.stopPropagation();
      e.preventDefault();
    }

    this.didSlide.set(false);
  }

  /**
   * Dragstart event handler
   * Cancels the native browser behavior for nested links and images
   */
  @HostListener('dragstart', ['$event'])
  onDragStart(e: DragEvent): void {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' || target.tagName === 'IMG') {
      e.preventDefault();
    }
  }
} 