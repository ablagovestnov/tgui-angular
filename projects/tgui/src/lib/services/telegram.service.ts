import { Injectable } from '@angular/core';

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
  // Check if DOM is available
  private get canUseDOM(): boolean {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  }

  // Get Telegram WebApp data
  public getTelegramData(): WebApp | undefined {
    if (!this.canUseDOM) {
      return undefined;
    }

    return window.Telegram?.WebApp;
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