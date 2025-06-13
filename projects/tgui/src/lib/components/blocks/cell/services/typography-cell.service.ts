import { Injectable, inject, Type } from '@angular/core';
import { PlatformService } from '../../../../services/platform.service';
import { TextComponent } from '../../../typography/text/text.component';
import { SubheadlineComponent } from '../../../typography/subheadline/subheadline.component';
import { CaptionComponent } from '../../../typography/caption/caption.component';

/**
 * Service that provides platform-specific typography components for Cell
 * Similar to the React useTypographyCellComponents hook
 */
@Injectable({
  providedIn: 'root'
})
export class TypographyCellService {
  private platformService = inject(PlatformService);

  /**
   * Returns the appropriate component type for the title based on platform
   * iOS: TextComponent
   * Android/Web: SubheadlineComponent with level 1
   */
  getTitleComponent(): Type<any> {
    return this.platformService.isIOS() ? TextComponent : SubheadlineComponent;
  }

  /**
   * Returns the appropriate component type for the description based on platform
   * iOS: CaptionComponent
   * Android/Web: SubheadlineComponent with level 2
   */
  getDescriptionComponent(): Type<any> {
    return this.platformService.isIOS() ? CaptionComponent : SubheadlineComponent;
  }

  /**
   * Returns the level to use for title component if it's a SubheadlineComponent
   */
  getTitleLevel(): string {
    return this.platformService.isIOS() ? '' : '1';
  }

  /**
   * Returns the level to use for description component if it's a SubheadlineComponent
   */
  getDescriptionLevel(): string {
    return '2';
  }
} 