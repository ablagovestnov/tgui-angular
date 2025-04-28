import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ThemeService } from '@services/theme.service';
import { PlatformService } from '@services/platform.service';
import { PortalService } from '@services/portal.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    ThemeService,
    PlatformService,
    PortalService
  ]
};
