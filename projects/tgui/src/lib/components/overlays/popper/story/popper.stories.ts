import { Meta, StoryObj, moduleMetadata, applicationConfig } from '@storybook/angular';
import { Component, ElementRef, ViewChild, signal, OnInit, OnDestroy, AfterViewInit, importProvidersFrom, ChangeDetectionStrategy, ViewEncapsulation, inject, Renderer2, Input } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

import { PopperComponent } from '../popper.component';
import { TextComponent } from '../../../typography/text/text.component';

// Imports for root components
import { RootComponent as BaseRootComponent } from '../../../utils/tgui-root/tgui-root.component';
import { RootPortalComponent } from '../../../utils/portal/root-portal.component';
import { RootRendererComponent } from '../../../utils/root-renderer/root-renderer.component';
import { PortalService, ThemeService, PlatformService, PlatformType, AppearanceType } from '../../../../services';

// Create a special version of RootComponent for the story
@Component({
  selector: 'tgui-story-root',
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      font-family: var(--tgui--font-family);
    }
    
    :host.tgui-root-wrapper {
      display: block;
    }
  `],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tgui-root-wrapper'
  }
})
export class StoryRootComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() platform?: PlatformType = 'base';
  @Input() appearance?: AppearanceType = 'light';
  @Input() followSystemTheme?: boolean = false;

  private platformService = inject(PlatformService);
  private portalService = inject(PortalService);
  private elementRef = inject(ElementRef<HTMLElement>);
  private themeService = inject(ThemeService);
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  
  private portalContainerEl: HTMLDivElement | null = null;

  constructor() {}

  ngOnInit(): void {
    // Initialize platform
    if (this.platform) {
      this.platformService.setPlatform(this.platform);
    }
    
    // Load global styles
    this.themeService.loadGlobalStyles();
    
    // Initialize theme
    this.themeService.setupTheme(this.appearance, this.followSystemTheme);
    
    // Set up portal container immediately
    this.setupPortalContainer();
  }
  
  ngAfterViewInit(): void {}

  private setupPortalContainer(): void {
    try {
      // Create div for portal content
      if (!this.portalContainerEl) {
        this.portalContainerEl = this.document.createElement('div');
        this.portalContainerEl.className = 'tgui-portal-container';
        this.renderer.appendChild(this.elementRef.nativeElement, this.portalContainerEl);
      }
      
      // Create ElementRef and register with service
      const portalElementRef = new ElementRef(this.portalContainerEl);
      this.portalService.setPortalContainer(portalElementRef);
    } catch (e) {
      console.error('Error setting up portal container:', e);
    }
  }

  ngOnDestroy(): void {
    // Clear portal container reference
    this.portalService.clearPortalContainer();
    
    // Remove portal container element
    if (this.portalContainerEl && this.portalContainerEl.parentNode) {
      this.portalContainerEl.parentNode.removeChild(this.portalContainerEl);
    }
  }
}

@Component({
  selector: 'tgui-popper-demo',
  standalone: true,
  imports: [CommonModule, PopperComponent, TextComponent],
  template: `
    <div
      class="popper-demo-container"
      (click)="updateVirtualElement($event)"
      (mousemove)="trackMousePosition($event)"
    >
      <div class="instructions">
        <tgui-text>Click anywhere in this area to position the popper</tgui-text>
      </div>
      
      <tgui-popper
        [targetRef]="virtualElement()"
        [arrowProps]="{ style: { color: 'var(--tgui--button_color)' } }"
        [placement]="placement"
        [withArrow]="withArrow"
        [sameWidth]="sameWidth"
        [offsetByMainAxis]="offsetByMainAxis"
        [offsetByCrossAxis]="offsetByCrossAxis"
        [autoUpdateOnTargetResize]="true"
        (popperCreated)="onPopperCreated($event)"
        (popperUpdated)="onPopperUpdated($event)"
        (popperShown)="onPopperShown()"
      >
        <div class="popper-content">
          <tgui-text>Hello, I'm a Popper!</tgui-text>
        </div>
      </tgui-popper>
    </div>
  `,
  styles: [`
    .popper-demo-container {
      position: relative;
      height: 300px;
      padding: 20px;
      border: 1px solid var(--tgui--secondary_bg_color);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    
    .popper-content {
      padding: 10px 12px;
      background: var(--tgui--button_color);
      color: var(--tgui--white);
    }
    
    .instructions {
      opacity: 0.7;
    }
  `]
})
class PopperDemoComponent implements OnInit, AfterViewInit, OnDestroy {
  // Story inputs
  @Input() placement: string = 'auto';
  @Input() withArrow: boolean = true;
  @Input() sameWidth: boolean = false;
  @Input() offsetByMainAxis: number = 8;
  @Input() offsetByCrossAxis: number = 0;
  
  // Track update count for debugging
  private updateCount = 0;
  private mouseTrackThrottle = 0;
  
  // Virtual element for positioning
  private _virtualElement = signal<{ getBoundingClientRect: () => DOMRect } | null>(null);
  virtualElement = this._virtualElement.asReadonly();
  
  // Reference to the popper component
  @ViewChild(PopperComponent) popperComponent?: PopperComponent;
  
  constructor(private portalService: PortalService) {
    // Initialize virtual element immediately with a default position
    this.initializeVirtualElement();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Force update the popper position if we have both popper and virtual element
    if (this.popperComponent && this._virtualElement()) {
      setTimeout(() => {
        this.updatePopperPosition();
      }, 100);
    }
  }

  ngOnDestroy(): void {}
  
  initializeVirtualElement(): void {
    // Calculate center position
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;
    
    const rect = DOMRect.fromRect({
      x,
      y,
      width: 0,
      height: 0
    });
    
    this._virtualElement.set({
      getBoundingClientRect: () => {
        return rect;
      }
    });
  }
  
  updateVirtualElement(event: MouseEvent): void {
    // Create a new virtual element at the click position
    const rect = DOMRect.fromRect({
      x: event.clientX,
      y: event.clientY,
      width: 0,
      height: 0
    });
    
    // Reset update count for this position
    this.updateCount = 0;
    
    this._virtualElement.set({
      getBoundingClientRect: () => {
        return rect;
      }
    });
    
    // Force update the popper position immediately
    setTimeout(() => {
      this.updatePopperPosition();
    }, 0);
  }

  trackMousePosition(event: MouseEvent): void {
    // Method intentionally left empty after removing debug logs
  }

  onPopperCreated(instance: any): void {
    // Method intentionally left empty after removing debug logs
  }

  onPopperUpdated(state: any): void {
    // Method intentionally left empty after removing debug logs
  }

  onPopperShown(): void {
    // Method intentionally left empty after removing debug logs
  }

  // Helper method to update popper position
  private updatePopperPosition(): void {
    if (this.popperComponent && this._virtualElement()) {
      this.popperComponent.cleanupFloating();
      this.popperComponent.setupFloating();
    }
  }
}

// Component-wrapper for wrapping story in tgui-root
@Component({
  selector: 'tgui-popper-story-wrapper',
  standalone: true,
  imports: [CommonModule, StoryRootComponent, RootPortalComponent, PopperDemoComponent],
  template: `
    <tgui-story-root appearance="light" platform="base">
      <div style="background-color: var(--tgui--bg_color); padding: 3rem;">
        <!-- Debug information -->
        <div class="debug-info" style="margin-bottom: 1rem; padding: 0.5rem; border: 1px dashed #ccc; font-size: 12px;">
          <div>🔍 Portal container status: {{ portalService.hasPortalContainer() ? 'Available ✅' : 'Not Available ❌' }}</div>
          <div>🔍 Wrapper component initialized</div>
        </div>
        
        <tgui-popper-demo
          [placement]="placement"
          [withArrow]="withArrow"
          [sameWidth]="sameWidth"
          [offsetByMainAxis]="offsetByMainAxis"
          [offsetByCrossAxis]="offsetByCrossAxis"
        ></tgui-popper-demo>
      </div>
      <tgui-root-portal></tgui-root-portal>
    </tgui-story-root>
  `
})
class PopperStoryWrapperComponent implements OnInit, AfterViewInit, OnDestroy {
  placement: string = 'auto';
  withArrow: boolean = true;
  sameWidth: boolean = false;
  offsetByMainAxis: number = 8;
  offsetByCrossAxis: number = 0;
  
  constructor(public portalService: PortalService) {}
  
  ngOnInit(): void {}
  
  ngAfterViewInit(): void {}
  
  ngOnDestroy(): void {}
}

const meta: Meta<PopperStoryWrapperComponent> = {
  title: 'Overlays/Popper',
  component: PopperStoryWrapperComponent,
  // Disable global decorators
  parameters: {
    layout: 'fullscreen',
    decorators: { disable: true }
  },
  // Add custom decorators
  decorators: [
    // Add necessary imports
    moduleMetadata({
      imports: [
        CommonModule, 
        PopperComponent, 
        TextComponent, 
        StoryRootComponent, 
        RootPortalComponent, 
        RootRendererComponent
      ],
      providers: [
        PortalService,
        ThemeService,
        PlatformService
      ]
    }),
    // Add global application configuration
    applicationConfig({
      providers: [
        importProvidersFrom(CommonModule),
        PortalService,
        ThemeService,
        PlatformService
      ]
    })
  ],
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'auto', 'auto-start', 'auto-end',
        'top', 'top-start', 'top-end',
        'right', 'right-start', 'right-end',
        'bottom', 'bottom-start', 'bottom-end',
        'left', 'left-start', 'left-end',
      ],
      defaultValue: 'auto',
      description: 'The preferred placement of the popper'
    },
    withArrow: {
      control: 'boolean',
      defaultValue: true,
      description: 'Whether to show an arrow pointing to the target'
    },
    sameWidth: {
      control: 'boolean',
      defaultValue: false,
      description: 'Whether the popper should have the same width as the target'
    },
    offsetByMainAxis: {
      control: { type: 'number', min: 0, max: 50 },
      defaultValue: 8,
      description: 'Offset along the main axis'
    },
    offsetByCrossAxis: {
      control: { type: 'number', min: -50, max: 50 },
      defaultValue: 0,
      description: 'Offset along the cross axis'
    }
  }
};

export default meta;
type Story = StoryObj<PopperStoryWrapperComponent>;

export const Basic: Story = {
  args: {
    placement: 'auto',
    withArrow: true,
    sameWidth: false,
    offsetByMainAxis: 8,
    offsetByCrossAxis: 0
  }
}; 