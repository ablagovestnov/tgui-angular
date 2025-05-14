import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { PopperComponent } from '../popper.component';
import { Component, inject } from '@angular/core';
import { TouchComponent, TouchEvent } from '../../../utils/touch/touch.component';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../../../services';

@Component({
  selector: 'tgui-touch-popper-demo',
  standalone: true,
  imports: [PopperComponent, TouchComponent, CommonModule],
  template: `
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 16px;">
      <h3 style="margin: 0 0 8px 0; color: #333;">Interactive Touch Popper</h3>
      <p style="margin: 0 0 16px 0; color: #666;">Touch or click anywhere in the area below to see the popper appear at that exact location.</p>
      
      <div style="position: relative;">
        <tgui-touch
          (onStart)="handleTouch($event)"
          style="display: block; width: 100%; height: 300px; background-color: #f7f7f7; border: 1px dashed #ccc; border-radius: 12px; display: flex; align-items: center; justify-content: center; user-select: none; overflow: hidden;">
          <div style="text-align: center; color: #666; display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 16L12 12M12 12L16 16M12 12V21M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935" stroke="#666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Touch anywhere in this area</span>
          </div>
          <tgui-popper
          *ngIf="showPopper"
          [targetRef]="virtualElement"
          [placement]="placement"
          [offsetByMainAxis]="offsetByMainAxis"
          [flip]="flip"
          [shift]="shift">
          <div style="padding: 16px; min-width: 180px; max-width: 250px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <p style="margin: 0; padding: 0; font-weight: bold; font-size: 14px;">Touch Position</p>
              <button 
                style="background: none; border: none; cursor: pointer; padding: 2px; color: #999; font-size: 18px; line-height: 1;"
                (click)="hidePopper()"
                title="Close">
                ×
              </button>
            </div>
            <div style="display: flex; gap: 8px; align-items: center; font-size: 13px; color: #666; margin-bottom: 8px;">
              <div style="width: 6px; height: 6px; background-color: #4285F4; border-radius: 50%;"></div>
              <span>X: {{ touchPosition.x | number:'1.0-0' }}</span>
            </div>
            <div style="display: flex; gap: 8px; align-items: center; font-size: 13px; color: #666;">
              <div style="width: 6px; height: 6px; background-color: #EA4335; border-radius: 50%;"></div>
              <span>Y: {{ touchPosition.y | number:'1.0-0' }}</span>
            </div>
          </div>
        </tgui-popper>
        </tgui-touch>
        
      </div>
      
      <div style="margin-top: 8px; padding: 12px; background-color: #f0f0f0; border-radius: 8px; font-size: 13px; color: #666;">
        <p style="margin: 0; font-style: italic;">The popper will automatically hide after 3 seconds or when you click elsewhere.</p>
      </div>
    </div>
  `,
  host: {
    '(document:click)': 'onDocumentClick($event)'
  }
})
class TouchPopperDemoComponent {
  platformService = inject(PlatformService);
  
  showPopper = false;
  placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
  offsetByMainAxis = 8;
  flip = true;
  shift = true;
  
  touchPosition = { x: 0, y: 0 };
  private popperTimerId: number | null = null;
  private lastTouchTarget: EventTarget | null = null;
  
  // Virtual element that will be used as the reference for the popper
  virtualElement = {
    getBoundingClientRect: () => ({
      width: 5,
      height: 5,
      top: this.touchPosition.y,
      right: this.touchPosition.x + 5,
      bottom: this.touchPosition.y + 5,
      left: this.touchPosition.x,
      x: this.touchPosition.x,
      y: this.touchPosition.y,
    })
  };
  
  handleTouch(event: TouchEvent) {
    // Сначала скрываем существующий поппер, если он показан
    // Это обеспечит "эффект обновления" при повторном клике
    const wasShowing = this.showPopper;
    this.hidePopper();
    
    // Обновляем координаты касания
    this.touchPosition = {
      x: event.startX,
      y: event.startY
    };
    
    // Немного задержки перед показом нового поппера
    // Это создаст визуальный эффект "нового" поппера даже при клике в то же место
    setTimeout(() => {
      // Отображаем поппер на новых координатах
      this.showPopper = true;
      
      // Устанавливаем таймер для автоматического скрытия
      this.popperTimerId = window.setTimeout(() => {
        this.hidePopper();
      }, 3000);
      
      // Сохраняем target для предотвращения мгновенного закрытия
      this.lastTouchTarget = event.originalEvent.target;
    }, wasShowing ? 50 : 0); // Небольшая задержка, если поппер уже был показан
  }
  
  hidePopper() {
    this.showPopper = false;
    if (this.popperTimerId !== null) {
      window.clearTimeout(this.popperTimerId);
      this.popperTimerId = null;
    }
  }
  
  onDocumentClick(event: MouseEvent) {
    // If the click is on the last touch target, ignore it (prevents immediate closing)
    if (event.target === this.lastTouchTarget) {
      return;
    }
    
    // Check if the click is inside the popper
    const path = event.composedPath();
    const isClickInsidePopper = path.some(element => {
      if (element instanceof HTMLElement) {
        return element.classList.contains('tgui-popper-body');
      }
      return false;
    });
    
    // Hide the popper if the click is outside
    if (!isClickInsidePopper && this.showPopper) {
      this.hidePopper();
    }
  }
}

const meta: Meta<TouchPopperDemoComponent> = {
  title: 'Components/Overlays/Popper/Touch',
  component: TouchPopperDemoComponent,
  decorators: [
    moduleMetadata({
      imports: [PopperComponent, TouchComponent, CommonModule],
    }),
  ],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'The preferred placement of the popper',
      defaultValue: 'top',
    },
    offsetByMainAxis: {
      control: { type: 'number', min: 0, max: 32, step: 2 },
      description: 'Offset along the main axis (in pixels)',
      defaultValue: 8,
    },
    flip: {
      control: 'boolean',
      description: 'Whether the popper should flip to the opposite side when it overflows',
      defaultValue: true,
    },
    shift: {
      control: 'boolean',
      description: 'Whether the popper should shift to stay in view when it would overflow',
      defaultValue: true,
    }
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Interactive Touch Popper shows how to display a popper at the exact location where a user touches or clicks on the screen.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<TouchPopperDemoComponent>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'This example shows how to use the Popper component with a touch zone. The popper appears at the exact location where the user clicks or taps and automatically disappears after 3 seconds or when clicking outside of it.'
      }
    }
  }
}; 