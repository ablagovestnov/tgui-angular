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
import { AvatarComponent } from '../avatar/avatar.component';

/**
 * The AvatarStack component displays a container for avatars in a stack format.
 * It allows to visually group avatars, often used to represent
 * multiple users or participants.
 * 
 * Avatars are displayed with overlap, which is adjusted through the offset property.
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
    :host-context(.tgui-platform-ios) :host .avatar-stack-container > ::ng-deep tgui-avatar {
      box-shadow: 0 0 0 2px var(--tgui--bg_color);
    }
  `],
  host: {
    'attr.data-refresh-platform': 'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarStackComponent {
  /**
   * Offset between avatars in pixels (default -12px).
   * Negative value determines the degree of overlap between avatars.
   * The smaller the value (e.g., -18px), the greater the overlap between avatars.
   * The larger the value (e.g., -6px), the less the overlap between avatars.
   */
  @Input() set offset(value: number) {
    this._offset = value;
  }
  get offset(): number {
    return this._offset;
  }
  _offset = -12;
  
  /**
   * List of avatars inside the stack
   */
  @ContentChildren(AvatarComponent) avatars!: QueryList<AvatarComponent>;
  
} 