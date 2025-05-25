import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  inject,
  input,
  HostBinding,
  Output,
  EventEmitter,
  signal,
  computed,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TappableComponent } from '../../utils/tappable/tappable.component';
import { TextComponent } from '../../typography/text/text.component';
import { PlatformService } from '../../../services/platform.service';
import { CaptionComponent } from "../../typography/caption/caption.component";

/**
 * SegmentedControlItem component represents an individual item within a SegmentedControl.
 * It can be interactively selected to display associated content.
 */
@Component({
  selector: 'tgui-segmented-control-item',
  standalone: true,
  imports: [CommonModule, TappableComponent, TextComponent, CaptionComponent],
  template: `
    <tgui-tappable 
      role="tab"
      [attr.aria-selected]="isSelectedValue()"
      (click)="onClick()"
      class="wrapper"
      [class.ios-tappable]="isIOS"
    >
      <tgui-caption [weight]="isSelectedValue() ? '2' : '3'">  
        <ng-content></ng-content>
      </tgui-caption>
    </tgui-tappable>
  `,
  styles: [`
    :host {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      flex: 1 1 0;
      max-inline-size: 100%;
      height: 100%;
      border: none;
      border-radius: inherit;
      background: transparent;
      z-index: var(--tgui--z-index--simple);
      color: var(--tgui--text_color);
      display: flex;
    }

    .wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 10px 24px;
      border: none;
      border-radius: inherit;
      background: transparent;
      z-index: var(--tgui--z-index--simple);
      color: var(--tgui--text_color);
    }
    
    .wrapper.ios-tappable {
      padding: 6px 24px;
    }

    ::ng-deep tgui-caption {
      text-align: center;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'attr.data-refresh-platform': 'true'
  }
})
export class SegmentedControlItemComponent {
  /** External parameter to mark item as selected */
  selected = input<boolean>(false);
  
  /** Internal signal to manage selection state */
  private _isSelected = signal<boolean>(false);
  
  /** Computed value that considers both sources (internal has priority) */
  isSelectedValue = computed(() => this._isSelected() || this.selected());
  
  /** Event triggered when the item is clicked */
  @Output() select = new EventEmitter<void>();
  
  /** Platform service to check platform type */
  private platformService = inject(PlatformService);
  
  constructor() {
    // Synchronize internal signal with external when external changes
    effect(() => {
      this._isSelected.set(this.selected());
    });
  }
  
  /** Check if platform is iOS */
  get isIOS(): boolean {
    return this.platformService.isIOS();
  }
  
  /** Bind selected class to host */
  @HostBinding('class.selected')
  get isSelected(): boolean {
    return this.isSelectedValue();
  }
  
  /** Handle click on the item */
  onClick(): void {
    this.select.emit();
  }
  
  /**
   * Public method to set the selection state
   * from the parent component
   */
  setSelected(value: boolean): void {
    this._isSelected.set(value);
  }
} 