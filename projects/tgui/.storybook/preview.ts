import type { Preview } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";

// Import your root component
import { RootComponent, TGUI_CONFIG } from '../src/lib/components/utils/tgui-root/tgui-root.component'; 
import { CommonModule } from '@angular/common'; // often needed for general context

// Import necessary services
import { ThemeService, PlatformService, PortalService } from '../src/lib/services';
import { TelegramService } from '../src/lib/services/telegram.service';

// Add RootPortalComponent import
import { RootPortalComponent } from '../src/lib/components/utils/portal/root-portal.component';

setCompodocJson(docJson);

const preview: Preview = {
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RootComponent, RootPortalComponent],
      providers: [
        ThemeService, 
        PlatformService, 
        PortalService,
        TelegramService,
        {
          provide: TGUI_CONFIG,
          useValue: {
            platform: 'base',
            appearance: 'light',
            followSystemTheme: false
          }
        },
      ],
    }),
    
    componentWrapperDecorator(
      story => `<tgui-root [appearance]="appearance" [platform]="platform">
        <div style="background-color: var(--tgui--bg_color); padding: 3rem;">${story}</div>
        <tgui-root-portal></tgui-root-portal>
      </tgui-root>`,
      ({globals: {theme, platform}}) => ({
        appearance: theme,
        platform: platform
      })
    )
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
globalTypes: {
    platform: {
      name: 'Platform',
      description: 'Platform for components',
      defaultValue: 'base',
      toolbar: {
        icon: 'mobile',
        items: ['base', 'ios'],
        title: 'Platform',
        dynamicTitle: true,
      },
    },
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;