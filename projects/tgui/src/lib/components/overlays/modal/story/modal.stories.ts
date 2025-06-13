import { Meta, StoryObj, moduleMetadata, applicationConfig } from '@storybook/angular';
import { Component, ElementRef, ViewChild, signal, OnInit, OnDestroy, AfterViewInit, importProvidersFrom, ChangeDetectionStrategy, ViewEncapsulation, inject, Renderer2, Input, input } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

import { ModalComponent } from '../modal.component';
import { ModalHeaderComponent } from '../modal-header.component';
import { ModalCloseComponent } from '../modal-close.component';
import { ModalOverlayComponent } from '../modal-overlay.component';
import { ButtonComponent } from '../../../blocks/button/button.component';
import { PlaceholderComponent } from '../../../blocks/placeholder/placeholder.component';

// Imports for root components
import { RootComponent as BaseRootComponent } from '../../../utils/tgui-root/tgui-root.component';
import { RootPortalComponent } from '../../../utils/portal/root-portal.component';
import { RootRendererComponent } from '../../../utils/root-renderer/root-renderer.component';
import { PortalService, ThemeService, PlatformService, PlatformType, AppearanceType } from '../../../../services';

// Create a special version of RootComponent for stories
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
    
    // Immediately set up portal container
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
      
      // Create ElementRef and register in service
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
  selector: 'tgui-modal-demo',
  standalone: true,
  imports: [CommonModule, ModalComponent, ModalHeaderComponent, ModalCloseComponent, ButtonComponent, PlaceholderComponent],
  template: `
    <div class="modal-demo-container">
      <div class="instructions">
        <p>Click the button to open modal</p>
      </div>
      
      <tgui-button 
        mode="filled" 
        size="m"
        (click)="openModal()"
      >
        Open Modal
      </tgui-button>
      
      <tgui-modal 
        [open]="isOpen()"
        (openChange)="onOpenChange($event)"
        [closeThreshold]="closeThreshold"
        [scrollLockTimeout]="scrollLockTimeout"
        [modal]="modal"
        [preventScrollRestoration]="preventScrollRestoration"
        [dismissible]="dismissible"
        [snapPoints]="snapPoints"
      >
        <!-- Header -->
        <tgui-modal-header *ngIf="showHeader">
          {{ headerText }}
          <tgui-modal-close *ngIf="showCloseButton" slot="after">
            ✕
          </tgui-modal-close>
        </tgui-modal-header>

        <!-- Modal Content -->
        <tgui-placeholder
          header="Modal Content"
          description="This is a modal dialog with customizable content and behavior."
        >
          <img
            alt="Telegram sticker"
            src="https://xelene.me/telegram.gif"
            style="display: block; width: 144px; height: 144px; margin: 16px auto;"
          />
          
          <div style="margin-top: 16px;">
            <tgui-button size="m" mode="filled" (click)="closeModal()">
              Close Modal
            </tgui-button>
          </div>
        </tgui-placeholder>
      </tgui-modal>
    </div>
  `,
  styles: [`
    .modal-demo-container {
      position: relative;
      height: 400px;
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
    
    .instructions p {
      margin: 0;
      font-family: var(--tgui--font-family);
      color: var(--tgui--text_color);
    }
  `]
})
class ModalDemoComponent implements OnInit, AfterViewInit, OnDestroy {
  // Story inputs
  closeThreshold = input<number>(0.5);
  scrollLockTimeout = input<number>(500);
  modal = input<boolean>(true);
  preventScrollRestoration = input<boolean>(true);
  dismissible = input<boolean>(true);
  snapPoints = input<(number | string)[]>([]);
  showHeader = input<boolean>(true);
  showCloseButton = input<boolean>(false);
  headerText = input<string>('Modal Header');
  
  // State for modal visibility
  private _isOpen = signal<boolean>(false);
  isOpen = this._isOpen.asReadonly();
  
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}
  
  openModal(): void {
    this._isOpen.set(true);
  }
  
  closeModal(): void {
    this._isOpen.set(false);
  }
  
  onOpenChange(open: boolean): void {
    this._isOpen.set(open);
  }
}

// Wrapper component for wrapping story in tgui-root
@Component({
  selector: 'tgui-modal-story-wrapper',
  standalone: true,
  imports: [CommonModule, StoryRootComponent, RootPortalComponent, ModalDemoComponent],
  template: `
    <tgui-story-root [appearance]="appearance" platform="base">
      <div style="background-color: var(--tgui--bg_color); padding: 3rem; min-height: 100vh;">
        <!-- Debug information -->
        <div class="debug-info" style="margin-bottom: 1rem; padding: 0.5rem; border: 1px dashed #ccc; font-size: 12px;">
          <div>🔍 Portal container status: {{ portalService.hasPortalContainer() ? 'Available ✅' : 'Not Available ❌' }}</div>
          <div>🔍 Modal wrapper component initialized</div>
        </div>
        
        <tgui-modal-demo
          [closeThreshold]="closeThreshold"
          [scrollLockTimeout]="scrollLockTimeout"
          [modal]="modal"
          [preventScrollRestoration]="preventScrollRestoration"
          [dismissible]="dismissible"
          [snapPoints]="snapPoints"
          [showHeader]="showHeader"
          [showCloseButton]="showCloseButton"
          [headerText]="headerText"
        ></tgui-modal-demo>
      </div>
      <tgui-root-portal></tgui-root-portal>
    </tgui-story-root>
  `
})
class ModalStoryWrapperComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() closeThreshold: number = 0.5;
  @Input() scrollLockTimeout: number = 500;
  @Input() modal: boolean = true;
  @Input() preventScrollRestoration: boolean = true;
  @Input() dismissible: boolean = true;
  @Input() snapPoints: (number | string)[] = [];
  @Input() showHeader: boolean = true;
  @Input() showCloseButton: boolean = false;
  @Input() headerText: string = 'Modal Header';
  @Input() theme: 'light' | 'dark' = 'light';
  
  constructor(public portalService: PortalService) {}
  
  get appearance(): AppearanceType {
    return this.theme === 'dark' ? 'dark' : 'light';
  }
  
  ngOnInit(): void {}
  
  ngAfterViewInit(): void {}
  
  ngOnDestroy(): void {}
}

const meta: Meta<ModalStoryWrapperComponent> = {
  title: 'Overlays/Modal',
  component: ModalStoryWrapperComponent,
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
        ModalComponent,
        ModalHeaderComponent,
        ModalCloseComponent,
        ModalOverlayComponent,
        ButtonComponent,
        PlaceholderComponent,
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
    theme: {
      options: ['light', 'dark'],
      control: { type: 'select' },
      description: 'Theme of the modal',
      defaultValue: 'light',
    },
    closeThreshold: {
      control: { type: 'range', min: 0.1, max: 1, step: 0.1 },
      description: 'Threshold for swipe-to-close gesture',
      defaultValue: 0.5,
    },
    scrollLockTimeout: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'Timeout after scrolling before swipe gestures are enabled',
      defaultValue: 500,
    },
    modal: {
      control: 'boolean',
      description: 'Whether to block interaction with background',
      defaultValue: true,
    },
    preventScrollRestoration: {
      control: 'boolean',
      description: 'Prevent scroll restoration when modal closes',
      defaultValue: true,
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the modal can be dismissed by user interaction',
      defaultValue: true,
    },
    showHeader: {
      control: 'boolean',
      description: 'Show modal header',
      defaultValue: true,
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button in header',
      defaultValue: false,
    },
    headerText: {
      control: 'text',
      description: 'Header text content',
      defaultValue: 'Modal Header',
    },
    snapPoints: {
      control: 'object',
      description: 'Snap points for modal positioning (array of numbers between 0 and 1)',
      defaultValue: [],
    }
  }
};

export default meta;

type Story = StoryObj<ModalStoryWrapperComponent>;

export const Default: Story = {
  args: {
    theme: 'light',
    closeThreshold: 0.5,
    scrollLockTimeout: 500,
    modal: true,
    preventScrollRestoration: true,
    dismissible: true,
    showHeader: true,
    showCloseButton: false,
    headerText: 'Modal Header',
    snapPoints: []
  }
};

export const Dark: Story = {
  args: {
    ...Default.args,
    theme: 'dark'
  }
};

export const WithCloseButton: Story = {
  args: {
    ...Default.args,
    showCloseButton: true,
    headerText: 'Modal with Close Button'
  }
};

export const NotDismissible: Story = {
  args: {
    ...Default.args,
    dismissible: false,
    headerText: 'Non-dismissible Modal'
  }
};

export const WithSnapPoints: Story = {
  args: {
    ...Default.args,
    snapPoints: [0.33, 0.66, 1],
    headerText: 'Modal with Snap Points'
  }
};

export const NoHeader: Story = {
  args: {
    ...Default.args,
    showHeader: false
  }
}; 