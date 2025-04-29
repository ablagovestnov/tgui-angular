import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  Input, 
  HostBinding, 
  OnInit
} from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { AvatarAcronymComponent } from './components/avatar-acronym/avatar-acronym.component';
import { AvatarBadgeComponent } from './components/avatar-badge/avatar-badge.component';

export type AvatarSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl';
export type AvatarShape = 'circle' | 'rounded' | 'square';

/**
 * The Avatar component displays an avatar with optional initials or image.
 * The component supports various sizes and shapes, as well as an online status indicator.
 */
@Component({
  selector: 'tgui-avatar',
  standalone: true,
  imports: [CommonModule, NgStyle, AvatarAcronymComponent],
  template: `
    <div 
      class="avatar-container"
      [ngStyle]="{ 'background-color': getBackgroundColor() }"
    >
      <img 
        *ngIf="src" 
        [src]="src" 
        [alt]="alt || 'Avatar'" 
        class="avatar-image"
      />
      
      <tgui-avatar-acronym 
        *ngIf="!src && initials" 
        [size]="size" 
        [initials]="initials"
      ></tgui-avatar-acronym>
    </div>
    
    <!-- Контент выведен за пределы avatar-container,
         чтобы не попадать под overflow: hidden -->
    <div class="avatar-content">
      <div 
        *ngIf="online" 
        class="avatar-online-badge"
      ></div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: inline-flex;
      position: relative;
    }
    
    .avatar-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background-color: var(--tgui--secondary_fill);
      position: relative;
      border-radius: inherit;
      z-index: 1;
    }
    
    .avatar-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2;
    }
    
    .avatar-content ::ng-deep > * {
      pointer-events: auto;
    }
    
    .avatar-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .avatar-online-badge {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 25%;
      height: 25%;
      min-width: 8px;
      min-height: 8px;
      background-color: var(--tgui--green);
      border: 2px solid var(--tgui--bg_color);
      border-radius: 50%;
      box-sizing: border-box;
      transform: translate(0, 0);
      z-index: 3;
    }
    
    /* Size Variants */
    :host.size-xxs {
      width: 20px;
      height: 20px;
    }
    
    :host.size-xs {
      width: 24px;
      height: 24px;
    }
    
    :host.size-s {
      width: 28px;
      height: 28px;
    }
    
    :host.size-m {
      width: 40px;
      height: 40px;
    }
    
    :host.size-l {
      width: 48px;
      height: 48px;
    }
    
    :host.size-xl {
      width: 96px;
      height: 96px;
    }
    
    /* Shape Variants */
    :host.shape-circle {
      border-radius: 50%;
    }
    
    :host.shape-rounded {
      border-radius: 8px;
    }
    
    :host.shape-square {
      border-radius: 0;
    }
    
    /* Platform Specific */
    :host-context(.tgui-platform-ios) :host.shape-rounded {
      border-radius: 10px;
    }
    
    /* Badge size adjustments */
    :host.size-xxs .avatar-online-badge {
      min-width: 6px;
      min-height: 6px;
      border-width: 1px;
    }
    
    :host.size-xs .avatar-online-badge {
      min-width: 6px;
      min-height: 6px;
      border-width: 1px;
    }
    
    :host.size-s .avatar-online-badge {
      min-width: 8px;
      min-height: 8px;
      border-width: 1.5px;
    }
    
    :host.size-l .avatar-online-badge {
      min-width: 10px;
      min-height: 10px;
      border-width: 2px;
    }
    
    :host.size-xl .avatar-online-badge {
      min-width: 16px;
      min-height: 16px;
      border-width: 3px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  /**
   * Avatar image URL
   */
  @Input() src?: string;
  
  /**
   * Text for initials if image is absent
   */
  @Input() initials?: string;
  
  /**
   * Avatar size ('xxs', 'xs', 's', 'm', 'l', 'xl')
   */
  @Input() size: AvatarSize = 'm';
  
  /**
   * Avatar shape ('circle', 'rounded', 'square')
   */
  @Input() shape: AvatarShape = 'circle';
  
  /**
   * Alternative text for the image
   */
  @Input() alt?: string;
  
  /**
   * Background color for avatar with initials
   */
  @Input() color?: string;
  
  /**
   * Online status indicator
   */
  @Input() online = false;
  
  // Host bindings для CSS классов
  @HostBinding('class.size-xxs') get isSizeXXS() { return this.size === 'xxs'; }
  @HostBinding('class.size-xs') get isSizeXS() { return this.size === 'xs'; }
  @HostBinding('class.size-s') get isSizeS() { return this.size === 's'; }
  @HostBinding('class.size-m') get isSizeM() { return this.size === 'm'; }
  @HostBinding('class.size-l') get isSizeL() { return this.size === 'l'; }
  @HostBinding('class.size-xl') get isSizeXL() { return this.size === 'xl'; }
  
  @HostBinding('class.shape-circle') get isShapeCircle() { return this.shape === 'circle'; }
  @HostBinding('class.shape-rounded') get isShapeRounded() { return this.shape === 'rounded'; }
  @HostBinding('class.shape-square') get isShapeSquare() { return this.shape === 'square'; }
  
  /**
   * Returns background color for avatar with initials
   */
  getBackgroundColor(): string {
    if (this.src) {
      return 'transparent';
    }
    
    if (this.color) {
      return this.color;
    }
    
    // Если нет изображения и не задан цвет явно
    return 'var(--tgui--secondary_fill)';
  }
} 