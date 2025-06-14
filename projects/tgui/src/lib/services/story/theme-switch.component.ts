import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, AppearanceType } from '../theme.service';
import { SwitchComponent } from '../../components/form/switch/switch.component';
import { CellComponent } from '../../components/blocks/cell/cell.component';

@Component({
  selector: 'tgui-theme-switch',
  standalone: true,
  imports: [CommonModule, SwitchComponent, CellComponent],
  template: `
    <div class="theme-switch-container">
      <div class="header">
        <h3>Theme Switch</h3>
        <p>Current theme: <span class="theme-indicator">{{ currentTheme() }}</span></p>
      </div>

      <div class="theme-switch-container">
        <tgui-switch 
          [checked]="isDarkTheme()"
          (change)="onSwitchStandaloneChange($event)">
        </tgui-switch>
      </div>

      <!-- Switch in cell for better UX -->
      <tgui-cell
        description="Switch between light and dark theme"
        [multiline]="true"
        [afterTemplate]="switchTemplate">
        {{ currentTheme() === 'dark' ? '🌙 Dark theme' : '☀️ Light theme' }}
      </tgui-cell>

      <ng-template #switchTemplate>
        <tgui-switch 
          [checked]="isDarkTheme()"
          (change)="onSwitchChange($event)">
        </tgui-switch>
      </ng-template>

      <!-- Additional information -->
      <div class="info">
        <p class="hint">
          The switch automatically synchronizes with the current application theme.
          Click the switch to change the theme.
        </p>
      </div>
    </div>
  `,
  styles: [`
    .theme-switch-container {
      max-width: 400px;
      margin: 0 auto;
    }

    .header {
      text-align: center;
      margin-bottom: 1.5rem;
      padding: 1rem;
      background: var(--tgui--secondary_bg_color);
      border-radius: 12px;
      border: 1px solid var(--tgui--outline);
    }

    .header h3 {
      margin: 0 0 0.5rem 0;
      color: var(--tgui--text_color);
      font-size: var(--tgui--title3--font_size);
      font-weight: var(--tgui--font_weight--accent);
    }

    .header p {
      margin: 0;
      color: var(--tgui--hint_color);
      font-size: var(--tgui--subheadline--font_size);
    }

    .theme-indicator {
      color: var(--tgui--link_color);
      font-weight: var(--tgui--font_weight--accent);
      text-transform: capitalize;
    }

    .info {
      margin-top: 1.5rem;
      padding: 1rem;
      background: var(--tgui--bg_color);
      border-radius: 8px;
      border: 1px solid var(--tgui--outline);
    }

    .hint {
      margin: 0;
      color: var(--tgui--hint_color);
      font-size: var(--tgui--caption--font_size);
      text-align: center;
      line-height: 1.4;
    }

    /* Animation transitions */
    .theme-switch-container {
      transition: all 0.3s ease;
    }

    .header, .info {
      transition: background-color 0.3s ease, border-color 0.3s ease;
    }
  `]
})
export class ThemeSwitchComponent {
  private themeService = inject(ThemeService);
  
  // Get current theme from service
  currentTheme = this.themeService.appearance;

  isDarkTheme(): boolean {
    return this.currentTheme() === 'dark';
  }

  toggleTheme(): void {
    const newTheme: AppearanceType = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(newTheme, false);
  }

  onSwitchChange(event: Event): void {
    
    // Toggle theme when switch changes
    this.toggleTheme();
  }

  onSwitchStandaloneChange(event: Event): void {    
    // Toggle theme when switch changes
    this.toggleTheme();
  }

} 