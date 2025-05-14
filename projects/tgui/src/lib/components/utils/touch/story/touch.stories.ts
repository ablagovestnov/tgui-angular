import { Meta, StoryObj } from '@storybook/angular';
import { signal, WritableSignal } from '@angular/core';
import { TouchComponent, TouchEvent } from '../touch.component';

const meta: Meta<TouchComponent> = {
  title: 'Utils/Touch',
  component: TouchComponent,
  tags: ['autodocs'],
  argTypes: {
    usePointerHover: {
      control: 'boolean',
      description: 'Use pointer events for hover instead of mouse events',
      defaultValue: false
    },
    useCapture: {
      control: 'boolean',
      description: 'Use capture phase for events',
      defaultValue: false
    },
    slideThreshold: {
      control: { type: 'number', min: 1, max: 50 },
      description: 'Threshold in pixels before a touch is considered a slide',
      defaultValue: 5
    },
    noSlideClick: {
      control: 'boolean',
      description: 'Prevent clicks after a slide is detected',
      defaultValue: false
    },
    stopPropagation: {
      control: 'boolean',
      description: 'Stop event propagation',
      defaultValue: false
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
A component for handling touch and gesture events.
This component helps in handling swipe gestures and detecting various touch interactions.
It's especially useful for implementing custom touch behaviors like swipeable lists, carousels, etc.
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<TouchComponent>;

interface StoryComponentProps {
  lastEvent: WritableSignal<string>;
  swipePosition: WritableSignal<number>;
}

export const Basic: Story = {
  render: () => ({
    props: {
      lastEvent: signal<string>('No events yet'),
      onStart(event: TouchEvent): void {
        (this as unknown as StoryComponentProps).lastEvent.set(`Start - X: ${event.startX}, Y: ${event.startY}`);
      },
      onMove(event: TouchEvent): void {
        (this as unknown as StoryComponentProps).lastEvent.set(`Move - Shift X: ${event.shiftX}, Shift Y: ${event.shiftY}`);
      },
      onEnd(event: TouchEvent): void {
        (this as unknown as StoryComponentProps).lastEvent.set(`End - Duration: ${event.duration}ms`);
      }
    },
    template: `
      <div style="width: 100%; padding: 16px;">
        <h3>Touch Component Demo</h3>
        
        <div>
          <tgui-touch
            [usePointerHover]="usePointerHover"
            [useCapture]="useCapture"
            [slideThreshold]="slideThreshold"
            [noSlideClick]="noSlideClick"
            [stopPropagation]="stopPropagation"
            (onStart)="onStart($event)"
            (onMove)="onMove($event)"
            (onEnd)="onEnd($event)"
            style="display: block; width: 100%; height: 200px; background-color: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; user-select: none; touch-action: manipulation;"
          >
            <div style="text-align: center;">
              Touch or swipe here
            </div>
          </tgui-touch>
        </div>
        
        <div style="margin-top: 16px; padding: 8px; background-color: #eee; border-radius: 4px;">
          <strong>Last Event:</strong> {{ lastEvent() }}
        </div>
      </div>
    `
  })
};

export const HorizontalSwipe: Story = {
  render: () => {
    let startPosition = 0;
    
    return {
      props: {
        swipePosition: signal<number>(0),
        onStart(event: TouchEvent): void {
          startPosition = event.startX;
        },
        onMoveX(event: TouchEvent): void {
          const shift = Math.min(Math.max(-100, event.shiftX), 100);
          (this as unknown as StoryComponentProps).swipePosition.set(shift);
        }
      },
      template: `
        <div style="width: 100%; padding: 16px;">
          <h3>Horizontal Swipe Demo</h3>
          
          <div style="position: relative; overflow: hidden; width: 100%; height: 100px; background-color: #e0e0e0; border-radius: 8px;">
            <tgui-touch
              [slideThreshold]="5"
              (onStart)="onStart($event)"
              (onMoveX)="onMoveX($event)"
              style="display: block; width: 100%; height: 100%; touch-action: pan-y;"
            >
              <div 
                style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 80px; height: 80px; margin: 10px; background-color: #2196F3; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; user-select: none;"
                [style.transform]="'translateX(' + swipePosition() + 'px)'">
                Swipe me
              </div>
            </tgui-touch>
          </div>
          
          <div style="margin-top: 16px; text-align: center;">
            <small>Swipe the blue box left and right</small>
          </div>
        </div>
      `
    };
  }
};

export const VerticalSwipe: Story = {
  render: () => {
    let startPosition = 0;
    
    return {
      props: {
        swipePosition: signal<number>(0),
        onStart(event: TouchEvent): void {
          startPosition = event.startY;
        },
        onMoveY(event: TouchEvent): void {
          const shift = Math.min(Math.max(-50, event.shiftY), 50);
          (this as unknown as StoryComponentProps).swipePosition.set(shift);
        }
      },
      template: `
        <div style="width: 100%; padding: 16px;">
          <h3>Vertical Swipe Demo</h3>
          
          <div style="position: relative; overflow: hidden; width: 100%; height: 200px; background-color: #e0e0e0; border-radius: 8px;">
            <tgui-touch
              [slideThreshold]="5"
              (onStart)="onStart($event)"
              (onMoveY)="onMoveY($event)"
              style="display: block; width: 100%; height: 100%; touch-action: pan-x;"
            >
              <div 
                style="position: absolute; left: 50%; transform: translateX(-50%); top: 60px; width: 80px; height: 80px; background-color: #4CAF50; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; user-select: none;"
                [style.transform]="'translateY(' + swipePosition() + 'px)'">
                Swipe me
              </div>
            </tgui-touch>
          </div>
          
          <div style="margin-top: 16px; text-align: center;">
            <small>Swipe the green box up and down</small>
          </div>
        </div>
      `
    };
  }
};