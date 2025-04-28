import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Input,
  HostBinding,
  OnInit,
  inject,
  ElementRef,
  Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '@components/blocks/avatar/avatar.component';

/**
 * Компонент AvatarStack отображает контейнер для аватаров в стековом формате.
 * Позволяет визуально группировать аватары, часто используется для обозначения
 * нескольких пользователей или участников.
 * 
 * Аватары отображаются с перекрытием, которое регулируется через свойство offset.
 */
@Component({
  selector: 'tgui-avatar-stack',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="avatar-stack-container" [style.--tgui-avatar-stack-offset.px]="_offset">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: inline-flex;
    }
    
    .avatar-stack-container {
      display: flex;
      --tgui-avatar-stack-offset: -12px;
    }
    
    .avatar-stack-container > ::ng-deep tgui-avatar:not(:first-child) {
      margin-left: var(--tgui-avatar-stack-offset);
    }
    
    .avatar-stack-container > ::ng-deep tgui-avatar {
      box-shadow: 0 0 0 3px var(--tgui--bg_color);
    }
    
    /* Platform Specific */
    .tgui-platform-ios :host .avatar-stack-container > ::ng-deep tgui-avatar {
      box-shadow: 0 0 0 2px var(--tgui--bg_color);
    }
  `],
  host: {
    'attr.data-refresh-platform': 'true'
  },
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarStackComponent {
  /**
   * Смещение между аватарами в пикселях (по умолчанию -12px).
   * Отрицательное значение определяет степень перекрытия аватаров.
   * Чем меньше значение (например, -18px), тем сильнее перекрытие между аватарами.
   * Чем больше значение (например, -6px), тем меньше перекрытие между аватарами.
   */
  @Input() set offset(value: number) {
    this._offset = value;
  }
  get offset(): number {
    return this._offset;
  }
  _offset = -12;
  
  /**
   * Список аватаров внутри стека
   */
  @ContentChildren(AvatarComponent) avatars!: QueryList<AvatarComponent>;
  
} 