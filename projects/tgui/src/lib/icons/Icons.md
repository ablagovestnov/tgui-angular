import { Meta } from '@storybook/blocks';

<Meta title="Icons/Documentation" />

# TGUI Icons

The TGUI library provides a set of icons that can be used in your application.

## Icon Structure

Icons are organized by sizes:
- 12×12
- 16×16
- 20×20
- 24×24
- 28×28
- 32×32
- 36×36

## Using Icons

Each icon is a standalone Angular component and can be imported and used as follows:

```typescript
import { Component } from '@angular/core';
import { TguiIcon20ChevronDown } from '@tgui/icons/icon20/tgui-icon20-chevron-down';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [TguiIcon20ChevronDown],
  template: `
    <div>
      <tgui-icon20-chevron-down></tgui-icon20-chevron-down>
    </div>
  `,
})
export class ExampleComponent {}
```

## Icon Properties

Each icon supports the following input parameters:

| Name | Type | Description |
|------|------|-------------|
| class | string | CSS class for styling the icon |
| style | { [key: string]: string } | Additional styles for the icon |
| ariaLabel | string | Aria-label for accessibility |
| title | string | Tooltip for the icon |

Example usage with parameters:

```typescript
<tgui-icon20-chevron-down 
  class="custom-icon"
  [style]="{ 'color': 'red' }"
  ariaLabel="Expand"
  title="Click to expand"
></tgui-icon20-chevron-down>
```

## Icon Styling

### Default Color

By default, all icons use the color defined by the CSS variable `--tgui-link_color`. This allows icons to automatically match the overall color scheme of the application.

### Changing Color

Icons use `currentColor` for fill, so their color can be easily changed via CSS:

```css
/* Override color for all icons in container */
.icon-container {
  color: #ff0000; /* Icons will be red */
}

/* Change color on hover */
.icon-container:hover {
  color: #0000ff; /* Icons will be blue on hover */
}
```

Or directly in the style attribute:

```html
<tgui-icon20-chevron-down style="color: #ff5722;"></tgui-icon20-chevron-down>
```

### Changing Size

Icon size can also be changed using the `font-size` property:

```html
<tgui-icon20-chevron-down style="font-size: 24px;"></tgui-icon20-chevron-down>
```

## Icon Naming

Icons follow the naming convention `TguiIcon<SIZE><ICON-NAME>`, where:
- `<SIZE>` - icon size (12, 16, 20, 24, 28, 32, 36)
- `<ICON-NAME>` - icon name in CamelCase 

## Available Icons

### 12×12 Icons

| Name | Selector | Description |
|------|----------|-------------|
| Quote | tgui-icon12-quote | Quotation marks for quoting |

### 16×16 Icons

| Name | Selector | Description |
|------|----------|-------------|
| Cancel | tgui-icon16-cancel | Cross for closing or canceling action |
| Chevron | tgui-icon16-chevron | Chevron arrow for navigation or expansion |

### 20×20 Icons

| Name | Selector | Description |
|------|----------|-------------|
| ChevronDown | tgui-icon20-chevron-down | Down arrow for dropdown lists |
| Copy | tgui-icon20-copy | Copy icon |
| QuestionMark | tgui-icon20-question-mark | Question mark for hints and help |
| Select | tgui-icon20-select | Checkmark for marking selected items |
| SelectIos | tgui-icon20-select-ios | iOS-style checkmark |

### 24×24 Icons

| Name | Selector | Description |
|------|----------|-------------|
| Cancel | tgui-icon24-cancel | Cross for closing or canceling action |
| Channel | tgui-icon24-channel | Communication channel icon |
| Chat | tgui-icon24-chat | Chat/messages icon |
| ChevronDown | tgui-icon24-chevron-down | Down arrow for dropdown lists |
| ChevronLeft | tgui-icon24-chevron-left | Left arrow for navigation |
| ChevronRight | tgui-icon24-chevron-right | Right arrow for navigation |
| Close | tgui-icon24-close | Close icon |
| Notifications | tgui-icon24-notifications | Notifications icon |
| PersonRemove | tgui-icon24-person-remove | Remove user icon |
| QR | tgui-icon24-qr | QR code |
| SunLow | tgui-icon24-sun-low | Sun icon (low brightness) |

### 28×28 Icons

| Name | Selector | Description |
|------|----------|-------------|
| AddCircle | tgui-icon28-add-circle | Add icon in circle |
| Archive | tgui-icon28-archive | Archive icon |
| Attach | tgui-icon28-attach | Attachment icon |
| Chat | tgui-icon28-chat | Chat/messages icon |
| Close | tgui-icon28-close | Close icon |
| CloseAmbient | tgui-icon28-close-ambient | Close icon with ambient lighting |
| Devices | tgui-icon28-devices | Devices icon |
| Edit | tgui-icon28-edit | Edit icon |
| Heart | tgui-icon28-heart | Heart icon |
| Stats | tgui-icon28-stats | Statistics icon |

### 32×32 Icons

| Name | Selector | Description |
|------|----------|-------------|
| ProfileColoredSquare | tgui-icon32-profile-colored-square | Colored square with profile information |

### 36×36 Icons

| Name | Selector | Description |
|------|----------|-------------|
| Backspace | tgui-icon36-backspace | Backspace key icon | 