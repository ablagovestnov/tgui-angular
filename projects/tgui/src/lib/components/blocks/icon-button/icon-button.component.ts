import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  HostBinding,
  ElementRef,
  inject,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TappableComponent } from '../../utils';

/**
 * Renders an icon button with customizable size and mode. It utilizes the `Tappable` component for enhanced
 * touch interaction, allowing it to serve various UI actions efficiently.
 */
@Component({
  selector: 'tgui-icon-button',
  standalone: true,
  imports: [CommonModule, TappableComponent],
  template: `
    <tgui-tappable 
      [interactiveAnimation]="interactiveAnimation()" 
      [readonly]="disabled()"
      [disabled]="disabled()"
      class="icon-button-tappable"
    >
      <ng-content></ng-content>
    </tgui-tappable>
  `,
  styleUrls: ['./icon-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconButtonComponent {
  /** Specifies the button size, affecting icon scaling. Recommended icon sizes are 20px for 's', 24px for 'm', and 28px for 'l'. */
  size = input<'s' | 'm' | 'l'>('m');
  
  /** Defines the button's visual style, affecting its color and background. */
  mode = input<'filled' | 'bezeled' | 'plain' | 'gray' | 'outline' | 'white'>('bezeled');
  
  /** Disables the button */
  disabled = input<boolean>(false);
  
  /** Type of interactive animation */
  interactiveAnimation = input<'opacity' | 'background'>('background');
  
  /** Type of button */
  type = input<'button' | 'submit' | 'reset'>('button');
  
  private elementRef = inject(ElementRef);
  
  // Host bindings for size classes
  @HostBinding('class.size-s') get isSizeS() { return this.size() === 's'; }
  @HostBinding('class.size-m') get isSizeM() { return this.size() === 'm'; }
  @HostBinding('class.size-l') get isSizeL() { return this.size() === 'l'; }
  
  // Host bindings for mode classes
  @HostBinding('class.mode-filled') get isModeFilled() { return this.mode() === 'filled'; }
  @HostBinding('class.mode-bezeled') get isModeBezeled() { return this.mode() === 'bezeled'; }
  @HostBinding('class.mode-plain') get isModePlain() { return this.mode() === 'plain'; }
  @HostBinding('class.mode-gray') get isModeGray() { return this.mode() === 'gray'; }
  @HostBinding('class.mode-outline') get isModeOutline() { return this.mode() === 'outline'; }
  @HostBinding('class.mode-white') get isModeWhite() { return this.mode() === 'white'; }
  
  // Host bindings for state
  @HostBinding('class.disabled') get isDisabled() { return this.disabled(); }
  @HostBinding('attr.type') get buttonType() { return this.type(); }
  @HostBinding('attr.disabled') get buttonDisabled() { return this.disabled() ? true : null; }
} 