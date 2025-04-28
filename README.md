# TGUI Angular

Angular UI component library for Telegram Web Apps (TWA), based on Telegram's design system.

## Features

- Standalone Angular 19+ components with Signal API
- Automated theme detection and switching (light/dark)
- Platform-specific styling (iOS/base)
- Seamless integration with Telegram Web Apps API
- TypeScript path aliases for improved import organization

## Component Structure

Components are organized into logical categories that mirror the React library structure:

1. **blocks/** - Basic UI building blocks (Button, Avatar, etc.)
2. **feedback/** - Components that provide feedback (Spinner, etc.)
3. **form/** - Form-related components (future: Input, Checkbox, etc.)
4. **layout/** - Layout components (future: Section, etc.)
5. **misc/** - Miscellaneous components (future: Divider, etc.)
6. **navigation/** - Navigation components (future: Tabs, etc.)
7. **overlays/** - Components that overlay the UI (future: Modal, etc.)
8. **service/** - Service-related components (Ripple, etc.)
9. **typography/** - Text-related components (Text, Title, etc.)
10. **utils/** - Utility components (Portal, etc.)

## Path Aliases

This project uses TypeScript path aliases to simplify imports:

```typescript
// Before
import { ButtonComponent } from '../../../tgui/src/lib/core/components/blocks/button/button.component';

// After
import { ButtonComponent } from '@blocks/button/button.component';
```

See [PATH_ALIASES.md](./PATH_ALIASES.md) for the complete list of available aliases.

## Getting Started

### Installation

```bash
npm install @tg/ui-angular
```

### Usage

1. Add the root component to your app:

```html
<tgui-root [appearance]="'light'" [platform]="'base'" [followSystemTheme]="true">
  <!-- Your app content here -->
</tgui-root>
```

2. Use components in your templates:

```html
<tgui-button mode="filled" size="m">Click me</tgui-button>
<tgui-text>Regular text</tgui-text>
<tgui-headline>Headline text</tgui-headline>
```

## Demo App

The package includes a demo application that showcases all available components and their variations.

Run the demo:

```bash
npm run start:demo
```

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute to this project.
