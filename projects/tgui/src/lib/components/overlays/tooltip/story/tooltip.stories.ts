import { Meta, StoryObj, moduleMetadata, applicationConfig } from '@storybook/angular';
import { Component, ElementRef, ViewChild, signal, OnInit, OnDestroy, AfterViewInit, importProvidersFrom, ChangeDetectionStrategy, ViewEncapsulation, inject, Renderer2, Input } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

import { TooltipComponent } from '../tooltip.component';
import { TextComponent } from '../../../typography/text/text.component';
import { ButtonComponent } from '../../../blocks/button/button.component';

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
  selector: 'tgui-tooltip-demo',
  standalone: true,
  imports: [CommonModule, TooltipComponent, TextComponent, ButtonComponent],
  template: `
    <div class="tooltip-demo-container">
      <div class="instructions">
        <tgui-text>Click the button to toggle tooltip</tgui-text>
      </div>
      
      <tgui-button 
        #button 
        mode="filled" 
        size="m"
        (click)="toggleTooltip()"
      >
        {{ shown() ? 'Hide Tooltip' : 'Show Tooltip' }}
      </tgui-button>
      
      <tgui-tooltip 
        *ngIf="shown()" 
        [targetRef]="button.elementRef.nativeElement"
        [mode]="mode"
        [placement]="placement"
        [sameWidth]="sameWidth"
      >
        Hold to record audio. Tap to switch to video.
      </tgui-tooltip>
    </div>
  `,
  styles: [`
    .tooltip-demo-container {
      position: relative;
      height: 300px;
      padding: 20px;
      border: 1px solid var(--tgui--secondary_bg_color);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 24px;
    }
    
    .instructions {
      opacity: 0.7;
      margin-bottom: 16px;
      text-align: center;
    }
  `]
})
class TooltipDemoComponent implements OnInit, AfterViewInit, OnDestroy {
  // Story inputs
  @Input() mode: 'light' | 'dark' = 'light';
  @Input() placement: string = 'auto';
  @Input() sameWidth: boolean = false;
  
  // State for tooltip visibility
  private _shown = signal<boolean>(false);
  shown = this._shown.asReadonly();
  
  // Reference to the button and tooltip components
  @ViewChild('button') buttonRef?: ElementRef;
  @ViewChild(TooltipComponent) tooltipComponent?: TooltipComponent;
  
  constructor(private portalService: PortalService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}
  
  toggleTooltip(): void {
    this._shown.update(value => !value);
  }
}

// Component-wrapper for wrapping story in tgui-root
@Component({
  selector: 'tgui-tooltip-story-wrapper',
  standalone: true,
  imports: [CommonModule, StoryRootComponent, RootPortalComponent, TooltipDemoComponent],
  template: `
    <tgui-story-root [appearance]="appearance" platform="base">
      <div style="background-color: var(--tgui--bg_color); padding: 3rem;">
        <!-- Debug information -->
        <div class="debug-info" style="margin-bottom: 1rem; padding: 0.5rem; border: 1px dashed #ccc; font-size: 12px;">
          <div>🔍 Portal container status: {{ portalService.hasPortalContainer() ? 'Available ✅' : 'Not Available ❌' }}</div>
          <div>🔍 Wrapper component initialized</div>
        </div>
        
        <tgui-tooltip-demo
          [mode]="mode"
          [placement]="placement"
          [sameWidth]="sameWidth"
        ></tgui-tooltip-demo>
      </div>
      <tgui-root-portal></tgui-root-portal>
    </tgui-story-root>
  `
})
class TooltipStoryWrapperComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() mode: 'light' | 'dark' = 'light';
  @Input() placement: string = 'auto';
  @Input() sameWidth: boolean = false;
  
  constructor(public portalService: PortalService) {}
  
  get appearance(): AppearanceType {
    return this.mode === 'dark' ? 'dark' : 'light';
  }
  
  ngOnInit(): void {}
  
  ngAfterViewInit(): void {}
  
  ngOnDestroy(): void {}
}

const meta: Meta<TooltipStoryWrapperComponent> = {
  title: 'Overlays/Tooltip',
  component: TooltipStoryWrapperComponent,
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
        TooltipComponent, 
        TextComponent, 
        ButtonComponent,
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
    mode: {
      options: ['light', 'dark'],
      control: { type: 'select' },
      description: 'Defines the theme of the tooltip',
      defaultValue: 'light',
    },
    placement: {
      options: [
        'auto', 'auto-start', 'auto-end',
        'top', 'top-start', 'top-end',
        'right', 'right-start', 'right-end',
        'bottom', 'bottom-start', 'bottom-end',
        'left', 'left-start', 'left-end',
      ],
      control: { type: 'select' },
      description: 'Placement of the tooltip relative to target',
      defaultValue: 'auto',
    },
    sameWidth: {
      control: 'boolean',
      description: 'Match width of the tooltip with target element',
      defaultValue: false,
    },
  }
};

export default meta;

type Story = StoryObj<TooltipStoryWrapperComponent>;

export const Light: Story = {
  args: {
    mode: 'light',
    placement: 'auto',
    sameWidth: false
  }
};

export const Dark: Story = {
  args: {
    mode: 'dark',
    placement: 'auto',
    sameWidth: false
  }
}; 