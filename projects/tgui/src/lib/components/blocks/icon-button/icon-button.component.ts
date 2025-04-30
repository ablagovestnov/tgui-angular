import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  Input, 
  HostBinding,
  ElementRef,
  inject
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
      [interactiveAnimation]="interactiveAnimation" 
      [readonly]="disabled"
      [disabled]="disabled"
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
  @Input() size: 's' | 'm' | 'l' = 'm';
  
  /** Defines the button's visual style, affecting its color and background. */
  @Input() mode: 'bezeled' | 'plain' | 'gray' | 'outline' = 'bezeled';
  
  /** Disables the button */
  @Input() disabled = false;
  
  /** Type of interactive animation */
  @Input() interactiveAnimation: 'opacity' | 'background' = 'background';
  
  /** Type of button */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  
  private elementRef = inject(ElementRef);
  
  // Host bindings for size classes
  @HostBinding('class.size-s') get isSizeS() { return this.size === 's'; }
  @HostBinding('class.size-m') get isSizeM() { return this.size === 'm'; }
  @HostBinding('class.size-l') get isSizeL() { return this.size === 'l'; }
  
  // Host bindings for mode classes
  @HostBinding('class.mode-bezeled') get isModeBezeled() { return this.mode === 'bezeled'; }
  @HostBinding('class.mode-plain') get isModePlain() { return this.mode === 'plain'; }
  @HostBinding('class.mode-gray') get isModeGray() { return this.mode === 'gray'; }
  @HostBinding('class.mode-outline') get isModeOutline() { return this.mode === 'outline'; }
  
  // Host bindings for state classes
  @HostBinding('class.disabled') get isDisabled() { return this.disabled; }
  
  // Host bindings for attributes
  @HostBinding('attr.type') get buttonType() { return this.type; }
  @HostBinding('attr.disabled') get buttonDisabled() { return this.disabled ? true : null; }
} 