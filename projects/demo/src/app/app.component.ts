import { Component } from '@angular/core';
import { AppearanceType } from '../../../tgui/src/lib/services/theme.service';
import { PlatformType } from '../../../tgui/src/lib/services/platform.service';
import { RootComponent } from '../../../tgui/src/lib/components/utils/tgui-root/tgui-root.component';
import { ButtonComponent } from '../../../tgui/src/lib/components/blocks/button/button.component';

@Component({
  selector: 'app-root',
  template: `
    <tgui-root [appearance]="currentTheme" [platform]="currentPlatform">
      <div class="container">
        <h1>TGUI Demo</h1>
        
        <div class="theme-controls">
          <div class="control-group">
            <label>Тема:</label>
            <div>
              <button (click)="setTheme('light')" [class.active]="currentTheme === 'light'">Светлая</button>
              <button (click)="setTheme('dark')" [class.active]="currentTheme === 'dark'">Темная</button>
            </div>
          </div>
          
          <div class="control-group">
            <label>Платформа:</label>
            <div>
              <button (click)="setPlatform('base')" [class.active]="currentPlatform === 'base'">Base</button>
              <button (click)="setPlatform('ios')" [class.active]="currentPlatform === 'ios'">iOS</button>
            </div>
          </div>
        </div>
        
        <section>
          <h2>Кнопки</h2>
          
          <div class="button-showcase">
            <h3>Основные стили</h3>
            <div class="button-row">
              <tgui-button mode="filled">Filled</tgui-button>
              <tgui-button mode="bezeled">Bezeled</tgui-button>
              <tgui-button mode="plain">Plain</tgui-button>
              <tgui-button mode="gray">Gray</tgui-button>
              <tgui-button mode="outline">Outline</tgui-button>
              <tgui-button mode="white">White</tgui-button>
            </div>
            
            <h3>Размеры</h3>
            <div class="button-row">
              <tgui-button size="s">Small</tgui-button>
              <tgui-button size="m">Medium</tgui-button>
              <tgui-button size="l">Large</tgui-button>
            </div>
            
            <h3>Состояния</h3>
            <div class="button-row">
              <tgui-button [loading]="true">Loading</tgui-button>
              <tgui-button [disabled]="true">Disabled</tgui-button>
              <tgui-button [stretched]="true">Stretched</tgui-button>
            </div>
          </div>
        </section>
      </div>
    </tgui-root>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1000px;
      margin: 0 auto;
    }
    
    h1, h2, h3 {
      margin-bottom: 16px;
    }
    
    .theme-controls {
      display: flex;
      gap: 20px;
      margin-bottom: 32px;
      background: var(--tgui--bg_color);
      padding: 16px;
      border-radius: 12px;
    }
    
    .control-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .control-group > div {
      display: flex;
      gap: 8px;
    }
    
    button {
      padding: 8px 12px;
      border: 1px solid #ccc;
      background: #f5f5f5;
      border-radius: 6px;
      cursor: pointer;
    }
    
    button.active {
      background: #007bff;
      color: white;
      border-color: #0069d9;
    }
    
    section {
      margin-bottom: 32px;
      background: var(--tgui--bg_color);
      padding: 20px;
      border-radius: 12px;
    }
    
    .button-showcase {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    
    .button-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
    }
  `],
  imports: [RootComponent, ButtonComponent],
  standalone: true
})
export class AppComponent {
  currentTheme: AppearanceType = 'light';
  currentPlatform: PlatformType = 'base';
  
  setTheme(theme: AppearanceType): void {
    this.currentTheme = theme;
  }
  
  setPlatform(platform: PlatformType): void {
    this.currentPlatform = platform;
  }
} 