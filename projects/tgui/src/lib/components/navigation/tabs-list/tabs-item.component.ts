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
      min-width: 0; /* Важно для работы text-overflow в flex-контейнерах */
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
      overflow: hidden; /* Для обрезки контента */
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
  /** Внешний параметр выбора вкладки */
  selected = input<boolean>(false);
  
  /** Внутренний сигнал для управления состоянием выбора */
  private _isSelected = signal<boolean>(false);
  
  /** Вычисляемое значение, учитывающее оба источника (приоритет у внутреннего) */
  isSelectedValue = computed(() => this._isSelected() || this.selected());
  
  /** Событие, срабатывающее при клике на вкладку */
  @Output() select = new EventEmitter<void>();
  
  /** Получение информации о платформе */
  private platformService = inject(PlatformService);
  
  constructor() {
    // Синхронизируем внутренний сигнал с внешним при изменении внешнего
    effect(() => {
      this._isSelected.set(this.selected());
    });
  }
  
  /** Проверка, является ли платформа iOS */
  get isIOS(): boolean {
    return this.platformService.isIOS();
  }
  
  /** Привязка класса selected к хосту */
  @HostBinding('class.selected')
  get isSelected(): boolean {
    return this.isSelectedValue();
  }
  
  /** Обработчик клика по вкладке */
  onClick(): void {
    this.select.emit();
  }
  
  /**
   * Публичный метод для установки значения выбранности таба
   * из родительского компонента
   */
  setSelected(value: boolean): void {
    this._isSelected.set(value);
  }
} 