# TGUI Theming System

TGUI uses a simple but powerful theming system that allows your application to adapt to both light and dark themes. The theming system works by adding CSS classes to the HTML root element and providing CSS variables for consistent styling across components.

## Basic Usage

The simplest way to use TGUI themes is through the `TGUIRootComponent`:

```html
<tgui-root>
  <!-- Your app content here -->
</tgui-root>
```

By default, the `TGUIRootComponent` will automatically detect the user's system theme preference and apply the appropriate theme. It will also listen for changes to the user's system theme preference and update the theme accordingly.

## Theme Classes

TGUI uses two main CSS classes to define themes:

- `tgui-theme-light`: For light theme
- `tgui-theme-dark`: For dark theme

These classes are applied to the `<html>` element, making theme variables available to all components in your application.

## Manual Theme Control

If you want manual control over the theme, you can use the `appearance` input on the `TGUIRootComponent`:

```html
<tgui-root [appearance]="'dark'">
  <!-- Your app content here will always use dark theme -->
</tgui-root>
```

Or you can use the `appearance` input with a variable:

```html
<tgui-root [appearance]="currentTheme">
  <!-- Your app content here will use the theme specified by currentTheme -->
</tgui-root>
```

```typescript
import { Component } from '@angular/core';
import { AppearanceType } from '@tgui/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  currentTheme: AppearanceType = 'light';
  
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
  }
}
```

## Angular Theme Service

TGUI provides a reactive Angular service that makes it easy to handle themes in your application:

```typescript
// app.component.ts
import { Component, OnInit, effect } from '@angular/core';
import { SystemThemeService, AppearanceType } from '@tgui/core';

@Component({
  selector: 'app-root',
  template: `
    <div [class.dark-mode]="currentTheme === 'dark'">
      <h1>Current theme: {{ currentTheme }}</h1>
      <button (click)="toggleTheme()">Toggle Theme</button>
      <button (click)="useSystemTheme()">Use System Theme</button>
    </div>
  `,
})
export class AppComponent implements OnInit {
  currentTheme: AppearanceType = 'light';
  
  constructor(private systemThemeService: SystemThemeService) {
    // Using effect to react to theme changes
    effect(() => {
      // Update currentTheme when theme changes
      this.currentTheme = this.systemThemeService.theme();
    });
  }
  
  ngOnInit() {
    // Service automatically detects system theme on creation
  }
  
  toggleTheme() {
    // Disable system theme tracking
    this.systemThemeService.disableSystemTheme();
    
    // Toggle theme
    const newTheme: AppearanceType = 
      this.currentTheme === 'light' ? 'dark' : 'light';
    
    this.systemThemeService.setTheme(newTheme);
  }
  
  useSystemTheme() {
    // Enable system theme tracking
    this.systemThemeService.enableSystemTheme();
  }
}
```

This service has the following advantages:
- Automatically tracks system theme through media query
- Provides a signal for reactive theme change tracking
- Allows switching between manual and automatic mode
- Automatically updates theme CSS classes on HTML element

## Utility Functions

TGUI provides utility functions to help you work with themes:

```typescript
import { applyTheme, setupSystemThemeDetection } from '@tgui/core';

// Manually apply a theme
applyTheme('dark');

// Setup system theme detection with a callback
const cleanup = setupSystemThemeDetection((theme) => {
  console.log(`System theme changed to ${theme}`);
});

// Later, when you're done with the listener
cleanup();
```

## CSS Variables

TGUI provides a set of CSS variables that you can use in your own components to ensure consistent styling:

```css
.my-component {
  background-color: var(--tgui--bg_color);
  color: var(--tgui--text_color);
  border: 1px solid var(--tgui--outline);
}
```

These variables automatically update when the theme changes, ensuring your components look good in both light and dark themes.

## Without TGUIRootComponent

If you're not using the `TGUIRootComponent`, you can still use TGUI themes by manually adding the appropriate CSS class to your HTML element:

```typescript
import { AppearanceType } from '@tgui/core';

function setTheme(theme: AppearanceType) {
  document.documentElement.classList.remove('tgui-theme-light', 'tgui-theme-dark');
  document.documentElement.classList.add(`tgui-theme-${theme}`);
}

// Then call this function when needed
setTheme('dark');
```

Or use the utility functions provided by TGUI:

```typescript
import { applyTheme } from '@tgui/core';

applyTheme('dark');
```

## Following System Theme Without TGUIRootComponent

You can also follow the system theme without using `TGUIRootComponent`:

```typescript
import { setupSystemThemeDetection } from '@tgui/core';

// This will automatically apply the appropriate theme and set up a listener
const cleanup = setupSystemThemeDetection();

// Later, when you're done with the listener
cleanup();
```

## Platform-Specific Styling

In addition to theme classes, TGUI also provides platform-specific classes that can be used to customize components based on the target platform:

- `tgui-platform-base`: For the base platform
- `tgui-platform-ios`: For iOS-specific styling

These classes can be combined with theme classes to create platform-specific themes:

```css
.tgui-theme-dark.tgui-platform-ios .my-component {
  /* iOS-specific dark theme styles */
}
```

## Theme Debugging

If you encounter problems with theme application, you can check:

1. Check if the correct theme class is added to the HTML element:
   ```javascript
   console.log(document.documentElement.classList.contains('tgui-theme-dark')); // true/false
   ```

2. Check if theme CSS variables are loading:
   ```javascript
   console.log(getComputedStyle(document.documentElement).getPropertyValue('--tgui--bg_color'));
   ```

3. Check if CSS classes are being overwritten somewhere in your application:
   ```javascript
   const observer = new MutationObserver((mutations) => {
     mutations.forEach((mutation) => {
       if (mutation.attributeName === 'class') {
         console.log('Classes changed:', mutation.target.className);
       }
     });
   });
   
   observer.observe(document.documentElement, { attributes: true });
   ```

## Complete Example

Here's a complete example of how to use TGUI themes in an Angular application:

```typescript
// app.component.ts
import { Component, OnInit, OnDestroy, effect } from '@angular/core';
import { SystemThemeService, AppearanceType } from '@tgui/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  currentTheme: AppearanceType = 'light';
  
  constructor(private themeService: SystemThemeService) {
    // Using effect to react to theme changes
    effect(() => {
      this.currentTheme = this.themeService.theme();
      console.log(`Theme changed to: ${this.currentTheme}`);
    });
  }
  
  ngOnInit() {
    // Initialization has already occurred in the constructor via effect
  }
  
  toggleTheme() {
    // Disable system theme tracking
    this.themeService.disableSystemTheme();
    
    // Toggle theme
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(newTheme);
  }
  
  useSystemTheme() {
    // Enable system theme tracking
    this.themeService.enableSystemTheme();
  }
  
  ngOnDestroy() {
    // No cleanup needed for effect, it is automatically destroyed with the component
  }
}
```

```html
<!-- app.component.html -->
<div class="app-container">
  <h1>TGUI Theme Demo</h1>
  <p>Current theme: {{ currentTheme }}</p>
  
  <div class="controls">
    <button (click)="toggleTheme()">Toggle Theme</button>
    <button (click)="useSystemTheme()">Use System Theme</button>
  </div>
  
  <div class="theme-demo">
    <div class="card">
      <h2>Theme Variables Demo</h2>
      <p>This card uses TGUI theme variables for styling</p>
      <button>Button</button>
    </div>
  </div>
</div>
```

```scss
/* app.component.scss */
.app-container {
  padding: 20px;
  min-height: 100vh;
  background-color: var(--tgui--bg_color);
  color: var(--tgui--text_color);
}

.controls {
  margin: 20px 0;
  
  button {
    margin-right: 10px;
    padding: 8px 16px;
    background-color: var(--tgui--button_color);
    color: var(--tgui--button_text_color);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      opacity: 0.9;
    }
  }
}

.theme-demo {
  .card {
    padding: 20px;
    background-color: var(--tgui--section_bg_color);
    border-radius: 8px;
    box-shadow: 0 2px 8px var(--tgui--outline);
    
    h2 {
      color: var(--tgui--accent_text_color);
      margin-top: 0;
    }
    
    p {
      color: var(--tgui--subtitle_text_color);
    }
    
    button {
      background-color: var(--tgui--button_color);
      color: var(--tgui--button_text_color);
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
```
