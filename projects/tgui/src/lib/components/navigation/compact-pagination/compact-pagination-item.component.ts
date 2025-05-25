import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input,
  Output,
  EventEmitter,
  HostBinding,
  AfterContentInit,
  ElementRef,
  inject,
  signal,
  computed,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisuallyHiddenDirective } from '../../../directives/visually-hidden.directive';

/**
 * CompactPaginationItem component represents an individual dot in a compact pagination.
 * It visually indicates whether it is selected and provides accessibility features.
 */
@Component({
  selector: 'tgui-compact-pagination-item',
  standalone: true,
  imports: [CommonModule, VisuallyHiddenDirective],
  template: `
    <button
      type="button"
      role="tab"
      [attr.aria-selected]="isSelectedValue()"
      (click)="onClick()"
    >
      <span *ngIf="hasContent" tguiVisuallyHidden>
        <ng-content></ng-content>
      </span>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    
    button {
      cursor: pointer;
      display: block;
    
      width: 8px;
      height: 8px;
    
      padding: 0;
      border: none;
      border-radius: 50%;
    
      transition: opacity .15s ease-in-out;
      opacity: var(--tgui--compact-pagination--dot--opacity--selected, .25);
      background: var(--tgui--compact-pagination--dot--background--selected, var(--tgui--link_color));
    }
    
    :host.selected button {
      opacity: 1;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompactPaginationItemComponent implements AfterContentInit {
  /** External selected state */
  selected = input<boolean>(false);
  
  /** Internal selected state */
  private _isSelected = signal<boolean>(false);
  
  /** Computed selected value */
  isSelectedValue = computed(() => this._isSelected() || this.selected());
  
  /** Element reference */
  private elementRef = inject(ElementRef);
  
  /** Flag to determine if content exists */
  hasContent = false;
  
  /** Select event */
  @Output() select = new EventEmitter<void>();
  
  constructor() {
    effect(() => {
      this._isSelected.set(this.selected());
    });
  }
  
  ngAfterContentInit(): void {
    // Check if there is content
    const element = this.elementRef.nativeElement;
    this.hasContent = !!element.textContent?.trim();
  }
  
  /** Host binding for selected class */
  @HostBinding('class.selected')
  get isSelected(): boolean {
    return this.isSelectedValue();
  }
  
  /** Click handler */
  onClick(): void {
    this.select.emit();
  }
  
  /**
   * Public method to set selected state from parent component
   */
  setSelected(value: boolean): void {
    this._isSelected.set(value);
  }
} 