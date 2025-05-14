import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  ElementRef,
  inject,
  input,
  signal,
  effect,
  computed,
  ContentChild,
  TemplateRef,
  PLATFORM_ID,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RootPortalComponent } from '../../utils/portal/root-portal.component';
import { PlatformService, PortalService } from '../../../services';
import { 
  computePosition, 
  autoPlacement, 
  offset, 
  flip, 
  shift, 
  size, 
  arrow, 
  hide,
  Middleware,
  Placement, 
  Strategy, 
  VirtualElement, 
  MiddlewareData
} from '@floating-ui/dom';

@Component({
  selector: 'tgui-popper',
  standalone: true,
  imports: [CommonModule, RootPortalComponent],
  template: `
    <tgui-root-portal *ngIf="visible()">
      <div 
        #popperElement
        class="tgui-popper"
        [class.tgui-popper--ios]="platformService.isIOS()"
        [style.position]="'absolute'"
        [style.top]="position().top + 'px'"
        [style.left]="position().left + 'px'"
        [style.width]="sameWidth() ? position().targetWidth + 'px' : 'auto'"
        [style.visibility]="isHidden() ? 'hidden' : 'visible'"
        [style.maxWidth]="'calc(100vw - 16px)'"
        [style.maxHeight]="'calc(100vh - 16px)'">
        <div class="tgui-popper-body">
          <ng-content></ng-content>
          <ng-container *ngIf="contentTemplate" [ngTemplateOutlet]="contentTemplate"></ng-container>
        </div>
      </div>
    </tgui-root-portal>
  `,
  styles: [`
    .tgui-popper {
      z-index: 100;
      box-sizing: border-box;
    }
    
    .tgui-popper-body {
      background-color: var(--tgui-color-background);
      color: var(--tgui-color-text);
      border-radius: 12px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, .08), 0 4px 12px rgba(0, 0, 0, .08);
      overflow: auto;
      max-width: 100%;
      max-height: 100%;
    }
    
    .tgui-popper--ios .tgui-popper-body {
      border-radius: 14px;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopperComponent implements AfterViewInit {
  private elementRef = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  protected platformService = inject(PlatformService);
  private portalService = inject(PortalService);
  private updatePositionHandler: () => void = () => {};

  @ViewChild('popperElement') popperElement?: ElementRef<HTMLElement>;
  @ContentChild('content') contentTemplate?: TemplateRef<any>;
  
  ngAfterViewInit(): void {
    // Initialization will be handled in the effect
  }

  // Inputs
  targetRef = input<HTMLElement | VirtualElement | null>(null);
  placement = input<Placement>('bottom');
  strategy = input<Strategy>('absolute');
  offsetByMainAxis = input<number>(8);
  offsetByCrossAxis = input<number>(0);
  sameWidth = input<boolean>(false);
  flip = input<boolean>(true);
  shift = input<boolean>(true);
  autoPlacement = input<boolean>(false);
  hide = input<boolean>(false);
  visible = input<boolean>(true); // Control overall visibility
  
  // Internal state
  position = signal<{ 
    top: number; 
    left: number; 
    middlewareData?: MiddlewareData;
    targetWidth?: number;
  }>({ top: 0, left: 0 });
  
  isHidden = signal(false);
  
  // Computed values
  strictPlacement = computed(() => {
    return this.autoPlacement() ? 'auto-start' as Placement : this.placement();
  });

  middlewares = computed(() => {
    const middlewares: Middleware[] = [];
    
    // Apply offset
    if (this.offsetByMainAxis() !== 0 || this.offsetByCrossAxis() !== 0) {
      middlewares.push(offset({
        mainAxis: this.offsetByMainAxis(),
        crossAxis: this.offsetByCrossAxis(),
      }));
    }
    
    // Auto placement
    if (this.autoPlacement()) {
      middlewares.push(autoPlacement());
    }
    
    // Flip placement if needed
    if (this.flip()) {
      middlewares.push(flip());
    }
    
    // Shift to keep in viewport
    if (this.shift()) {
      middlewares.push(shift({ padding: 8 }));
    }
    
    // Apply same width as target
    if (this.sameWidth()) {
      const self = this;
      middlewares.push(size({
        apply({ rects }) {
          const currentPosition = self.position();
          self.position.set({
            ...currentPosition,
            targetWidth: rects.reference.width,
          });
        },
      }));
    }
    
    // Hide when no space
    if (this.hide()) {
      middlewares.push(hide());
    }
    
    return middlewares;
  });
  
  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      if (!this.visible()) return; // Skip positioning if not visible
      
      const targetElement = this.targetRef();
      if (!targetElement) return;
      
      // Добавляем повторные попытки найти контейнер портала
      this.findPortalContainerAndSetupPopper(targetElement);
      
      return () => {
        window.removeEventListener('scroll', this.updatePositionHandler);
        window.removeEventListener('resize', this.updatePositionHandler);
      };
    });
  }
  
  private findPortalContainerAndSetupPopper(targetElement: HTMLElement | VirtualElement, retryCount = 0): void {
    const portalContainer = this.portalService.getPortalContainerElement();

    if (!portalContainer) {
      // Если контейнер портала не доступен, повторяем попытку несколько раз
      if (retryCount < 5) {
        console.log(`Portal container not available, retrying (${retryCount + 1}/5)...`);
        setTimeout(() => {
          this.findPortalContainerAndSetupPopper(targetElement, retryCount + 1);
        }, 100);
      } else {
        console.error('Portal container not available after multiple attempts');
      }
      return;
    }
    
    // Ищем элемент поппера в контейнере портала
    setTimeout(() => {
      const poppers = portalContainer.querySelectorAll('.tgui-popper');
      console.log('Found popper elements in portal:', poppers.length);
      
      if (poppers.length === 0) {
        // Если элементы поппера не найдены, повторяем попытку
        if (retryCount < 5) {
          console.log(`No popper elements found, retrying (${retryCount + 1}/5)...`);
          setTimeout(() => {
            this.findPortalContainerAndSetupPopper(targetElement, retryCount + 1);
          }, 100);
        } else {
          console.error('No popper elements found after multiple attempts');
        }
        return;
      }
      
      // Используем последний элемент поппера, чтобы избежать проблем с несколькими попперами
      const popperElement = poppers[poppers.length - 1] as HTMLElement;
      
      this.setupPositioning(targetElement, popperElement);
    }, 50);
  }
  
  private setupPositioning(targetElement: HTMLElement | VirtualElement, floating: HTMLElement): void {
    console.log('setupPositioning with floating element:', floating);
    this.updatePosition(targetElement, floating);
    
    // Clean up previous listeners
    window.removeEventListener('scroll', this.updatePositionHandler);
    window.removeEventListener('resize', this.updatePositionHandler);
    
    // Set up auto-update with proper binding
    this.updatePositionHandler = () => this.updatePosition(targetElement, floating);
    window.addEventListener('scroll', this.updatePositionHandler, { passive: true });
    window.addEventListener('resize', this.updatePositionHandler, { passive: true });
  }
  
  private async updatePosition(reference: HTMLElement | VirtualElement, floating: HTMLElement) {
    if (!reference || !floating) return;
    
    try {
      // Ensure the floating element is properly styled before computation
      floating.style.position = this.strategy();

      const { x, y, middlewareData } = await computePosition(reference, floating, {
        placement: this.strictPlacement(),
        strategy: this.strategy(),
        middleware: this.middlewares(),
      });
      
      // Force a layout reflow to ensure position changes are applied immediately
      document.body.offsetHeight;
      
      this.position.set({ 
        top: y, 
        left: x, 
        middlewareData,
        targetWidth: this.position().targetWidth
      });
      
      this.isHidden.set(!!middlewareData.hide?.referenceHidden);
    } catch (error) {
      console.error('Failed to compute position:', error);
    }
  }
} 