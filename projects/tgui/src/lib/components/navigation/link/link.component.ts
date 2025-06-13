import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  computed,
  input,
  InputSignal
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Link component provides a customizable anchor element.
 * Used for navigation with proper styling following the Telegram UI guidelines.
 */
@Component({
  selector: 'tgui-link',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      [attr.href]="href()"
      [attr.target]="target()"
      [attr.rel]="rel()"
      [attr.title]="title()"
      [attr.aria-label]="ariaLabel()"
    >
      <ng-content></ng-content>
    </a>
  `,
  styles: [`
    :host {
      display: inline;
    }
    
    a {
      text-decoration: none;
      color: var(--tgui--link_color);
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent {
  /** URL that the hyperlink points to */
  href = input<string>('');
  
  /** Specifies where to open the linked document */
  target = input<string>('');
  
  /** Specifies the relationship between the current document and the linked document */
  rel = input<string>('');
  
  /** Specifies extra information about an element */
  title = input<string>('');
  
  /** Accessible label for the link */
  ariaLabel = input<string>('');
} 