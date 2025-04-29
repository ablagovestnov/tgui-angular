/**
 * Helper functions for managing TGUI themes
 */

import { Injectable, OnDestroy, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppearanceType } from '@services/theme.service';

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
 * Angular service для использования системных тем
 * Использует сигналы для отслеживания изменений темы
 */
@Injectable({
  providedIn: 'root'
})
export class SystemThemeService implements OnDestroy {
  // Signal для темы с начальным значением
  private readonly themeSignal = signal<AppearanceType>(this.getInitialTheme());
  
  // Публичный readonly signal для доступа к теме
  public readonly theme = this.themeSignal.asReadonly();
  
  private cleanup: (() => void) | null = null;
  
  constructor() {
    this.setupThemeDetection();
  }
  
  // Устанавливаем тему вручную
  setTheme(theme: AppearanceType): void {
    this.themeSignal.set(theme);
    applyTheme(theme);
  }
  
  // Включаем отслеживание системной темы
  enableSystemTheme(): void {
    this.cleanup && this.cleanup();
    this.setupThemeDetection();
  }
  
  // Отключаем отслеживание системной темы
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
    
    // Устанавливаем начальную тему
    const initialTheme: AppearanceType = mediaQuery.matches ? 'dark' : 'light';
    this.themeSignal.set(initialTheme);
    applyTheme(initialTheme);
    
    // Создаем обработчик события изменения медиа-запроса
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      const newTheme: AppearanceType = event.matches ? 'dark' : 'light';
      this.themeSignal.set(newTheme);
      applyTheme(newTheme);
    };
    
    // Добавляем слушатель события
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    
    // Функция очистки
    this.cleanup = () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }
} 