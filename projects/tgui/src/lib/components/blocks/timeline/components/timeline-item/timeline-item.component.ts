import { Component, Input, ViewEncapsulation, HostBinding, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../../../../services/platform.service';
import { TextComponent } from '../../../../typography/text/text.component';
import { SubheadlineComponent } from '../../../../typography/subheadline/subheadline.component';

@Component({
  selector: 'tgui-timeline-item',
  standalone: true,
  imports: [CommonModule, TextComponent, SubheadlineComponent],
  template: `
    <div class="side">
      <div class="line"></div>
      <div class="dot"></div>
    </div>
    <div class="fields">
      <tgui-text class="title" weight="2" *ngIf="header">{{ header }}</tgui-text>
      <tgui-subheadline 
        [level]="platformService.platform() === 'ios' ? '1' : '2'"
        class="description"
      >
        <ng-content></ng-content>
      </tgui-subheadline>
    </div>
  `,
  styles: [`
    :host {
      --tgui--timeline--item--thickness: 4px;
      --tgui--timeline--item--size: 12px;
      display: flex;
      gap: 32px;
    }
    
    :host:last-child .line {
      display: none;
    }
    
    .side {
      position: relative;
      min-width: var(--tgui--timeline--item--size);
    }
    
    .dot {
      position: absolute;
      top: 4px;
      left: 0;
      width: var(--tgui--timeline--item--size);
      height: var(--tgui--timeline--item--size);
      border-radius: 50%;
      background: var(--tgui--quartenary_bg_color);
    }
    
    .line {
      position: absolute;
      top: 24px;
      bottom: 0;
      left: 50%;
      height: calc(100% - 4px);
      width: var(--tgui--timeline--item--thickness);
      border-radius: 2px;
      transform: translateX(-50%);
      background: var(--tgui--quartenary_bg_color);
    }
    
    .fields {
      overflow: hidden;
    }
    
    .title {
      display: block;
      margin-bottom: 4px;
    }
    
    .description {
      color: var(--tgui--hint_color);
    }
    
    :host.active .line,
    :host.active .dot {
      background: var(--tgui--link_color);
    }
    
    :host.pre-active .dot {
      background: var(--tgui--link_color);
    }
    
    :host.ios .side {
      --tgui--timeline--item--size: 16px;
    }
    
    :host.ios .dot {
      top: 6px;
    }
    
    :host.ios .line {
      top: 6px;
      height: calc(100% + 26px);
    }
    
    :host.horizontal {
      gap: 24px;
      flex-direction: column;
    }
    
    :host.horizontal .side {
      height: var(--tgui--timeline--item--size);
      display: flex;
      align-items: center;
    }
    
    :host.horizontal .dot {
      top: 0;
    }
    
    :host.horizontal .line {
      top: 50%;
      left: 0;
      height: var(--tgui--timeline--item--thickness);
      width: calc(100% + 36px);
      transform: translateY(-50%);
    }
    
    :host.horizontal .title {
      white-space: nowrap;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated
})
export class TimelineItemComponent {
  @Input() header?: string;
  @Input() mode?: 'active' | 'pre-active';
  @Input() horizontal?: boolean;
  
  protected platformService = inject(PlatformService);
  
  @HostBinding('class.active')
  get isActive(): boolean {
    return this.mode === 'active';
  }
  
  @HostBinding('class.pre-active')
  get isPreActive(): boolean {
    return this.mode === 'pre-active';
  }
  
  @HostBinding('class.ios')
  get isIOS(): boolean {
    return this.platformService.platform() === 'ios';
  }
  
  @HostBinding('class.horizontal')
  get isHorizontal(): boolean {
    return !!this.horizontal;
  }
} 