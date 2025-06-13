import { moduleMetadata, type Meta, type StoryObj, applicationConfig } from '@storybook/angular';
import { Component, ElementRef, inject, Input, AfterViewInit, OnInit, OnDestroy, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { PinInputComponent } from '../pin-input.component';
import { RootRendererComponent } from '../../../utils/root-renderer/root-renderer.component';
import { RootComponent } from '../../../utils/tgui-root/tgui-root.component';
import { RootPortalComponent } from '../../../utils/portal/root-portal.component';
import { PortalService, ThemeService, PlatformService, PlatformType, AppearanceType } from '../../../../services';

// Create a special version of RootComponent for the story
@Component({
  selector: 'tgui-pin-story-root',
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 600px;
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
export class PinStoryRootComponent implements OnInit, AfterViewInit, OnDestroy {
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

// Component-wrapper for wrapping story in tgui-root
@Component({
  selector: 'tgui-pin-input-story-wrapper',
  standalone: true,
  imports: [CommonModule, PinStoryRootComponent, RootPortalComponent, PinInputComponent],
  template: `
    <tgui-pin-story-root appearance="light" platform="base" style="height: 600px;">        
      <div style="height: 100%;">
        <tgui-pin-input 
          [label]="label" 
          [pinCount]="pinCount"
          [initialValue]="initialValue"
        ></tgui-pin-input>
      </div>
      <tgui-root-portal></tgui-root-portal>
    </tgui-pin-story-root>
  `
})
class PinInputStoryWrapperComponent implements OnInit, AfterViewInit, OnDestroy {
  label: string = 'Enter your pin';
  pinCount: number = 4;
  initialValue: number[] = [];
  
  constructor(public portalService: PortalService) {}
  
  ngOnInit(): void {}
  
  ngAfterViewInit(): void {}
  
  ngOnDestroy(): void {}
}

const meta: Meta<PinInputStoryWrapperComponent> = {
  title: 'Form/PinInput',
  component: PinInputStoryWrapperComponent,
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
        PinInputComponent, 
        RootRendererComponent, 
        PinStoryRootComponent, 
        RootPortalComponent
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
        PortalService,
        ThemeService,
        PlatformService
      ]
    })
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Text label displayed above the pin input cells',
      defaultValue: 'Enter your pin',
    },
    pinCount: {
      control: { type: 'number', min: 2 },
      description: 'The number of pin input fields to display, with a minimum of 2',
      defaultValue: 4,
    },
    initialValue: {
      control: 'object',
      description: 'The initial pin values to populate the input fields with',
      defaultValue: [],
    },
  }
};

export default meta;
type Story = StoryObj<PinInputStoryWrapperComponent>;

export const Playground: Story = {
  args: {
    label: 'Enter your pin',
    pinCount: 4,
    initialValue: []
  }
}; 