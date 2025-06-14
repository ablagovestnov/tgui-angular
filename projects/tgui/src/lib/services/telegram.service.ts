import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Define Telegram WebApp interface
interface ThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
  header_bg_color?: string;
  accent_text_color?: string;
  section_bg_color?: string;
  section_header_text_color?: string;
  subtitle_text_color?: string;
  destructive_text_color?: string;
}

interface WebApp {
  colorScheme: 'light' | 'dark';
  themeParams: ThemeParams;
  onEvent(eventName: string, eventHandler: () => void): void;
  offEvent(eventName: string, eventHandler: () => void): void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: WebApp;
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  private ready = new BehaviorSubject<boolean>(false);
  private initializationTimeout: number | null = null;

  constructor() {
    this.waitForTelegramWebApp();
  }

  // Check if DOM is available
  private get canUseDOM(): boolean {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  }

  // Get Telegram WebApp data
  public getTelegramData(): WebApp | undefined {
    if (!this.canUseDOM) {
      return undefined;
    }

    const webApp = window.Telegram?.WebApp;
    return webApp;
  }

  // Wait for Telegram WebApp to be available
  private waitForTelegramWebApp(maxAttempts = 50): void {
    let attempts = 0;
    
    const checkWebApp = () => {
      const webApp = this.getTelegramData();
      
      if (webApp) {
        this.ready.next(true);
        if (this.initializationTimeout !== null) {
          window.clearTimeout(this.initializationTimeout);
          this.initializationTimeout = null;
        }
      } else if (attempts < maxAttempts) {
        attempts++;
        this.initializationTimeout = window.setTimeout(checkWebApp, 100);
      } else {
        console.warn('TelegramService: Failed to initialize WebApp after', maxAttempts, 'attempts');
        this.ready.next(false);
      }
    };

    checkWebApp();
  }

  // Get ready state as observable
  public get isReady$(): Observable<boolean> {
    return this.ready.asObservable();
  }

  // Get current ready state
  public get isReady(): boolean {
    return this.ready.value;
  }

  // Helper function to convert hex color to RGB
  public hexToRGB(hex: string): [number, number, number] {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return [r, g, b];
  }
} 