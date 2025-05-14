import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { PopperComponent } from '../popper.component';
import { Component, ViewChild, ElementRef, inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { PlatformService } from '../../../../services';
import { ButtonComponent } from '../../../blocks/button/button.component';

@Component({
  selector: 'tgui-popper-demo',
  standalone: true,
  imports: [PopperComponent, ButtonComponent],
  template: `
    <div style="padding: 100px; display: flex; flex-direction: column; gap: 16px;">
      <div>
        <div #targetBtnWrapper>
          <tgui-button mode="filled" size="m" (click)="togglePopper()">
            {{ isPopperVisible ? 'Hide Popper' : 'Show Popper' }}
          </tgui-button>
        </div>
        
        <tgui-popper
          [targetRef]="targetElement"
          [placement]="placement"
          [offsetByMainAxis]="offsetByMainAxis"
          [offsetByCrossAxis]="offsetByCrossAxis"
          [sameWidth]="sameWidth"
          [flip]="flip"
          [shift]="shift"
          [hide]="hide"
          [visible]="isPopperVisible"
          [autoPlacement]="autoPlacement">
          <div style="padding: 16px;">
            <p style="margin: 0; padding: 0;">Popper Content</p>
            <p style="margin: 8px 0 0; padding: 0;">This is some content inside the popper</p>
          </div>
        </tgui-popper>
      </div>
    </div>
  `
})
class PopperDemoComponent implements AfterViewInit {
  @ViewChild('targetBtnWrapper') targetBtnWrapper!: ElementRef;
  
  platformService = inject(PlatformService);
  
  placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  targetElement: HTMLElement | null = null;
  isPopperVisible = false;
  
  ngAfterViewInit() {
    // Set the target element after view initialization
    this.targetElement = this.targetBtnWrapper.nativeElement;
  }
  
  togglePopper() {
    this.isPopperVisible = !this.isPopperVisible;
    
    // Force update after toggling to ensure proper positioning
    if (this.isPopperVisible) {
      setTimeout(() => {
        const event = new Event('resize');
        window.dispatchEvent(event);
      }, 50);
    }
  }
  
  offsetByMainAxis = 8;
  offsetByCrossAxis = 0;
  sameWidth = false;
  flip = true;
  shift = true;
  hide = false;
  autoPlacement = false;
}

@Component({
  selector: 'tgui-popper-toggle-demo',
  standalone: true,
  imports: [PopperComponent, ButtonComponent],
  template: `
    <div style="padding: 100px; display: flex; flex-direction: column; gap: 16px;">
      <div>
        <div #targetBtnWrapper>
          <tgui-button mode="filled" size="m" (click)="togglePopper()">
            {{ isPopperVisible ? 'Hide Popper' : 'Show Popper' }}
          </tgui-button>
        </div>
        
        <tgui-popper
          [targetRef]="targetElement"
          [placement]="placement"
          [offsetByMainAxis]="offsetByMainAxis"
          [offsetByCrossAxis]="offsetByCrossAxis"
          [sameWidth]="sameWidth"
          [flip]="flip"
          [shift]="shift"
          [hide]="hide"
          [visible]="isPopperVisible"
          [autoPlacement]="autoPlacement">
          <div style="padding: 16px;">
            <p style="margin: 0; padding: 0;">Popper Content</p>
            <p style="margin: 8px 0 0; padding: 0;">This is some content inside the popper</p>
          </div>
        </tgui-popper>
      </div>
    </div>
  `
})
class PopperToggleDemoComponent implements AfterViewInit {
  @ViewChild('targetBtnWrapper') targetBtnWrapper!: ElementRef;
  
  platformService = inject(PlatformService);
  
  placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  targetElement: HTMLElement | null = null;
  isPopperVisible = false;
  
  ngAfterViewInit() {
    // Set the target element after view initialization
    this.targetElement = this.targetBtnWrapper.nativeElement;
  }
  
  togglePopper() {
    this.isPopperVisible = !this.isPopperVisible;
    
    // Force update after toggling to ensure proper positioning
    if (this.isPopperVisible) {
      setTimeout(() => {
        const event = new Event('resize');
        window.dispatchEvent(event);
      }, 50);
    }
  }
  
  offsetByMainAxis = 8;
  offsetByCrossAxis = 0;
  sameWidth = false;
  flip = true;
  shift = true;
  hide = false;
  autoPlacement = false;
}

@Component({
  selector: 'tgui-popper-with-close-button-demo',
  standalone: true,
  imports: [PopperComponent, ButtonComponent],
  template: `
    <div style="padding: 100px; display: flex; flex-direction: column; gap: 16px;">
      <div>
        <div #targetBtnWrapper>
          <tgui-button mode="filled" size="m" (click)="openPopper()">
            Open Popper
          </tgui-button>
        </div>
        
        <tgui-popper
          [targetRef]="targetElement"
          [placement]="placement"
          [offsetByMainAxis]="offsetByMainAxis"
          [offsetByCrossAxis]="offsetByCrossAxis"
          [sameWidth]="sameWidth"
          [flip]="flip"
          [shift]="shift"
          [hide]="hide"
          [visible]="isPopperVisible"
          [autoPlacement]="autoPlacement">
          <div style="padding: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <p style="margin: 0; padding: 0; font-weight: bold;">Popper Title</p>
              <tgui-button mode="text" size="s" (click)="closePopper()">✕</tgui-button>
            </div>
            <p style="margin: 0; padding: 0;">Popper Content</p>
            <p style="margin: 8px 0 0; padding: 0;">This is some content inside the popper with a close button</p>
          </div>
        </tgui-popper>
      </div>
    </div>
  `,
  host: {
    '(document:click)': 'onDocumentClick($event)'
  }
})
class PopperWithCloseButtonDemoComponent implements AfterViewInit {
  @ViewChild('targetBtnWrapper') targetBtnWrapper!: ElementRef;
  
  platformService = inject(PlatformService);
  
  placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  targetElement: HTMLElement | null = null;
  isPopperVisible = false;
  
  ngAfterViewInit() {
    // Set the target element after view initialization
    this.targetElement = this.targetBtnWrapper.nativeElement;
  }
  
  openPopper() {
    this.isPopperVisible = true;
    
    // Force update after opening to ensure proper positioning
    setTimeout(() => {
      const event = new Event('resize');
      window.dispatchEvent(event);
    }, 50);
  }
  
  closePopper() {
    this.isPopperVisible = false;
  }
  
  onDocumentClick(event: MouseEvent) {
    // Close popper when clicking outside of it and outside the target button
    if (this.isPopperVisible) {
      const target = event.target as HTMLElement;
      const isClickInsidePopper = !!target.closest('.tgui-popper-body');
      const isClickOnTargetButton = this.targetElement?.contains(target);
      
      if (!isClickInsidePopper && !isClickOnTargetButton) {
        this.closePopper();
      }
    }
  }
  
  offsetByMainAxis = 8;
  offsetByCrossAxis = 0;
  sameWidth = false;
  flip = true;
  shift = true;
  hide = false;
  autoPlacement = false;
}

const meta: Meta<PopperDemoComponent> = {
  title: 'Components/Overlays/Popper',
  component: PopperDemoComponent,
  decorators: [
    moduleMetadata({
      imports: [PopperComponent, ButtonComponent],
    }),
  ],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'The preferred placement of the popper',
      defaultValue: 'bottom',
    },
    offsetByMainAxis: {
      control: { type: 'number', min: 0, max: 32, step: 2 },
      description: 'Offset along the main axis (in pixels)',
      defaultValue: 8,
    },
    offsetByCrossAxis: {
      control: { type: 'number', min: -32, max: 32, step: 2 },
      description: 'Offset along the cross axis (in pixels)',
      defaultValue: 0,
    },
    sameWidth: {
      control: 'boolean',
      description: 'Whether the popper should have the same width as the target element',
      defaultValue: false,
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
    },
    hide: {
      control: 'boolean',
      description: 'Whether the popper should hide when there is no space for it',
      defaultValue: false,
    },
    autoPlacement: {
      control: 'boolean',
      description: 'Whether the popper should auto-place in the available space',
      defaultValue: false,
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Popper component provides a way to position floating elements relative to a reference element.'
      }
    }
  },
};

export default meta;
type Story = StoryObj<PopperDemoComponent>;
type ToggleStory = StoryObj<PopperToggleDemoComponent>;
type CloseButtonStory = StoryObj<PopperWithCloseButtonDemoComponent>;

export const Default: Story = {};

export const TogglePopper: ToggleStory = {
  render: (args) => ({
    props: args,
    component: PopperToggleDemoComponent,
  }),
  parameters: {
    docs: {
      description: {
        story: 'A popper that can be toggled on and off with a button click.'
      }
    }
  }
};

export const PopperWithCloseButton: CloseButtonStory = {
  render: (args) => ({
    props: args,
    component: PopperWithCloseButtonDemoComponent,
  }),
  parameters: {
    docs: {
      description: {
        story: 'A popper with a close button inside and click-outside functionality to dismiss it.'
      }
    }
  }
};
