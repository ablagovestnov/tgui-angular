import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  computed,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

/**
 * Modal overlay component providing a backdrop behind the modal content.
 * Supports theme-aware background colors and customizable opacity.
 */
@Component({
  selector: 'tgui-modal-overlay',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="modal-overlay"
      [style]="overlayStyles()"
      [attr.aria-hidden]="'true'"
    ></div>
  `,
  styles: [`
    :host {
      display: contents;
    }

    .modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 999;
      background: rgba(0, 0, 0, 0.4);
      transition: opacity 300ms ease;
    }

    /* Theme-aware overlays */
    :host-context(.tgui-theme-light) .modal-overlay {
      background: rgba(0, 0, 0, 0.4);
    }

    :host-context(.tgui-theme-dark) .modal-overlay {
      background: rgba(0, 0, 0, 0.6);
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalOverlayComponent {
  // Services
  private themeService = inject(ThemeService);

  // Inputs
  /** Custom opacity for the overlay (0-1) */
  opacity = input<number | null>(null);
  /** Custom background color */
  backgroundColor = input<string | null>(null);

  // Computed properties
  overlayStyles = computed(() => {
    const styles: Record<string, any> = {};
    
    if (this.backgroundColor()) {
      styles['background'] = this.backgroundColor();
    } else if (this.opacity() !== null) {
      const isDark = this.themeService.appearance() === 'dark';
      const baseOpacity = isDark ? 0.6 : 0.4;
      const finalOpacity = this.opacity()! * baseOpacity;
      styles['background'] = `rgba(0, 0, 0, ${finalOpacity})`;
    }
    
    return styles;
  });
} 