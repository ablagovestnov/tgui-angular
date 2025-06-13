import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, AppearanceType } from '../theme.service';
import { ButtonComponent } from '../../components/blocks/button/button.component';

@Component({
  selector: 'tgui-theme-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="theme-demo-container">
      <div class="current-theme">
        <h4>Current theme: {{ currentTheme() }}</h4>
        <div class="theme-icon">
          {{ currentTheme() === 'dark' ? '🌙' : '☀️' }}
        </div>
      </div>

      <div class="buttons-grid">
        <tgui-button 
          mode="filled" 
          size="m"
          (click)="toggleTheme()">
          🔄 Toggle theme
        </tgui-button>

        <tgui-button 
          mode="outline" 
          size="m"
          (click)="setLightTheme()">
          ☀️ Light
        </tgui-button>

        <tgui-button 
          mode="outline" 
          size="m"
          (click)="setDarkTheme()">
          🌙 Dark
        </tgui-button>

        <tgui-button 
          mode="bezeled" 
          size="s"
          (click)="detectSystemTheme()">
          🖥️ System theme
        </tgui-button>
      </div>

      <div class="info-card">
        <p>
          <strong>Appearance signal:</strong> {{ currentTheme() }}
        </p>
        <p class="hint">
          The component automatically updates when the theme changes through Angular signals
        </p>
      </div>
    </div>
  `,
  styles: [`
    .theme-demo-container {
      max-width: 300px;
      margin: 0 auto;
      padding: 1.5rem;
      text-align: center;
    }

    .current-theme {
      margin-bottom: 2rem;
      padding: 1rem;
      background: var(--tgui--secondary_bg_color);
      border-radius: 12px;
      border: 1px solid var(--tgui--outline);
    }

    .current-theme h4 {
      margin: 0 0 0.5rem 0;
      color: var(--tgui--text_color);
      font-size: var(--tgui--title3--font_size);
      text-transform: capitalize;
    }

    .theme-icon {
      font-size: 2rem;
      margin-top: 0.5rem;
    }

    .buttons-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .info-card {
      padding: 1rem;
      background: var(--tgui--bg_color);
      border-radius: 8px;
      border: 1px solid var(--tgui--outline);
      text-align: left;
    }

    .info-card p {
      margin: 0 0 0.5rem 0;
      color: var(--tgui--text_color);
      font-size: var(--tgui--subheadline--font_size);
    }

    .info-card p:last-child {
      margin-bottom: 0;
    }

    .hint {
      color: var(--tgui--hint_color) !important;
      font-size: var(--tgui--caption--font_size) !important;
      line-height: 1.4;
    }

    /* Animations */
    .theme-demo-container {
      transition: all 0.3s ease;
    }

    .current-theme, .info-card {
      transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    .theme-icon {
      transition: transform 0.3s ease;
    }

    .theme-icon:hover {
      transform: scale(1.1);
    }
  `]
})
export class ThemeDemoComponent {
  private themeService = inject(ThemeService);
  
  // Get current theme from service through signal
  currentTheme = this.themeService.appearance;

  toggleTheme(): void {
    console.log(new Date().toISOString(),'toggleTheme');
    const newTheme: AppearanceType = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(newTheme, false);
  }

  setLightTheme(): void {
    this.themeService.setTheme('light', false);
  }

  setDarkTheme(): void {
    this.themeService.setTheme('dark', false);
  }

  detectSystemTheme(): void {
    this.themeService.detectSystemTheme();
  }
} 