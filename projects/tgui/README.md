# Telegram UI for Angular

A comprehensive UI kit for building Telegram Web Apps using Angular 19+.

## Installation

```bash
npm install @telegram-apps/tgui-angular
```

## Basic Setup

To use the TGUI library in your Angular application:

### Standalone Application Setup

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { TGUI_CONFIG } from '@telegram-apps/tgui-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    // Optional TGUI configuration
    {
      provide: TGUI_CONFIG,
      useValue: {
        platform: 'ios', // optional: 'ios' or 'base'
        appearance: 'dark' // optional: 'dark' or 'light'
      }
    }
  ]
};

// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig);
```

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { TGUIRootComponent } from '@telegram-apps/tgui-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TGUIRootComponent],
  template: `
    <tgui-root>
      <!-- Your app content -->
    </tgui-root>
  `
})
export class AppComponent {}
```

### Using with NgModule (Optional)

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TGUI_CONFIG, TGUIRootComponent } from '@telegram-apps/tgui-angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TGUIRootComponent
  ],
  providers: [
    {
      provide: TGUI_CONFIG,
      useValue: {
        platform: 'base',
        appearance: 'light'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Root Component

The `tgui-root` component serves as a required container for your application. It:

- Applies CSS variables for theming
- Adds the necessary class names for platform and appearance
- Serves as the portal container for modal content
- Handles platform detection and theme initialization
- Automatically loads the required stylesheets

**Important**: All TGUI components must be placed within the `tgui-root` component to ensure proper styling. CSS variables and theme styles are only available to components that are children of `tgui-root`.

The component can be configured with inputs:

```html
<tgui-root [platform]="'ios'" [appearance]="'dark'">
  <!-- Your app content -->
</tgui-root>
```

## Theming

The library automatically detects and adapts to:

1. Telegram WebApp theme (dark/light)
2. User system preferences (if not in Telegram WebApp)

You can also manually set the theme:

```typescript
import { Component } from '@angular/core';
import { ThemeService } from '@telegram-apps/tgui-angular';

@Component({
  selector: 'app-root',
  template: '...'
})
export class AppComponent {
  constructor(private themeService: ThemeService) {
    // Manually set theme
    this.themeService.setTheme('dark');
  }
}
```

## Platform Detection

The library automatically detects the platform (iOS or base) and applies appropriate styling.

You can manually set the platform:

```typescript
import { Component } from '@angular/core';
import { PlatformService } from '@telegram-apps/tgui-angular';

@Component({
  selector: 'app-root',
  template: '...'
})
export class AppComponent {
  constructor(private platformService: PlatformService) {
    // Manually set platform
    this.platformService.setPlatform('ios');
  }
}
```

## Portal System

The library includes a portal system for rendering content outside of its normal DOM hierarchy:

```typescript
import { Component } from '@angular/core';
import { RootPortalComponent } from '@telegram-apps/tgui-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TGUIRootComponent, RootPortalComponent],
  template: `
    <tgui-root>
      <!-- Your app content -->
      
      <!-- Content rendered in the root portal -->
      <tgui-root-portal>
        This content will be rendered at the root level
      </tgui-root-portal>
    </tgui-root>
  `
})
export class AppComponent {}
```

## Working with Telegram WebApp API

The library includes a TelegramService to interact with the Telegram WebApp API:

```typescript
import { Component } from '@angular/core';
import { TelegramService } from '@telegram-apps/tgui-angular';

@Component({
  selector: 'app-root',
  template: '...'
})
export class AppComponent {
  constructor(private telegramService: TelegramService) {
    const webApp = this.telegramService.getTelegramData();
    if (webApp) {
      // Now you can use the Telegram WebApp API
      console.log('Current theme:', webApp.colorScheme);
    }
  }
}
```
