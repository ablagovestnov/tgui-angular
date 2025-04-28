// Root Components
export { TGUIRootComponent } from './components/service/tgui-root/tgui-root.component';
export { RootPortalComponent } from './components/service/portal/root-portal.component';

// Theme Helpers
export { applyTheme, setupSystemThemeDetection, SystemThemeService } from './utils/theme-helper';

// Directives
export { TGUIThemeDirective } from './directives/tgui-theme.directive';
export { PortalOutletDirective } from './directives/portal-outlet.directive';

// Services
export { ThemeService } from './services/theme.service';
export type { AppearanceType } from './services/theme.service';
export { PlatformService } from './services/platform.service';
export type { PlatformType } from './services/platform.service';
export { PortalService } from './services/portal.service';

// Components grouping
export * from './components/blocks/public-api';
export * from './components/feedback/public-api';
export * from './components/form/public-api';
export * from './components/layout/public-api';
export * from './components/misc/public-api';
export * from './components/navigation/public-api';
export * from './components/overlays/public-api';
export * from './components/service/public-api';
export * from './components/typography/public-api';
