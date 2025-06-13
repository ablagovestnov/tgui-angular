# Modal Component

A flexible modal dialog framework with mobile-optimized touch gestures and platform-adaptive styling.

## Features

- **Touch Gestures**: Native swipe-to-dismiss functionality
- **Portal Rendering**: Content rendered in document body for proper z-index layering
- **Platform Adaptive**: iOS-specific styling and behavior patterns
- **Keyboard Navigation**: Full keyboard accessibility with Escape key support
- **Snap Points**: Multiple height positions for dynamic content
- **Accessibility**: ARIA attributes and focus management
- **Theme Aware**: Automatic adaptation to light/dark themes

## Basic Usage

```typescript
import { ModalComponent, ModalHeaderComponent } from '@tgui/angular';

@Component({
  template: `
    <tgui-modal [open]="isOpen" (openChange)="isOpen = $event">
      <tgui-modal-header>Modal Title</tgui-modal-header>
      <p>Modal content goes here</p>
    </tgui-modal>
  `
})
export class MyComponent {
  isOpen = false;
}
```

## With Trigger Button

```typescript
@Component({
  template: `
    <tgui-modal [trigger]="triggerTemplate" [header]="headerTemplate">
      <p>Modal content</p>
    </tgui-modal>

    <ng-template #triggerTemplate>
      <tgui-button>Open Modal</tgui-button>
    </ng-template>

    <ng-template #headerTemplate>
      <tgui-modal-header>Modal Title</tgui-modal-header>
    </ng-template>
  `
})
export class MyComponent {}
```

## With Close Button

```typescript
@Component({
  template: `
    <tgui-modal [open]="isOpen" (openChange)="isOpen = $event">
      <tgui-modal-header>
        Modal Title
        <tgui-modal-close slot="after">
          <tgui-icon-28-close></tgui-icon-28-close>
        </tgui-modal-close>
      </tgui-modal-header>
      <p>Modal content</p>
    </tgui-modal>
  `
})
export class MyComponent {
  isOpen = false;
}
```

## API Reference

### ModalComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Controls modal visibility |
| `header` | `TemplateRef` | `null` | Custom header template |
| `overlayComponent` | `TemplateRef` | `null` | Custom overlay component |
| `trigger` | `TemplateRef` | `null` | Trigger element template |
| `nested` | `boolean` | `false` | Enable nested modal support |
| `closeThreshold` | `number` | `0.5` | Swipe threshold (0-1) |
| `scrollLockTimeout` | `number` | `500` | Scroll lock delay (ms) |
| `modal` | `boolean` | `true` | Block background interaction |
| `preventScrollRestoration` | `boolean` | `true` | Prevent scroll restoration |
| `snapPoints` | `(number \| string)[]` | `[]` | Height snap positions |
| `fadeFromIndex` | `number` | `null` | Overlay fade start point |
| `dismissible` | `boolean` | `true` | Allow user dismissal |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `openChange` | `boolean` | Fired when modal open state changes |
| `animationEnd` | `{open: boolean}` | Fired when open/close animation completes |

### ModalHeaderComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `forceShow` | `boolean` | `false` | Show header on all platforms |
| `forceHide` | `boolean` | `false` | Hide header on all platforms |

### ModalCloseComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `interactiveAnimation` | `'opacity' \| 'background'` | `'opacity'` | Touch animation type |
| `ariaLabel` | `string` | `'Close modal'` | Accessibility label |

### ModalOverlayComponent

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `opacity` | `number` | `null` | Custom overlay opacity |
| `backgroundColor` | `string` | `null` | Custom background color |

## Platform Behavior

### iOS
- Header with drag handle visible by default
- Rounded corners (10px border radius)
- Swipe gestures enabled

### Android/Base
- Header hidden by default
- Standard corners (16px border radius)
- Swipe gestures enabled

## Accessibility

The Modal component includes comprehensive accessibility features:

- **ARIA Attributes**: Proper `role="dialog"` and `aria-modal="true"`
- **Focus Management**: Automatic focus trapping within modal
- **Keyboard Navigation**: Escape key closes modal
- **Screen Reader Support**: Proper announcements and descriptions

## Touch Gestures

- **Swipe to Dismiss**: Drag modal down to close
- **Momentum Detection**: Fast swipes trigger immediate close
- **Threshold Control**: Configurable swipe distance threshold
- **Scroll Lock**: Prevents accidental dismissal during content scrolling

## Examples

See Storybook for comprehensive examples including:
- Basic modal usage
- Nested modals
- Controlled modals
- Snap point configurations
- Custom overlays and headers 