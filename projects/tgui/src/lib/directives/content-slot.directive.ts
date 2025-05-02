import { Directive, Input } from '@angular/core';

/**
 * A directive for selecting content slots in components.
 * This allows components to project content into specific areas using the content-slot attribute.
 * 
 * @example
 * ```html
 * <div content-slot="header">Header Content</div>
 * ```
 */
@Directive({
  selector: '[content-slot]',
  standalone: true
})
export class ContentSlotDirective {
  @Input('content-slot') slotName!: string;
} 