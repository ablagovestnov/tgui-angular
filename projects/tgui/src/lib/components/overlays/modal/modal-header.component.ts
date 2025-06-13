import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  computed,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../../services/platform.service';

/**
 * Modal header component providing a title area with drag handle indicator.
 * Supports before/after content slots for additional elements like close buttons.
 * Only visible on iOS platform following design guidelines.
 */
@Component({
  selector: 'tgui-modal-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="headerClasses()" *ngIf="showHeader()">
      <!-- Before content slot -->
      <div class="modal-header__before">
        <ng-content select="[slot=before]"></ng-content>
      </div>
      
      <!-- Main content -->
      <div class="modal-header__content">
        <ng-content></ng-content>
      </div>
      
      <!-- After content slot -->
      <div class="modal-header__after">
        <ng-content select="[slot=after]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: contents;
    }

    .modal-header {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      box-sizing: border-box;
      padding: 16px;
    }

    .modal-header::before {
      position: absolute;
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
      content: '';
      width: 36px;
      height: 4px;
      border-radius: 4px;
      background: var(--tgui--divider);
    }

    .modal-header__before,
    .modal-header__after {
      display: flex;
      align-items: center;
      flex: 1 0 0;
    }

    .modal-header__before {
      justify-content: flex-start;
    }

    .modal-header__after {
      justify-content: flex-end;
    }

    .modal-header__content {
      --tgui--text--line_height: 28px;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      white-space: nowrap;
      font-weight: 600;
      font-size: 17px;
      line-height: var(--tgui--text--line_height);
      color: var(--tgui--text_color);
    }

    /* Hide header on non-iOS platforms by default */
    :host-context(.tgui-platform-base) .modal-header {
      display: none;
    }

    /* Show header on iOS or when explicitly enabled */
    :host-context(.tgui-platform-ios) .modal-header {
      display: flex;
    }

    .modal-header--force-show {
      display: flex !important;
    }

    .modal-header--force-hide {
      display: none !important;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'attr.data-refresh-platform': 'true'
  }
})
export class ModalHeaderComponent {
  // Services
  private platformService = inject(PlatformService);

  // Inputs
  /** Force show header regardless of platform */
  forceShow = input<boolean>(false);
  /** Force hide header regardless of platform */
  forceHide = input<boolean>(false);

  // Computed properties
  showHeader = computed(() => {
    if (this.forceHide()) return false;
    if (this.forceShow()) return true;
    // Default behavior: show only on iOS
    return this.platformService.platform() === 'ios';
  });

  headerClasses = computed(() => ({
    'modal-header': true,
    'modal-header--force-show': this.forceShow(),
    'modal-header--force-hide': this.forceHide()
  }));
} 