import { type Meta, type StoryObj } from '@storybook/angular';
import { Component, inject } from '@angular/core';
import { RootComponent } from '../tgui-root.component';
import { ThemeService, PlatformService } from '../../../../services';

// Demo component to show theme and platform switching
@Component({
  selector: 'tgui-demo-controls',
  standalone: true,
  template: `
    <div style="padding: 20px; display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
      <button 
        (click)="toggleTheme()" 
        style="padding: 8px 16px; border-radius: 8px; border: 1px solid var(--tgui--outline); background: var(--tgui--button_color); color: var(--tgui--button_text_color);">
        Toggle Theme ({{ currentTheme() }})
      </button>
      
      <button 
        (click)="togglePlatform()" 
        style="padding: 8px 16px; border-radius: 8px; border: 1px solid var(--tgui--outline); background: var(--tgui--button_color); color: var(--tgui--button_text_color);">
        Toggle Platform ({{ currentPlatform() }})
      </button>
      
      <div style="color: var(--tgui--text_color); font-size: 14px;">
        Host classes: {{ getHostClasses() }}
      </div>
    </div>
    
    <div style="padding: 20px; background: var(--tgui--secondary_bg_color); border-radius: 12px; margin: 20px; color: var(--tgui--text_color);">
      <h3 style="margin: 0 0 12px 0; color: var(--tgui--text_color);">Demo Content</h3>
      <p style="margin: 0; color: var(--tgui--hint_color);">
        This content adapts to the current theme and platform. 
        The background, text colors, and other CSS variables change automatically.
      </p>
    </div>
  `
})
class DemoControlsComponent {
  private themeService = inject(ThemeService);
  private platformService = inject(PlatformService);
  
  currentTheme = this.themeService.appearance;
  currentPlatform = this.platformService.platform;
  
  toggleTheme(): void {
    const newTheme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(newTheme, false);
  }
  
  togglePlatform(): void {
    const newPlatform = this.currentPlatform() === 'ios' ? 'base' : 'ios';
    this.platformService.setPlatform(newPlatform);
  }
  
  getHostClasses(): string {
    const theme = this.currentTheme();
    const platform = this.currentPlatform();
    return `tgui-theme-${theme}, tgui-platform-${platform}`;
  }
}

const meta: Meta<RootComponent> = {
  title: 'Utils/TGUIRoot',
  component: RootComponent,
  tags: ['autodocs'],
  argTypes: {
    platform: {
      options: ['base', 'ios'],
      control: { type: 'select' },
      description: 'Platform type that affects styling',
    },
    appearance: {
      options: ['light', 'dark'],
      control: { type: 'select' },
      description: 'Theme appearance',
    },
    followSystemTheme: {
      control: 'boolean',
      description: 'Whether to follow system theme changes',
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
The TGUIRoot component is the foundation component for TGUI applications. It:

- Applies theme classes (tgui-theme-light/dark) to enable proper CSS variable cascading
- Applies platform classes (tgui-platform-ios/base) for platform-specific styling  
- Provides a portal container for overlays and modals
- Automatically detects system theme and platform if not specified
- Uses Angular Signals for reactive updates

**Key improvements in this version:**
- Host classes are now properly applied based on current theme and platform
- Converted from @Input() to signal-based inputs for better reactivity
- Uses computed() for host class calculation
- Effects handle input changes automatically
- Added background-color using --tgui--bg_color for proper theming
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<RootComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tgui-root [platform]="platform" [appearance]="appearance" [followSystemTheme]="followSystemTheme">
        <tgui-demo-controls></tgui-demo-controls>
      </tgui-root>
    `,
    moduleMetadata: {
      imports: [DemoControlsComponent]
    }
  }),
  args: {}
};

export const LightTheme: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tgui-root [platform]="platform" [appearance]="appearance" [followSystemTheme]="followSystemTheme">
        <tgui-demo-controls></tgui-demo-controls>
      </tgui-root>
    `,
    moduleMetadata: {
      imports: [DemoControlsComponent]
    }
  }),
  args: {
    appearance: 'light'
  }
};

export const DarkTheme: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tgui-root [platform]="platform" [appearance]="appearance" [followSystemTheme]="followSystemTheme">
        <tgui-demo-controls></tgui-demo-controls>
      </tgui-root>
    `,
    moduleMetadata: {
      imports: [DemoControlsComponent]
    }
  }),
  args: {
    appearance: 'dark'
  }
};

export const IOSPlatform: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tgui-root [platform]="platform" [appearance]="appearance" [followSystemTheme]="followSystemTheme">
        <tgui-demo-controls></tgui-demo-controls>
      </tgui-root>
    `,
    moduleMetadata: {
      imports: [DemoControlsComponent]
    }
  }),
  args: {
    platform: 'ios'
  }
};

export const BasePlatform: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tgui-root [platform]="platform" [appearance]="appearance" [followSystemTheme]="followSystemTheme">
        <tgui-demo-controls></tgui-demo-controls>
      </tgui-root>
    `,
    moduleMetadata: {
      imports: [DemoControlsComponent]
    }
  }),
  args: {
    platform: 'base'
  }
};

export const DarkiOS: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tgui-root [platform]="platform" [appearance]="appearance" [followSystemTheme]="followSystemTheme">
        <tgui-demo-controls></tgui-demo-controls>
      </tgui-root>
    `,
    moduleMetadata: {
      imports: [DemoControlsComponent]
    }
  }),
  args: {
    platform: 'ios',
    appearance: 'dark'
  }
}; 