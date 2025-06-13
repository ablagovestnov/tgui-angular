import { type Meta, type StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../button.component';
// import { SpinnerComponent } from '@feedback/spinner/spinner.component';
// import { RippleComponent } from '@utils/tappable/components/ripple/ripple.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../feedback/spinner/spinner.component';
import { RippleComponent } from '../../../utils/tappable/components/ripple/ripple.component';
import { TguiIcon20Copy } from '../../../../icons/icon20/tgui-icon20-copy';
import { TguiIcon24PersonRemove } from '../../../../icons/icon24/tgui-icon24-person-remove';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ButtonComponent> = {
  title: 'Blocks/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  decorators: [],
  argTypes: {
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'select' },
      description: 'Button size',
      defaultValue: 'm',
    },
    mode: {
      options: ['filled', 'bezeled', 'plain', 'gray', 'outline', 'white'],
      control: { type: 'select' },
      description: 'Button display variant',
      defaultValue: 'filled',
    },
    stretched: {
      control: 'boolean',
      description: 'Stretch button to full width',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      description: 'Show loading indicator',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      defaultValue: false,
    },
    interactiveAnimation: {
      options: ['opacity', 'background'],
      control: { type: 'radio' },
      description: 'Type of interaction animation',
      defaultValue: 'background',
    },
    icon: {
      control: 'text',
      description: 'Button icon',
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic: Story = {
  args: {
    size: 'm',
    mode: 'filled',
    stretched: false,
    loading: false,
    disabled: false,
    interactiveAnimation: 'background'
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-button 
        [size]="size" 
        [mode]="mode" 
        [stretched]="stretched" 
        [loading]="loading" 
        [disabled]="disabled"
        [interactiveAnimation]="interactiveAnimation"
      >
        Action
      </tgui-button>
    `,
  }),
};


export const WithDynamicIcon: Story = {
  args: {
    size: 's',
    mode: 'filled',
    icon: 'tgui-icon20-copy'
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 16px;">
        <tgui-button 
          [size]="size" 
          [mode]="mode"
          [icon]="icon"
        >
          Create channel
        </tgui-button>
      </div>
    `,
  }),
};

export const IconSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
        <tgui-button size="s" [icon]="'tgui-icon20-copy'">Small</tgui-button>
        <tgui-button size="m" [icon]="'tgui-icon24-person-remove'">Medium</tgui-button>
        <tgui-button size="l" [icon]="'tgui-icon28-close'">Large</tgui-button>
      </div>
    `,
  }),
};

export const Modes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 16px;">
        <tgui-button mode="filled">Filled</tgui-button>
        <tgui-button mode="bezeled">Bezeled</tgui-button>
        <tgui-button mode="plain">Plain</tgui-button>
        <tgui-button mode="gray">Gray</tgui-button>
        <tgui-button mode="outline">Outline</tgui-button>
        <tgui-button mode="white">White</tgui-button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
        <tgui-button size="s">Small</tgui-button>
        <tgui-button size="m">Medium</tgui-button>
        <tgui-button size="l">Large</tgui-button>
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <tgui-button [loading]="true">Loading</tgui-button>
        </div>
        <div>
          <tgui-button [disabled]="true">Disabled</tgui-button>
        </div>
        <div style="width: 100%;">
          <tgui-button [stretched]="true">Stretched button</tgui-button>
        </div>
      </div>
    `,
  }),
};

export const RippleEffects: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="margin-bottom: 8px;">
          <strong>Ripple effect (background)</strong>
          <p>Click on the button to see the ripple effect (works on non-iOS platforms)</p>
        </div>
        <div style="display: flex; gap: 16px;">
          <tgui-button interactiveAnimation="background" mode="filled">Background Ripple</tgui-button>
          <tgui-button interactiveAnimation="background" mode="bezeled">Background Ripple</tgui-button>
          <tgui-button interactiveAnimation="background" mode="plain">Background Ripple</tgui-button>
        </div>
        
        <div style="margin: 16px 0 8px 0;">
          <strong>Without ripple (opacity)</strong>
        </div>
        <div style="display: flex; gap: 16px;">
          <tgui-button interactiveAnimation="opacity" mode="filled">Opacity Effect</tgui-button>
          <tgui-button interactiveAnimation="opacity" mode="bezeled">Opacity Effect</tgui-button>
          <tgui-button interactiveAnimation="opacity" mode="plain">Opacity Effect</tgui-button>
        </div>
      </div>
    `,
  }),
};
