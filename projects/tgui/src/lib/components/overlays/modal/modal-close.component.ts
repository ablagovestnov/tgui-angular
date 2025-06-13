import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  inject,
  HostListener,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TappableComponent } from '../../utils/tappable/tappable.component';

/**
 * Modal close button component providing accessible close functionality.
 * Must be used within a Modal component to function properly.
 * Supports custom content and interactive animations.
 */
@Component({
  selector: 'tgui-modal-close',
  standalone: true,
  imports: [
    CommonModule,
    TappableComponent
  ],
  template: `
    <tgui-tappable
      class="modal-close"
      [interactiveAnimation]="interactiveAnimation()"
      role="button"
      tabindex="0"
      [attr.aria-label]="ariaLabel()"
      (click)="handleClick()"
    >
      <ng-content></ng-content>
    </tgui-tappable>
  `,
  styles: [`
    :host {
      display: contents;
    }

    .modal-close {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      min-height: 44px;
      border-radius: 50%;
      color: var(--tgui--hint_color);
      cursor: pointer;
      transition: color 150ms ease;
    }

    .modal-close:hover {
      color: var(--tgui--text_color);
    }

    .modal-close:focus-visible {
      outline: 2px solid var(--tgui--link_color);
      outline-offset: 2px;
    }

    /* Icon sizing */
    .modal-close :global(svg) {
      width: 28px;
      height: 28px;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalCloseComponent {
  // Inputs
  /** Type of interactive animation */
  interactiveAnimation = input<'opacity' | 'background'>('opacity');
  /** Custom aria-label for accessibility */
  ariaLabel = input<string>('Close modal');

  // Click handler
  handleClick(): void {
    // The actual close logic is handled by the parent Modal component
    // This component just provides the UI and triggers the event
    this.closeModal();
  }

  // Keyboard event handling
  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick();
    }
  }

  private closeModal(): void {
    // Find parent modal and close it
    // This works by bubbling up the event tree
    const event = new CustomEvent('modal-close', { 
      bubbles: true, 
      cancelable: true 
    });
    
    // Dispatch the event to let parent Modal component handle it
    document.dispatchEvent(event);
  }
} 