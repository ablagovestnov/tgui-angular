# TGUI Angular

Angular UI component library for Telegram Web Apps (TWA), based on Telegram's design system.

## Features

- Standalone Angular 19+ components with Signal API
- Automated theme detection and switching (light/dark)
- Platform-specific styling (iOS/base)
- Seamless integration with Telegram Web Apps API
- TypeScript path aliases for improved import organization
- Storybook documentation and component playground

## Component Structure

Components are organized into logical categories:

1. **blocks/** - Basic UI building blocks (Button, Avatar, Section, Card, etc.)
2. **feedback/** - Components that provide feedback (Spinner, etc.)
3. **form/** - Form-related components (Pin Input, etc.)
4. **layout/** - Layout components (Section, etc.)
5. **misc/** - Miscellaneous components (Divider, etc.)
6. **navigation/** - Navigation components (Breadcrumbs, etc.)
7. **overlays/** - Components that overlay the UI (Modal, etc.)
8. **typography/** - Text-related components (Text, Title, etc.)
9. **utils/** - Utility components (Tappable, etc.)

## Path Aliases

This project uses TypeScript path aliases to simplify imports:

```typescript
// Before
import { ButtonComponent } from 'projects/tgui/src/lib/components/blocks/button/button.component';

// After
import { ButtonComponent } from '@blocks/button/button.component';
```

Available aliases:
- @blocks/* - Block components
- @feedback/* - Feedback components
- @form/* - Form components
- @layout/* - Layout components
- @misc/* - Miscellaneous components
- @navigation/* - Navigation components
- @overlays/* - Overlay components
- @typography/* - Typography components
- @utils/* - Utility components
- @services/* - Services
- @directives/* - Directives
- @lib/* - Library root
- @core/* - Core functionality

## Getting Started

### Installation

```bash
npm install tgui-angular
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

## Documentation and Examples

The package includes a Storybook documentation with live examples of all available components and their variations.

Run Storybook locally:

```bash
npm run storybook
```

Build static Storybook:

```bash
npm run build-storybook
```

## Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

4. Run tests:
```bash
npm test
```

## Publishing

To publish a new version:

1. Update version (patch, minor, or major):
```bash
npm run version:patch
# or
npm run version:minor
# or
npm run version:major
```

2. Publish to npm:
```bash
npm run publish:patch
# or
npm run publish:minor
# or
npm run publish:major
```

For beta versions:
```bash
npm run publish:beta
```
