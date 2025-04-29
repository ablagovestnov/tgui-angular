import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, signal, inject } from '@angular/core';
import { TelegramService } from './telegram.service';

export type PlatformType = 'base' | 'ios';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  // Signal for platform that components can subscribe to
  public platform = signal<PlatformType>('base');
  
  // Cached value for checking iOS platform
  private _isIOSPlatform: boolean | null = null;

  private document = inject(DOCUMENT);

  constructor() {
    this.detectPlatform();
  }

  /**
   * Set platform manually
   */
  public setPlatform(platform: PlatformType): void {
    this.platform.set(platform);
    this.applyPlatformToDOM(platform);
    // Update cached value
    this._isIOSPlatform = platform === 'ios';
  }
  
  /**
   * Checks if current platform is iOS
   * Uses DOM class to determine platform, caches result for better performance
   */
  public isIOS(): boolean {
    // If value is already cached, return it
    if (this._isIOSPlatform !== null) {
      return this._isIOSPlatform;
    }
    
    // Otherwise check for iOS class in DOM
    if (this.document && this.document.documentElement) {
      this._isIOSPlatform = this.document.documentElement.classList.contains('tgui-platform-ios');
      return this._isIOSPlatform;
    }
    
    // If unable to determine, return false
    return false;
  }

  /**
   * Detect platform based on user agent
   */
  private detectPlatform(): void {
    const isIOS = this.detectIOSFromUserAgent();
    const detectedPlatform: PlatformType = isIOS ? 'ios' : 'base';
    
    this.platform.set(detectedPlatform);
    this.applyPlatformToDOM(detectedPlatform);
    // Cache result
    this._isIOSPlatform = isIOS;
  }

  /**
   * Apply platform class to DOM
   */
  private applyPlatformToDOM(platform: PlatformType): void {
    // Remove existing platform classes
    this.document.documentElement.classList.remove('tgui-platform-base', 'tgui-platform-ios');
    
    // Add the appropriate platform class
    this.document.documentElement.classList.add(`tgui-platform-${platform}`);
  }

  /**
   * Check if the device is iOS based on user agent
   */
  private detectIOSFromUserAgent(): boolean {
    if (typeof window === 'undefined' || !window.navigator) {
      return false;
    }

    const userAgent = window.navigator.userAgent.toLowerCase();
    
    return /iphone|ipad|ipod/.test(userAgent) || 
           (userAgent.includes('mac') && 'ontouchend' in document);
  }
} 