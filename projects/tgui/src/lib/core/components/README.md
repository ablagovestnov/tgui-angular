# TGUI Angular Components Structure

This directory contains all UI components organized into logical categories that follow the structure of the original React library.

## Component Categories

1. **blocks/** - Basic UI building blocks
   - `avatar` - User avatars and badges
   - `avatar-stack` - Groups of avatars
   - `button` - Buttons with different styles and states
   - *Future components*: Card, Section, List, etc.

2. **feedback/** - Components that provide feedback to users
   - `spinner` - Loading indicators
   - *Future components*: Toast, Progress, etc.

3. **form/** - Form-related components
   - *Future components*: Checkbox, Radio, Input, Switch, etc.

4. **layout/** - Layout components
   - *Future components*: Section, Grid, etc.

5. **misc/** - Miscellaneous components
   - *Future components*: Divider, etc.

6. **navigation/** - Navigation components
   - *Future components*: Tabs, Breadcrumbs, etc.

7. **overlays/** - Components that overlay the UI
   - *Future components*: Modal, Dialog, etc.

8. **service/** - Service-related components
   - `ripple` - Ripple effect component
   - *Future components*: Portal, etc.

9. **typography/** - Text-related components
   - `caption` - Small text
   - `headline` - Headings
   - `large-title` - Large headings
   - `subheadline` - Subheadings
   - `text` - Regular text
   - `title` - Titles
   - `typography` - Base typography component

10. **utils/** - Utility components
    - `portal` - Portal components
    - `tappable` - Touch/click interaction components
    - `tgui-root` - Root component for the TGUI library

## Component Implementation Details

Each component:
- Is implemented as a standalone Angular 19+ component with Signal API
- Follows Angular best practices
- Supports theme switching via CSS variables
- Adapts to different platforms (iOS/Base) 