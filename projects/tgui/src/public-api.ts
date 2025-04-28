/*
 * Public API Surface of tgui
 */

// Export main services
export { ThemeService } from './lib/core/services/theme.service';
export { PlatformService } from './lib/core/services/platform.service';
export { PortalService } from './lib/core/services/portal.service';

// Export types
export type { AppearanceType } from './lib/core/services/theme.service';
export type { PlatformType } from './lib/core/services/platform.service';

// Export components and directives
export { TGUIRootComponent } from './lib/core/components/service/tgui-root/tgui-root.component';
export { RootPortalComponent } from './lib/core/components/service/portal/root-portal.component';
export { TGUIThemeDirective } from './lib/core/directives/tgui-theme.directive';
export { PortalOutletDirective } from './lib/core/directives/portal-outlet.directive';

// Component groups
export * from './lib/core/components/blocks/public-api';
export * from './lib/core/components/feedback/public-api';
export * from './lib/core/components/form/public-api';
export * from './lib/core/components/layout/public-api';
export * from './lib/core/components/misc/public-api';
export * from './lib/core/components/navigation/public-api';
export * from './lib/core/components/overlays/public-api';
export * from './lib/core/components/service/public-api';
export * from './lib/core/components/typography/public-api';

// Service Components
export * from './lib/core/components/service/tappable';

// Services
export * from './lib/core/services/telegram.service';
export * from './lib/core/services/ripple.service';

// The library's main service
export * from './lib/tgui.service';
