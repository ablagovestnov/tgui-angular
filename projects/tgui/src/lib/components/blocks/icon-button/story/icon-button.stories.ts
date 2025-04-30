import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from '../icon-button.component';
import { TappableComponent } from '../../../utils';

const meta: Meta<IconButtonComponent> = {
  title: 'Blocks/IconButton',
  component: IconButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, TappableComponent],
    }),
  ],
  argTypes: {
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'select' },
      description: 'Size of the icon button',
      table: {
        type: { summary: 's | m | l' },
        defaultValue: { summary: 'm' }
      }
    },
    mode: {
      options: ['bezeled', 'plain', 'gray', 'outline'],
      control: { type: 'select' },
      description: 'Visual style of the button',
      table: {
        type: { summary: 'bezeled | plain | gray | outline' },
        defaultValue: { summary: 'bezeled' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    interactiveAnimation: {
      options: ['opacity', 'background'],
      control: { type: 'select' },
      description: 'Type of animation on interaction',
      table: {
        type: { summary: 'opacity | background' },
        defaultValue: { summary: 'background' }
      }
    },
    type: {
      options: ['button', 'submit', 'reset'],
      control: { type: 'select' },
      description: 'HTML button type',
      table: {
        type: { summary: 'button | submit | reset' },
        defaultValue: { summary: 'button' }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'The IconButton component is designed for icon-only buttons. It supports different sizes and visual styles.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<IconButtonComponent>;

export const Default: Story = {
  args: {
    size: 'm',
    mode: 'bezeled',
    disabled: false,
    interactiveAnimation: 'background',
    type: 'button'
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-icon-button
        [size]="size"
        [mode]="mode"
        [disabled]="disabled"
        [interactiveAnimation]="interactiveAnimation"
        [type]="type"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5 10L12 3L19 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </tgui-icon-button>
    `
  })
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <tgui-icon-button size="s">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 17.5V2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.16667 8.33334L10 2.5L15.8333 8.33334" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </tgui-icon-button>
        
        <tgui-icon-button size="m">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 10L12 3L19 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </tgui-icon-button>
        
        <tgui-icon-button size="l">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 24.5V3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.83334 11.6667L14 3.5L22.1667 11.6667" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </tgui-icon-button>
      </div>
    `
  })
};

export const Modes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <tgui-icon-button mode="bezeled">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 10L12 3L19 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </tgui-icon-button>
        
        <tgui-icon-button mode="plain">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 10L12 3L19 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </tgui-icon-button>
        
        <tgui-icon-button mode="gray">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 10L12 3L19 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </tgui-icon-button>
        
        <tgui-icon-button mode="outline">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 10L12 3L19 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </tgui-icon-button>
      </div>
    `
  })
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <tgui-icon-button [disabled]="true" mode="bezeled">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 10L12 3L19 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </tgui-icon-button>
        
        <tgui-icon-button [disabled]="true" mode="plain">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 10L12 3L19 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </tgui-icon-button>
        
        <tgui-icon-button [disabled]="true" mode="gray">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 10L12 3L19 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </tgui-icon-button>
        
        <tgui-icon-button [disabled]="true" mode="outline">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 10L12 3L19 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </tgui-icon-button>
      </div>
    `
  })
}; 