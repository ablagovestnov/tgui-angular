import { Component, OnInit, OnDestroy, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, inject, InjectionToken, Renderer2, AfterViewInit, input, computed, effect } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { PortalService, PlatformService, ThemeService, PlatformType, AppearanceType  } from '../../../services';

/**
 * Root component for the TGUI library
 * Provides theming, platform detection, and portal container functionality
 * Should be used at the root of your application
 */
@Component({
  selector: 'tgui-root',
  template: '<ng-content></ng-content>',
  styleUrls: ['./tgui-root.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'tgui-root-wrapper',
    '[class.tgui-theme-light]': 'hostClasses().themeLight',
    '[class.tgui-theme-dark]': 'hostClasses().themeDark',
    '[class.tgui-platform-ios]': 'hostClasses().platformIos',
    '[class.tgui-platform-base]': 'hostClasses().platformBase'
  }
})
export class RootComponent implements OnInit, OnDestroy, AfterViewInit {
  /** Application platform, determined automatically if nothing passed */
  platform = input<PlatformType>();
  
  /** Application appearance, determined automatically if nothing passed */
  appearance = input<AppearanceType>();

  /** Whether to follow system theme changes when appearance is set manually */
  followSystemTheme = input<boolean>(false);

  // Dependency injection through inject
  private platformService = inject(PlatformService);
  private portalService = inject(PortalService);
  private elementRef = inject(ElementRef<HTMLElement>);
  private themeService = inject(ThemeService);
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  private config = inject(TGUI_CONFIG, { optional: true }) as { 
    platform?: PlatformType;
    appearance?: AppearanceType;
    followSystemTheme?: boolean;
  } | null;

  private portalContainerEl: HTMLDivElement | null = null;

  // Computed host classes based on current theme and platform
  hostClasses = computed(() => {
    const currentTheme = this.themeService.appearance();
    const currentPlatform = this.platformService.platform();
    
    return {
      themeLight: currentTheme === 'light',
      themeDark: currentTheme === 'dark',
      platformIos: currentPlatform === 'ios',
      platformBase: currentPlatform === 'base'
    };
  });

  constructor() {
    // Effect to handle platform changes
    effect(() => {
      const platformToUse = this.platform() || this.config?.platform;
      if (platformToUse) {
        this.platformService.setPlatform(platformToUse);
      }
    });

    // Effect to handle theme changes
    effect(() => {
      const appearanceToUse = this.appearance() || this.config?.appearance;
      const followSystem = this.followSystemTheme() ?? this.config?.followSystemTheme ?? true;
      this.themeService.setupTheme(appearanceToUse, followSystem);
    });
  }

  ngOnInit(): void {
    // Load global CSS variables
    this.themeService.loadGlobalStyles();
  }
  
  ngAfterViewInit(): void {
    // Wait for DOM to be ready before setting up portal container
    setTimeout(() => {
      this.setupPortalContainer();
    }, 0);
  }

  private setupPortalContainer(): void {
    try {
      // Create a dedicated div for portal content if it doesn't exist
      if (!this.portalContainerEl) {
        this.portalContainerEl = this.document.createElement('div');
        this.portalContainerEl.className = 'tgui-portal-container';
        this.renderer.appendChild(this.elementRef.nativeElement, this.portalContainerEl);
      }
      
      // Create an ElementRef wrapping the portal container div
      const portalElementRef = new ElementRef(this.portalContainerEl);
      
      // Register as portal container
      this.portalService.setPortalContainer(portalElementRef);
    } catch (e) {
      console.error('Error setting up portal container:', e);
    }
  }

  ngOnDestroy(): void {
    // Clean up portal container reference
    this.portalService.clearPortalContainer();
    
    // Remove the portal container element if it exists
    if (this.portalContainerEl && this.portalContainerEl.parentNode) {
      this.portalContainerEl.parentNode.removeChild(this.portalContainerEl);
    }
    
    console.log('TGUIRootComponent destroyed');
  }
}

// Token for configuration injection
export const TGUI_CONFIG = new InjectionToken<{
  platform?: PlatformType;
  appearance?: AppearanceType;
  followSystemTheme?: boolean;
}>('TGUI_CONFIG');