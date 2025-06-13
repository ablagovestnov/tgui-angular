import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  computed,
  signal,
  inject,
  OnInit,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ElementRef,
  effect,
  output,
  HostListener,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalService } from '../../../services/portal.service';
import { PlatformService } from '../../../services/platform.service';
import { ThemeService } from '../../../services/theme.service';
import { RootRendererComponent } from '../../utils/root-renderer/root-renderer.component';
import { TouchComponent, type TouchEvent } from '../../utils/touch/touch.component';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalCloseComponent } from './modal-close.component';
import { ModalOverlayComponent } from './modal-overlay.component';

export interface ModalSnapPoint {
  height: number | string;
  headerHeight?: number;
}

/**
 * Modal component providing a flexible dialog framework with customizable content.
 * Supports swipe gestures, snap points, and portal rendering for mobile-optimized experience.
 * Based on React TGUI Modal component but implemented with Angular Signal API.
 */
@Component({
  selector: 'tgui-modal',
  standalone: true,
  imports: [
    CommonModule,
    RootRendererComponent,
    TouchComponent
  ],
  template: `
    <!-- Trigger element -->
    <ng-container *ngIf="trigger()">
      <ng-container 
        [ngTemplateOutlet]="trigger()!" 
        (click)="handleTriggerClick()"
      ></ng-container>
    </ng-container>

    <!-- Portal content when modal is open -->
    <tgui-root-renderer *ngIf="isOpen()">
      <!-- Overlay -->
      <div 
        *ngIf="!overlayComponent(); else customOverlay"
        [class]="overlayClasses()"
        [style]="overlayStyles()"
        (click)="handleOverlayClick()"
      ></div>
      
      <ng-template #customOverlay>
        <ng-container 
          [ngTemplateOutlet]="overlayComponent()!"
          (click)="handleOverlayClick()"
        ></ng-container>
      </ng-template>

      <!-- Modal Content -->
      <tgui-touch
        #touchElement
        [class]="contentClasses()"
        [style]="contentStyles()"
        (onMoveY)="handleDrag($event)"
        (onEnd)="handleDragEnd($event)"
        (onStart)="handleDragStart($event)"
        [attr.role]="'dialog'"
        [attr.aria-modal]="'true'"
        [attr.aria-hidden]="!isOpen()"
        tabindex="-1"
      >
        <!-- Header with drag handle -->
        <ng-container *ngIf="header()">
          <ng-container [ngTemplateOutlet]="header()!"></ng-container>
        </ng-container>
        
        <!-- Body -->
        <div class="modal-body" #bodyElement>
          <ng-content></ng-content>
        </div>
      </tgui-touch>
    </tgui-root-renderer>
  `,
  styles: [`
    :host {
      display: contents;
    }

    .modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 999;
      opacity: 0;
      transition: opacity 300ms ease;
      background: rgba(0, 0, 0, 0.4);
    }

    .modal-overlay--open {
      opacity: 1;
    }

    .modal-content {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      max-height: 96%;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      display: flex;
      flex-direction: column;
      outline: none;
      background-color: var(--tgui--bg_color);
      z-index: var(--tgui--z_index--overlay, 1000);
      transform: translateY(100%);
      transition: transform 300ms cubic-bezier(0.32, 0.72, 0, 1);
      touch-action: none;
      user-select: none;
    }

    .modal-content--open {
      transform: translateY(0);
    }

    .modal-content--dragging {
      transition: none;
    }

    .modal-content--closing {
      transition: transform 300ms cubic-bezier(0.32, 0.72, 0, 1);
      transform: translateY(100%);
    }

    .modal-body {
      overflow-y: auto;
      padding-bottom: var(--tgui--safe_area_inset_bottom, env(safe-area-inset-bottom));
      flex: 1;
    }

    /* iOS specific styles */
    :host-context(.tgui-platform-ios) .modal-content {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'attr.data-refresh-platform': 'true'
  }
})
export class ModalComponent implements OnInit, OnDestroy, AfterViewInit {
  // Static sub-components for compound component pattern
  static Header = ModalHeaderComponent;
  static Close = ModalCloseComponent;
  static Overlay = ModalOverlayComponent;

  // Services
  private portalService = inject(PortalService);
  private platformService = inject(PlatformService);
  private themeService = inject(ThemeService);

  // ViewChild references
  @ViewChild('touchElement') touchElement?: ElementRef<HTMLElement>;
  @ViewChild('bodyElement') bodyElement?: ElementRef<HTMLElement>;

  // Inputs
  open = input<boolean>(false);
  header = input<TemplateRef<any> | null>(null);
  overlayComponent = input<TemplateRef<any> | null>(null);
  trigger = input<TemplateRef<any> | null>(null);
  nested = input<boolean>(false);
  closeThreshold = input<number>(0.5);
  scrollLockTimeout = input<number>(500);
  modal = input<boolean>(true);
  preventScrollRestoration = input<boolean>(true);
  snapPoints = input<(number | string)[]>([]);
  fadeFromIndex = input<number | null>(null);
  dismissible = input<boolean>(true);

  // Outputs
  openChange = output<boolean>();
  animationEnd = output<{ open: boolean }>();

  // Internal state
  private internalOpen = signal<boolean>(false);
  private isDragging = signal<boolean>(false);
  private dragOffset = signal<number>(0);
  private isAnimating = signal<boolean>(false);
  private lastScrollTime = signal<number>(0);
  private hasBeenOpened = signal<boolean>(false);

  // Computed properties
  readonly isOpenSignal = computed(() => {
    const shouldBeOpen = this.open() || this.internalOpen();
    if (shouldBeOpen && !this.hasBeenOpened()) {
      // Mark as opened to trigger animation
      setTimeout(() => this.hasBeenOpened.set(true), 10);
    }
    return shouldBeOpen;
  });

  // Getter method for template access
  isOpen(): boolean {
    return this.isOpenSignal();
  }
  
  readonly contentClasses = computed(() => ({
    'modal-content': true,
    'modal-content--open': this.isOpenSignal() && this.hasBeenOpened() && !this.isDragging() && !this.isAnimating(),
    'modal-content--dragging': this.isDragging(),
    'modal-content--closing': this.isAnimating()
  }));

  readonly overlayClasses = computed(() => ({
    'modal-overlay': true,
    'modal-overlay--open': this.isOpenSignal() && this.hasBeenOpened()
  }));

  readonly contentStyles = computed(() => {
    const styles: Record<string, any> = {};
    
    if (this.isDragging()) {
      const offset = Math.max(0, this.dragOffset());
      styles['transform'] = `translateY(${offset}px)`;
      styles['transition'] = 'none';
    }
    
    return styles;
  });

  readonly overlayStyles = computed(() => {
    const [r, g, b] = this.getBackgroundColor();
    return {
      background: `rgba(${r}, ${g}, ${b}, 0.4)`
    };
  });

  constructor() {
    // Handle open state changes
    effect(() => {
      const newOpen = this.open();
      if (newOpen !== this.internalOpen()) {
        if (newOpen) {
          this.openModal();
        } else {
          this.closeModal();
        }
      }
    });

    // Handle body scroll lock
    effect(() => {
      if (this.isOpen() && this.modal()) {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = this.getScrollbarWidth() + 'px';
      } else {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    });
  }

  ngOnInit(): void {
    // Listen for modal-close events from child components
    document.addEventListener('modal-close', this.handleModalCloseEvent.bind(this));
  }

  ngAfterViewInit(): void {
    // Focus management
    if (this.isOpen() && this.touchElement?.nativeElement) {
      this.touchElement.nativeElement.focus();
    }
  }

  ngOnDestroy(): void {
    // Clean up body styles
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    
    // Remove event listener
    document.removeEventListener('modal-close', this.handleModalCloseEvent.bind(this));
  }

  // Handle modal-close events from child components
  private handleModalCloseEvent(event: Event): void {
    if (event instanceof CustomEvent && this.isOpen()) {
      this.closeModal();
    }
  }

  // Keyboard event handling
  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isOpen() && this.dismissible()) {
      event.preventDefault();
      this.closeModal();
    }
  }

  // Event handlers
  handleTriggerClick(): void {
    this.openModal();
  }

  handleOverlayClick(): void {
    if (this.dismissible()) {
      this.closeModal();
    }
  }

  handleDragStart(gesture: TouchEvent): void {
    // Check if we should allow dragging
    if (!this.dismissible() || this.isScrollLocked()) {
      return;
    }

    this.isDragging.set(true);
  }

  handleDrag(gesture: TouchEvent): void {
    if (!this.isDragging() || !this.dismissible()) {
      return;
    }

    // Only allow downward dragging
    const offset = Math.max(0, gesture.shiftY);
    this.dragOffset.set(offset);
  }

  handleDragEnd(gesture: TouchEvent): void {
    if (!this.isDragging()) {
      return;
    }

    this.isDragging.set(false);
    
    const offset = this.dragOffset();
    const threshold = (this.touchElement?.nativeElement.offsetHeight || 300) * this.closeThreshold();
    
    // Check velocity for momentum-based closing
    const velocity = Math.abs(gesture.shiftY) / Math.max(gesture.duration, 1);
    const shouldClose = offset > threshold || velocity > 0.5;

    if (shouldClose && this.dismissible()) {
      this.closeModal();
    } else {
      // Reset position
      this.dragOffset.set(0);
    }
  }

  // Public methods
  openModal(): void {
    this.internalOpen.set(true);
    this.isAnimating.set(false);
    this.openChange.emit(true);
  }

  closeModal(): void {
    this.isAnimating.set(true);
    this.internalOpen.set(false);
    this.openChange.emit(false);
    
    // Reset state after animation
    setTimeout(() => {
      this.isAnimating.set(false);
      this.dragOffset.set(0);
      this.hasBeenOpened.set(false);
      this.animationEnd.emit({ open: false });
    }, 300);
  }

  // Private methods
  private isScrollLocked(): boolean {
    const now = Date.now();
    const lastScroll = this.lastScrollTime();
    return now - lastScroll < this.scrollLockTimeout();
  }

  private getBackgroundColor(): [number, number, number] {
    // Default colors
    const DEFAULT_LIGHT_RGB: [number, number, number] = [255, 255, 255];
    const DEFAULT_DARK_RGB: [number, number, number] = [33, 33, 33];

    // Fallback to theme service
    return this.themeService.appearance() === 'dark' 
      ? DEFAULT_DARK_RGB 
      : DEFAULT_LIGHT_RGB;
  }

  private getScrollbarWidth(): number {
    // Create temporary div to measure scrollbar width
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    (outer.style as any).msOverflowStyle = 'scrollbar'; // IE specific property
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    
    document.body.removeChild(outer);
    return scrollbarWidth;
  }
} 