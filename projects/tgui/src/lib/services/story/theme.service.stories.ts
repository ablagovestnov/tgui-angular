import { type Meta, type StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { inject } from '@angular/core';
import { ThemeSwitchComponent } from './theme-switch.component';
import { ThemeDemoComponent } from './theme-demo.component';
import { ButtonComponent } from '../../components/blocks/button/button.component';
import { ThemeService } from '../theme.service';
import { TelegramService } from '../telegram.service';
import { PlatformService } from '../platform.service';
import { PortalService } from '../portal.service';

const meta: Meta<ThemeSwitchComponent> = {
  title: 'Services/ThemeService',
  component: ThemeSwitchComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ThemeSwitchComponent, ThemeDemoComponent, ButtonComponent],
      providers: [
        ThemeService,
        TelegramService,
        PlatformService,
        PortalService
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
# ThemeService

ThemeService provides application theme management with support for:

- **Manual theme switching**: light and dark theme
- **Automatic system theme detection**: via \`prefers-color-scheme\`
- **Telegram WebApp integration**: automatic use of Telegram theme
- **Reactivity**: components automatically update when theme changes

## Main methods:

- \`setTheme(theme, followSystem)\` - set specific theme
- \`setupTheme(appearance?, followSystem?)\` - configure theme with options
- \`detectSystemTheme()\` - detect and apply system theme
- \`loadGlobalStyles()\` - load global CSS variables

## Signals:

- \`appearance\` - current theme ('light' | 'dark')

## Usage example:

\`\`\`typescript
@Component({
  template: \`
    <div>Current theme: {{ themeService.appearance() }}</div>
    <button (click)="toggleTheme()">Toggle theme</button>
  \`
})
export class MyComponent {
  themeService = inject(ThemeService);
  
  toggleTheme() {
    const newTheme = this.themeService.appearance() === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(newTheme);
  }
}
\`\`\`
        `,
      },
    },
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<ThemeSwitchComponent>;

/**
 * ThemeService demonstration through buttons.
 * Complete example of theme management with multiple buttons and current theme indicator.
 */
export const ButtonDemo: Story = {
  render: () => ({
    template: `<tgui-theme-demo></tgui-theme-demo>`,
  }),
  parameters: {
    docs: {
      description: {
        story: `
Demonstration of all ThemeService capabilities through interactive buttons.

This example shows:
- **Theme switching** - between light and dark
- **Direct theme setting** - light or dark
- **System theme detection** - automatic OS theme application
- **Signal reactivity** - UI updates automatically

The component uses the \`themeService.appearance\` signal to display the current theme and automatically update the interface when it changes.

**Main ThemeService methods:**
\`\`\`typescript
// Toggle between themes
toggleTheme() {
  const newTheme = this.currentTheme() === 'light' ? 'dark' : 'light';
  this.themeService.setTheme(newTheme, false);
}

// Set specific theme
setLightTheme() {
  this.themeService.setTheme('light', false);
}

// Detect system theme
detectSystemTheme() {
  this.themeService.detectSystemTheme();
}
\`\`\`
        `,
      },
    },
  },
};

/**
 * Theme switch with switch component.
 * Elegant cell-style toggle with description.
 */
export const SwitchDemo: Story = {
  render: () => ({
    template: `<tgui-theme-switch></tgui-theme-switch>`,
  }),
  parameters: {
    docs: {
      description: {
        story: `
ThemeService demonstration through a cell toggle switch.

This example shows:
- **Cell toggle switch** - beautiful UI with description
- **State synchronization** - switch reflects current theme
- **Automatic updates** - UI reacts to theme changes
- **Icon usage** - visual theme indicators

The component uses \`tgui-cell\` to create a beautiful toggle with description and \`tgui-switch\` for toggle functionality.
        `,
      },
    },
  },
};