/*
 * Public API Surface of tgui
 */

// ===================================
// CORE SERVICES & TYPES
// ===================================
export {
  ThemeService,
  PlatformService,
  PortalService,
  RippleService,
  TelegramService
} from './lib/services';

export type {
  AppearanceType,
  PlatformType,
  RippleWave
} from './lib/services';

// ===================================
// UTILITY FUNCTIONS & SERVICES
// ===================================
export {
  applyTheme,
  setupSystemThemeDetection,
  SystemThemeService
} from './lib/utils';

// Export all utility functions
export * from './lib/utils/has-node';
export * from './lib/utils/theme-helper';
export * from './lib/utils/class-names';
export * from './lib/utils/function';
export * from './lib/utils/chunk';

// ===================================
// DIRECTIVES
// ===================================
export {
  ThemeDirective,
  PortalOutletDirective,
  HorizontalScrollDirective,
  VisuallyHiddenDirective
} from './lib/directives';

// ===================================
// UTILITY COMPONENTS
// ===================================
export {
  TappableComponent,
  RippleComponent,
  RootPortalComponent,
  RootComponent,
  TouchComponent,
  RootRendererComponent
} from './lib/components/utils';

// ===================================
// BLOCK COMPONENTS
// ===================================
export {
  // Core blocks
  BadgeComponent,
  ButtonComponent,
  CardComponent,
  SectionComponent,
  
  // Avatar components
  AvatarComponent,
  AvatarStackComponent,
  AvatarAcronymComponent,
  AvatarBadgeComponent,
  // Icon components
  IconButtonComponent,
  IconContainerComponent,
  
  // Image components
  ImageComponent,
  ImageBadgeComponent,
  
  // List and navigation
  ListComponent,
  CellComponent,
  ButtonCellComponent,
  
  // Layout blocks
  PlaceholderComponent,
  StepsComponent,
  TimelineComponent,
  TimelineItemComponent,
  
  // Interactive blocks
  AccordionComponent,
  AccordionSummaryComponent,
  AccordionContentComponent,
  InlineButtonsComponent,
  InlineButtonsItemComponent,
  
  // Content blocks
  BlockquoteComponent,
  BannerComponent
} from './lib/components/blocks';

// Export additional types and interfaces from blocks
export * from './lib/components/blocks/cell';
export * from './lib/components/blocks/blockquote';
export * from './lib/components/blocks/banner';

// ===================================
// FORM COMPONENTS
// ===================================
export {
  // Basic form controls
  InputComponent,
  TextareaComponent,
  FormInputComponent,
  FormInputTitleComponent,
  
  // Selection controls
  CheckboxComponent,
  RadioComponent,
  SwitchComponent,
  SelectComponent,
  
  // Specialized inputs
  ColorInputComponent,
  FileInputComponent,
  RatingComponent,
  
  // Pin input components
  PinInputComponent,
  PinInputButtonComponent,
  PinInputCellComponent,
  PinInputService,
  
  // Chip component
  ChipComponent
} from './lib/components/form';

// Export additional types and services from forms
export * from './lib/components/form/multiselectable';
export * from './lib/components/form/pin-input';
export * from './lib/components/form/rating';
export * from './lib/components/form/select';
export * from './lib/components/form/switch';

// ===================================
// FEEDBACK COMPONENTS
// ===================================
export {
  SpinnerComponent,
  SpoilerComponent,
  SkeletonComponent,
  ProgressComponent,
  CircularProgressComponent
} from './lib/components/feedback';

// Export additional types and services from feedback
export * from './lib/components/feedback/snackbar';
export * from './lib/components/feedback/spoiler';
export * from './lib/components/feedback/progress';
export * from './lib/components/feedback/circular-progress';

// ===================================
// LAYOUT COMPONENTS
// ===================================
export {
  FixedLayoutComponent,
  TabbarComponent,
  TabbarItemComponent
} from './lib/components/layout';

// ===================================
// NAVIGATION COMPONENTS
// ===================================
// Export all navigation components (using wildcard for complex exports)
export * from './lib/components/navigation/breadcrumbs/breadcrumbs-item.component';
export * from './lib/components/navigation/breadcrumbs/breadcrumbs.component';
export * from './lib/components/navigation/breadcrumbs/icons';
export * from './lib/components/navigation/tabs-list';
export * from './lib/components/navigation/segmented-control';
export * from './lib/components/navigation/pagination';
export * from './lib/components/navigation/compact-pagination';
export * from './lib/components/navigation/link/link.component';

// ===================================
// OVERLAY COMPONENTS
// ===================================
export * from './lib/components/overlays/popper';
export * from './lib/components/overlays/tooltip';
export * from './lib/components/overlays/modal';

// ===================================
// TYPOGRAPHY COMPONENTS
// ===================================
export {
  TypographyComponent,
  CaptionComponent,
  HeadlineComponent,
  LargeTitleComponent,
  SubheadlineComponent,
  TextComponent,
  TitleComponent
} from './lib/components/typography';

// ===================================
// MISCELLANEOUS COMPONENTS
// ===================================
export {
  DividerComponent
} from './lib/components/misc';

// ===================================
// ICONS
// ===================================
// Icon base and interfaces
export * from './lib/icons/icon.interface';
export * from './lib/icons/icon-base.component';
export * from './lib/icons/dynamic-icon.component';

// All icon sizes
export * from './lib/icons/icon12';
export * from './lib/icons/icon16';
export * from './lib/icons/icon20';
export * from './lib/icons/icon24';
export * from './lib/icons/icon28';
export * from './lib/icons/icon32';
export * from './lib/icons/icon36';

// Icon directives
export * from './lib/icons/directives';

// ===================================
// LEGACY SUPPORT & MAIN SERVICE
// ===================================
// The library's main service
export * from './lib/tgui.service';

// Main component (deprecated but still exported for backward compatibility)
export * from './lib/tgui.component';

// Legacy icon exports for backward compatibility
export * from './lib/icons/icon20/tgui-icon20-chevron-down';
export * from './lib/icons/icon20/tgui-icon20-copy';
