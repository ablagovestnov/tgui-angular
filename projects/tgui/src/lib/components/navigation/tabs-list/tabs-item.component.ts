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

/**
 * TabsItem component represents an individual tab within a TabsList.
 * It can be interactively selected to display associated content.
 */
@Component({
  selector: 'tgui-tabs-item',
  standalone: true,
  imports: [CommonModule, TappableComponent, TextComponent],
  template: `
    <tgui-tappable 
      role="tab"
      [attr.aria-selected]="isSelectedValue()"
      (click)="onClick()"
    >
      <tgui-text [weight]="isIOS && isSelectedValue() ? '1' : '2'" class="tab-text">
        <ng-content></ng-content>
      </tgui-text>
    </tgui-tappable>
  `,
  styles: [`
    :host {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      flex: 1 0 0;
      max-inline-size: 100%;
      height: 44px;
      border: none;
      border-radius: inherit;
      background: transparent;
      transition: color 125ms;
      color: var(--tgui--secondary_hint_color);
      min-width: 0; /* Important for text-overflow to work in flex containers */
    }

    :host.selected {
      color: var(--tgui--link_color);
    }

    tgui-tappable {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden; /* For content clipping */
    }
    
    .tab-text {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 100%;
      text-align: center;
      display: block;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'attr.data-refresh-platform': 'true'
  }
})
export class TabsItemComponent {
  /** External parameter for tab selection */
  selected = input<boolean>(false);
  
  /** Internal signal for managing selection state */
  private _isSelected = signal<boolean>(false);
  
  /** Computed value considering both sources (internal has priority) */
  isSelectedValue = computed(() => this._isSelected() || this.selected());
  
  /** Event that fires when tab is clicked */
  @Output() select = new EventEmitter<void>();
  
  /** Getting platform information */
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
  
  /** Tab click handler */
  onClick(): void {
    this.select.emit();
  }
  
  /**
   * Public method to set tab selection value
   * from parent component
   */
  setSelected(value: boolean): void {
    this._isSelected.set(value);
  }
} 