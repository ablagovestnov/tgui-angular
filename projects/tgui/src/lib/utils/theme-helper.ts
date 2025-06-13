/**
 * Helper functions for managing TGUI themes
 */

import { Injectable, OnDestroy, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppearanceType } from '../services/theme.service';

/**
 * Apply the specified theme by adding the appropriate CSS class to the document's root element
 * @param theme The theme to apply ('light' or 'dark')
 */
export function applyTheme(theme: AppearanceType): void {
  // Remove existing theme classes
  document.documentElement.classList.remove('tgui-theme-light', 'tgui-theme-dark');
  
  // Add the appropriate theme class
  document.documentElement.classList.add(`tgui-theme-${theme}`);
}

/**
 * Setup system theme detection using prefers-color-scheme
 * @param callback Optional callback function that will be called when the theme changes
 * @returns A function to cleanup the listeners
 */
export function setupSystemThemeDetection(callback?: (theme: AppearanceType) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Apply initial theme based on system preference
  const initialTheme: AppearanceType = isDarkMode.matches ? 'dark' : 'light';
  applyTheme(initialTheme);
  callback?.(initialTheme);
  
  // Add listener for theme changes
  const handleThemeChange = (event: MediaQueryListEvent) => {
    const newTheme: AppearanceType = event.matches ? 'dark' : 'light';
    applyTheme(newTheme);
    callback?.(newTheme);
  };
  
  isDarkMode.addEventListener('change', handleThemeChange);
  
  // Return cleanup function
  return () => {
    isDarkMode.removeEventListener('change', handleThemeChange);
  };
}

/**
 * Angular service for using system themes
 * Uses signals to track theme changes
 */
@Injectable({
  providedIn: 'root'
})
export class SystemThemeService implements OnDestroy {
  // Signal for theme with initial value
  private readonly themeSignal = signal<AppearanceType>(this.getInitialTheme());
  
  // Public readonly signal for theme access
  public readonly theme = this.themeSignal.asReadonly();
  
  private cleanup: (() => void) | null = null;
  
  constructor() {
    this.setupThemeDetection();
  }
  
  // Set theme manually
  setTheme(theme: AppearanceType): void {
    this.themeSignal.set(theme);
    applyTheme(theme);
  }
  
  // Enable system theme tracking
  enableSystemTheme(): void {
    this.cleanup && this.cleanup();
    this.setupThemeDetection();
  }
  
  // Disable system theme tracking
  disableSystemTheme(): void {
    this.cleanup && this.cleanup();
    this.cleanup = null;
  }
  
  ngOnDestroy(): void {
    this.cleanup && this.cleanup();
  }
  
  private getInitialTheme(): AppearanceType {
    if (typeof window === 'undefined') return 'light';
    
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    return isDarkMode.matches ? 'dark' : 'light';
  }
  
  private setupThemeDetection(): void {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme
    const initialTheme: AppearanceType = mediaQuery.matches ? 'dark' : 'light';
    this.themeSignal.set(initialTheme);
    applyTheme(initialTheme);
    
    // Create media query change event handler
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      const newTheme: AppearanceType = event.matches ? 'dark' : 'light';
      this.themeSignal.set(newTheme);
      applyTheme(newTheme);
    };
    
    // Add event listener
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    
    // Cleanup function
    this.cleanup = () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }
} 