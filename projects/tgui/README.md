# TGUI Angular

Comprehensive Angular UI library for building Telegram Web Apps with modern components and theming support.

## Installation

```bash
npm install tgui-angular
```

## Importing Styles

To use TGUI Angular components with proper styling, you need to import the library's CSS files. Choose one of the methods below:

### Method 1: Via angular.json (Recommended)

Add the styles to your `angular.json` file:

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "src/styles.css",
              "node_modules/tgui-angular/styles/index.css"
            ]
          }
        }
      }
    }
  }
}
```

**Note:** Thanks to package.json exports, you can also use the shorter path in CSS imports (but angular.json requires the full path).

### Method 2: Via styles.css

Import the styles in your main `src/styles.css` file:

```css
/* Full styles import */
@import 'tgui-angular/styles';

/* Or explicitly specify the file */
@import 'tgui-angular/styles/index.css';

/* Your custom styles */
```

### Method 3: Import Only Variables

If you only need the CSS variables for custom styling:

```css
@import 'tgui-angular/styles/variables.css';

/* Your custom components using TGUI variables */
.my-component {
  background-color: var(--tgui--bg_color);
  color: var(--tgui--text_color);
  padding: var(--tgui--text--line_height);
}
```

### Available Style Files

- **`index.css`** - Complete styles (includes variables + utility classes)
- **`variables.css`** - Only CSS custom properties for theming

## Quick Start

### Standalone Application Setup (Recommended)

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    // Your other providers
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
import { RootComponent } from 'tgui-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RootComponent],
  template: `
    <tgui-root>
      <!-- Your app content -->
      <h1>Hello Telegram Web App!</h1>
    </tgui-root>
  `
})
export class AppComponent {}
```

## Core Components

### Root Component

The `tgui-root` component is required and serves as the foundation for your app:

```html
<tgui-root [platform]="'ios'" [appearance]="'dark'">
  <!-- All your app content goes here -->
</tgui-root>
```

**Features:**
- Automatic theme detection (light/dark)
- Platform-specific styling (iOS/base)
- CSS variables injection
- Portal container for overlays

## Available Components

### Blocks (UI Building Blocks)
```typescript
import { 
  BadgeComponent,
  ButtonComponent,
  AvatarComponent,
  AvatarStackComponent,
  SectionComponent,
  CardComponent,
  IconButtonComponent,
  ImageComponent,
  ImageBadgeComponent,
  IconContainerComponent,
  PlaceholderComponent,
  ListComponent,
  StepsComponent,
  TimelineComponent,
  TimelineItemComponent,
  AccordionComponent,
  AccordionSummaryComponent,
  AccordionContentComponent
} from 'tgui-angular';
```

### Typography
```typescript
import {
  TypographyComponent,
  CaptionComponent,
  HeadlineComponent,
  LargeTitleComponent,
  SubheadlineComponent,
  TextComponent,
  TitleComponent
} from 'tgui-angular';
```

### Form Components
```typescript
import {
  ChipComponent,
  FormInputComponent,
  FormInputTitleComponent,
  InputComponent,
  CheckboxComponent,
  ColorInputComponent,
  RadioComponent,
  FileInputComponent,
  PinInputComponent,
  RatingComponent,
  SelectComponent,
  SwitchComponent,
  TextareaComponent
} from 'tgui-angular';
```

### Feedback Components
```typescript
import {
  SpinnerComponent,
  SpoilerComponent,
  SkeletonComponent,
  ProgressComponent,
  CircularProgressComponent
} from 'tgui-angular';
```

### Navigation Components
```typescript
import {
  BreadcrumbsComponent,
  BreadcrumbsItemComponent,
  LinkComponent
} from 'tgui-angular';
```

### Utility Components
```typescript
import {
  TappableComponent,
  RippleComponent,
  RootPortalComponent,
  TouchComponent,
  RootRendererComponent
} from 'tgui-angular';
```

## Services

### Theme Service
```typescript
import { Component } from '@angular/core';
import { ThemeService, AppearanceType } from 'tgui-angular';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="toggleTheme()">
      Current theme: {{ currentTheme }}
    </button>
  `
})
export class ExampleComponent {
  currentTheme: AppearanceType = 'light';

  constructor(private themeService: ThemeService) {
    // Listen to theme changes
    this.themeService.appearance$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.themeService.setAppearance(newTheme);
  }
}
```

### Platform Service
```typescript
import { Component } from '@angular/core';
import { PlatformService, PlatformType } from 'tgui-angular';

@Component({
  selector: 'app-example',
  template: `<div>Platform: {{ platform }}</div>`
})
export class ExampleComponent {
  platform: PlatformType = 'base';

  constructor(private platformService: PlatformService) {
    this.platformService.platform$.subscribe(platform => {
      this.platform = platform;
    });
  }
}
```

### Telegram Service
```typescript
import { Component } from '@angular/core';
import { TelegramService } from 'tgui-angular';

@Component({
  selector: 'app-example',
  template: `<div>Telegram WebApp detected: {{ isWebApp }}</div>`
})
export class ExampleComponent {
  isWebApp = false;

  constructor(private telegramService: TelegramService) {
    this.isWebApp = this.telegramService.isWebApp();
    
    if (this.isWebApp) {
      const webApp = this.telegramService.getWebApp();
      console.log('WebApp theme:', webApp?.colorScheme);
    }
  }
}
```

## Portal System

Use portals to render content outside the normal component tree:

```typescript
import { Component } from '@angular/core';
import { RootComponent, RootPortalComponent } from 'tgui-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RootComponent, RootPortalComponent],
  template: `
    <tgui-root>
      <div>Main content</div>
      
      <!-- This will be rendered at the root level -->
      <tgui-root-portal>
        <div class="modal">Modal content</div>
      </tgui-root-portal>
    </tgui-root>
  `
})
export class AppComponent {}
```

## Theming

The library automatically adapts to:
1. Telegram WebApp theme (when running in Telegram)
2. System theme preferences (when running in browser)

### Manual Theme Control

```html
<!-- Force dark theme -->
<tgui-root appearance="dark">
  <!-- Your content -->
</tgui-root>

<!-- Force iOS platform styling -->
<tgui-root platform="ios">
  <!-- Your content -->
</tgui-root>
```

### CSS Variables

All components use CSS variables for consistent theming:

```css
.my-custom-component {
  background-color: var(--tgui--bg_color);
  color: var(--tgui--text_color);
  border: 1px solid var(--tgui--outline);
}
```

## Example Usage

```typescript
import { Component } from '@angular/core';
import { 
  RootComponent,
  ButtonComponent,
  TextComponent,
  HeadlineComponent,
  SpinnerComponent
} from 'tgui-angular';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    RootComponent,
    ButtonComponent,
    TextComponent,
    HeadlineComponent,
    SpinnerComponent
  ],
  template: `
    <tgui-root>
      <tgui-headline>Welcome to TGUI Angular</tgui-headline>
      <tgui-text>A modern UI library for Telegram Web Apps</tgui-text>
      
      <tgui-button 
        mode="filled" 
        size="m"
        (click)="handleClick()">
        Click me!
      </tgui-button>
      
      <tgui-spinner *ngIf="loading" size="m" />
    </tgui-root>
  `
})
export class ExampleComponent {
  loading = false;

  handleClick() {
    this.loading = true;
    // Your logic here
  }
}
```

## Requirements

- Angular 19.0.0 or higher
- Node.js 18.0.0 or higher
- TypeScript 5.0 or higher

## Browser Support

- Chrome/Chromium 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Documentation

For detailed component documentation and examples, visit our [Storybook documentation](https://ablagovestnov.github.io/tgui-angular).

For theming details, see [THEMING.md](./THEMING.md).

## Contributing

We welcome contributions! Please see our contributing guidelines for more information.

## License

MIT License - see LICENSE file for details.

## Author

**Alexander Blagovestnov**
- Email: [a.blagovestnov@gmail.com](mailto:a.blagovestnov@gmail.com)
- Telegram: [https://t.me/ablagovestnov](https://t.me/ablagovestnov)
- GitHub: [ablagovestnov](https://github.com/ablagovestnov)

*Author is open to work opportunities.*
