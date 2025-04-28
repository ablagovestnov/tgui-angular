# Path Aliases in TGUI Angular

This project uses TypeScript path aliases to simplify imports and avoid relative path hell (`../../../`). Below is a list of available aliases:

## Component Category Aliases

| Alias | Path | Description |
|-------|------|-------------|
| `@blocks/*` | `./projects/tgui/src/lib/core/components/blocks/*` | Basic UI building blocks (Button, Avatar, etc.) |
| `@feedback/*` | `./projects/tgui/src/lib/core/components/feedback/*` | Feedback components (Spinner, etc.) |
| `@form/*` | `./projects/tgui/src/lib/core/components/form/*` | Form components (Input, Checkbox, etc.) |
| `@layout/*` | `./projects/tgui/src/lib/core/components/layout/*` | Layout components (Section, etc.) |
| `@misc/*` | `./projects/tgui/src/lib/core/components/misc/*` | Miscellaneous components (Divider, etc.) |
| `@navigation/*` | `./projects/tgui/src/lib/core/components/navigation/*` | Navigation components (Tabs, etc.) |
| `@overlays/*` | `./projects/tgui/src/lib/core/components/overlays/*` | Overlay components (Modal, etc.) |
| `@service/*` | `./projects/tgui/src/lib/core/components/service/*` | Service-related components (Ripple, Root, etc.) |
| `@typography/*` | `./projects/tgui/src/lib/core/components/typography/*` | Typography components (Text, Title, etc.) |

## General Aliases

| Alias | Path | Description |
|-------|------|-------------|
| `@components/*` | `./projects/tgui/src/lib/core/components/*` | All components |
| `@services/*` | `./projects/tgui/src/lib/core/services/*` | Services |
| `@directives/*` | `./projects/tgui/src/lib/core/directives/*` | Directives |
| `@lib/*` | `./projects/tgui/src/lib/*` | Library root |
| `@core/*` | `./projects/tgui/src/lib/core/*` | Core library code |
| `@tgui/*` | `./projects/tgui/src/*` | Root of the TGUI library |

## Examples

Before:
```typescript
import { ButtonComponent } from '../../../tgui/src/lib/core/components/blocks/button/button.component';
import { ThemeService } from '../../../tgui/src/lib/core/services/theme.service';
```

After:
```typescript
import { ButtonComponent } from '@blocks/button/button.component';
import { ThemeService } from '@services/theme.service';
```

## Configuration

These aliases are configured in the project's `tsconfig.json` file. 