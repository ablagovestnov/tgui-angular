import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  inject,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../../../services/platform.service';
import { CaptionComponent, SubheadlineComponent } from '../../../typography';

/**
 * FormInputTitle component that displays appropriate typography based on platform
 * Used internally by FormInput to display the header
 */
@Component({
  selector: 'tgui-form-input-title',
  standalone: true,
  imports: [CommonModule, CaptionComponent, SubheadlineComponent],
  template: `
    <ng-container *ngIf="platformService.isIOS(); else baseTitle">
      <tgui-caption [caps]="true">
        <ng-content></ng-content>
      </tgui-caption>
    </ng-container>
    
    <ng-template #baseTitle>
      <tgui-subheadline level="2" weight="2">
        <ng-content></ng-content>
      </tgui-subheadline>
    </ng-template>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInputTitleComponent {
  // Inject platform service
  protected platformService = inject(PlatformService);
} 