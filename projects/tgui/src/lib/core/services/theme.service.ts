import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy, signal, inject, Renderer2, RendererFactory2 } from '@angular/core';
import { TelegramService } from './telegram.service';

export type AppearanceType = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnDestroy {
  // Signal for appearance that components can subscribe to
  public appearance = signal<AppearanceType>('light');
  private themeChangeListener: (() => void) | null = null;
  private mediaQueryList: MediaQueryList | null = null;
  private handleThemeChange: ((event: MediaQueryListEvent) => void) | null = null;
  private useSystemTheme = false;
  private currentTheme: AppearanceType = 'light';
  private renderer: Renderer2;

  private telegramService = inject(TelegramService);
  private document = inject(DOCUMENT);

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initializeTheme();
  }

  ngOnDestroy(): void {
    this.cleanupListeners();
  }

  /**
   * Change the theme manually
   * @param theme The theme to set
   * @param followSystem If true, will follow system theme changes after setting. Default false.
   */
  public setTheme(theme: AppearanceType, followSystem = false): void {
    console.log(`ThemeService.setTheme called: theme=${theme}, followSystem=${followSystem}`);
    this.cleanupListeners();
    this.appearance.set(theme);
    this.applyThemeToDOM(theme);
    
    // If instructed to follow system theme, restore the detector
    if (followSystem) {
      this.useSystemTheme = true;
      this.setupBrowserThemeDetection();
    } else {
      this.useSystemTheme = false;
    }
  }

  /**
   * Setup theme based on inputs and system preferences
   * @param appearance Appearance to use
   * @param followSystem Whether to follow system theme
   */
  public setupTheme(appearance?: AppearanceType, followSystem: boolean = false): void {
    this.cleanupListeners();
    
    if (followSystem) {
      // Follow system theme
      this.useSystemTheme = true;
      this.setupBrowserThemeDetection();
    } else if (appearance) {
      // Set specific theme
      this.setTheme(appearance, false);
    } else {
      // If nothing specified, try to detect system theme
      this.detectSystemTheme();
    }
  }

  /**
   * Detect and apply system theme
   */
  public detectSystemTheme(): void {
    if (typeof window === 'undefined') {
      // Use light theme by default
      this.setTheme('light', false);
      return;
    }
    
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setTheme(prefersDarkMode ? 'dark' : 'light', false);
  }

  /**
   * Load global CSS variables to make them available for all components
   */
  public loadGlobalStyles(): void {
    // Check if styles are already loaded
    if (this.document.getElementById('tgui-variables-css')) {
      return;
    }
    
    const head = this.document.head;
    const link = this.document.createElement('link');
    
    link.id = 'tgui-variables-css';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    
    // Add error handling
    link.onerror = () => {
      console.error('Failed to load TGUI variables CSS file. Theme functionality may be limited.');
    };
    
    // In production builds, this will be replaced with the actual path
    // The actual file is bundled with the library during build
    link.href = 'assets/tgui/styles/variables.css';
    
    head.appendChild(link);
  }

  /**
   * Initialize the theme detection
   */
  private initializeTheme(): void {
    // First check Telegram API
    const telegramData = this.telegramService.getTelegramData();
    
    if (telegramData) {
      // Use Telegram theme
      this.appearance.set(telegramData.colorScheme);
      this.applyThemeToDOM(telegramData.colorScheme);
      
      // Set up listener for theme changes
      this.themeChangeListener = () => {
        const newTelegramData = this.telegramService.getTelegramData();
        if (newTelegramData) {
          this.appearance.set(newTelegramData.colorScheme);
          this.applyThemeToDOM(newTelegramData.colorScheme);
        }
      };
      
      telegramData.onEvent('themeChanged', this.themeChangeListener);
    } else {
      // Use browser preference
      this.useSystemTheme = true;
      this.setupBrowserThemeDetection();
    }
  }

  /**
   * Setup browser theme detection using prefers-color-scheme
   */
  private setupBrowserThemeDetection(): void {
    if (typeof window === 'undefined') return;
    
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    this.mediaQueryList = isDarkMode;
    
    // Apply theme based on system preference only if following system theme
    if (this.useSystemTheme) {
      const theme: AppearanceType = isDarkMode.matches ? 'dark' : 'light';
      this.appearance.set(theme);
      this.applyThemeToDOM(theme);
    }
    
    // Add listener for theme changes and store reference to the handler
    this.handleThemeChange = (event: MediaQueryListEvent) => {
      if (this.useSystemTheme) {
        const newTheme: AppearanceType = event.matches ? 'dark' : 'light';
        this.appearance.set(newTheme);
        this.applyThemeToDOM(newTheme);
      }
    };
    
    isDarkMode.addEventListener('change', this.handleThemeChange);
    
    // Store reference for cleanup
    this.mediaQueryList = isDarkMode;
  }

  /**
   * Apply theme class to DOM
   */
  private applyThemeToDOM(theme: AppearanceType): void {
    if (theme === this.currentTheme) return;
    
    // Remove existing theme classes
    console.log(`Applying theme to DOM: ${theme}`);
    this.renderer.removeClass(this.document.documentElement, `tgui-theme-${this.currentTheme}`);
    
    // Add the appropriate theme class
    this.renderer.addClass(this.document.documentElement, `tgui-theme-${theme}`);
    
    // Update current theme
    this.currentTheme = theme;
    
    console.log(`Current DOM classes after theme change: ${this.document.documentElement.className}`);
  }

  /**
   * Clean up event listeners
   */
  private cleanupListeners(): void {
    // Clean up Telegram listeners
    const telegramData = this.telegramService.getTelegramData();
    if (telegramData && this.themeChangeListener) {
      telegramData.offEvent('themeChanged', this.themeChangeListener);
      this.themeChangeListener = null;
    }
    
    // Clean up media query listeners using stored reference
    if (this.mediaQueryList && this.handleThemeChange) {
      this.mediaQueryList.removeEventListener('change', this.handleThemeChange);
      this.mediaQueryList = null;
      this.handleThemeChange = null;
    }
  }
} 