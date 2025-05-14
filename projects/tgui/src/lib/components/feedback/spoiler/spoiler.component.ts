import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input, 
  signal,
  HostBinding,
  HostListener,
  ElementRef,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Provides a way to hide or show content, such as details or spoilers, with a simple click.
 * The visibility state can be controlled externally via props or toggled by user interaction.
 */
@Component({
  selector: 'tgui-spoiler',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      position: relative;
      display: table;
    }

    :host::before {
      position: absolute;
      content: '';
      inset: 0;
      background-color: var(--tgui--bg_color);
      background-image: url('./icons/spoiler.svg');
      background-repeat: round;
      background-position: center;
      z-index: var(--tgui--z-index--simple);
      transition: .4s ease;
    }

    :host.visible::before {
      opacity: 0;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'attr.data-refresh-platform': 'true'
  }
})
export class SpoilerComponent {
  private elementRef = inject(ElementRef);

  // Input property for controlling visibility
  visible = input<boolean>(false);
  
  // Internal state for visibility
  private isVisible = signal(this.visible());

  // Apply visible class based on internal state
  @HostBinding('class.visible')
  get isVisibleState(): boolean {
    return this.isVisible();
  }

  // Handle changes to input property
  ngOnChanges(): void {
    this.isVisible.set(this.visible());
  }

  // Toggle visibility on click
  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    this.isVisible.update(state => !state);
    event.stopPropagation();
  }

  // Handle keyboard accessibility
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    this.isVisible.update(state => !state);
    event.preventDefault();
    event.stopPropagation();
  }
} 