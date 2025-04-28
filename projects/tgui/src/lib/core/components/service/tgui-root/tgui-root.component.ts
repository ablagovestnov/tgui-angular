import { Component, Input, OnInit, OnDestroy, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, inject, InjectionToken, OnChanges, SimpleChanges, Renderer2, AfterViewInit } from '@angular/core';
import { ThemeService, AppearanceType } from '@services/theme.service';
import { PlatformService, PlatformType } from '@services/platform.service';
import { PortalService } from '@services/portal.service';
import { DOCUMENT } from '@angular/common';

/**
 * Root component for the TGUI library
 * Provides theming, platform detection, and portal container functionality
 * Should be used at the root of your application
 */
@Component({
  selector: 'tgui-root',
  template: '<ng-content></ng-content>',
  styleUrls: ['./tgui-root.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    'class': 'tgui-root-wrapper'
  }
})
export class TGUIRootComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  /** Application platform, determined automatically if nothing passed */
  @Input() platform?: PlatformType;
  
  /** Application appearance, determined automatically if nothing passed */
  @Input() appearance?: AppearanceType;

  /** Whether to follow system theme changes when appearance is set manually */
  @Input() followSystemTheme?: boolean = false;

  // Внедрение зависимостей через inject
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

  ngOnInit(): void {
    // Apply configuration from inputs or module config
    const platformToUse = this.platform || this.config?.platform;
    const appearanceToUse = this.appearance || this.config?.appearance;
    const followSystem = this.followSystemTheme ?? this.config?.followSystemTheme ?? true;
    
    // Initialize platform
    if (platformToUse) {
      this.platformService.setPlatform(platformToUse);
    }
    
    // Load global CSS variables
    this.themeService.loadGlobalStyles();
    
    // Initialize theme
    this.themeService.setupTheme(appearanceToUse, followSystem);
    
    console.log('TGUIRootComponent initialized');
  }
  
  ngAfterViewInit(): void {
    // Wait for DOM to be ready before setting up portal container
    setTimeout(() => {
      this.setupPortalContainer();
    }, 0);
  }

  private setupPortalContainer(): void {
    console.log('Setting up portal container');
    
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
      console.log('Portal container registered successfully');
    } catch (e) {
      console.error('Error setting up portal container:', e);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Отслеживаем изменения входных свойств
    if (changes['appearance'] || changes['followSystemTheme']) {
      const followSystem = this.followSystemTheme ?? this.config?.followSystemTheme ?? true;
      this.themeService.setupTheme(this.appearance, followSystem);
    }

    if (changes['platform'] && !changes['platform'].firstChange) {
      this.platformService.setPlatform(changes['platform'].currentValue);
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

// Токен для инъекции конфигурации
export const TGUI_CONFIG = new InjectionToken<{
  platform?: PlatformType;
  appearance?: AppearanceType;
  followSystemTheme?: boolean;
}>('TGUI_CONFIG');