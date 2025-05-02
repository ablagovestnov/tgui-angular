import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BannerComponent } from '../banner.component';
import { ButtonComponent } from '../../button/button.component';
import { TguiIcon24Qr } from '@tgui/lib/icons/icon24/tgui-icon24-qr';
import { ContentSlotDirective } from '../../../../directives/content-slot.directive';

const meta: Meta<BannerComponent> = {
  title: 'Blocks/Banner',
  component: BannerComponent,
  decorators: [
    moduleMetadata({
      imports: [BannerComponent, ButtonComponent, TguiIcon24Qr, ContentSlotDirective],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    type: {
      options: ['section', 'inline'],
      control: { type: 'select' },
      description: 'Specifies the banner\'s layout style',
      table: {
        defaultValue: { summary: 'section' },
      },
    },
    onCloseIcon: { 
      action: 'onCloseIcon' 
    },
    closeIcon: {
      control: 'text',
      description: 'Custom close icon name to display',
    }
  },
};

export default meta;
type Story = StoryObj<BannerComponent>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="background: var(--tgui--secondary_bg_color); padding: 8px;">
        <tgui-banner [type]="type" (onCloseIcon)="onCloseIcon($event)" [closeIcon]="closeIcon">
          <div content-slot="before" style="width: 48px; height: 48px; background: #eaeaea; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
            <tgui-icon24-qr></tgui-icon24-qr>
          </div>
          <div content-slot="callout">Urgent notification</div>
          <div content-slot="header">Introducing TON Space</div>
          <div content-slot="description">Start exploring TON in a new, better way</div>
          <div content-slot="buttons">
            <tgui-button size="s">Try it out</tgui-button>
            <tgui-button size="s" mode="plain">Maybe later</tgui-button>
          </div>
        </tgui-banner>
      </div>
    `,
  }),
  args: {
    type: 'section',
  },
};

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tgui-banner [type]="type" (onCloseIcon)="onCloseIcon($event)">
        <div content-slot="header">This is a banner</div>
        <div content-slot="description">Banner description that can span multiple lines and provide additional information about the banner content</div>
        <div content-slot="buttons">
          <tgui-button size="s" mode="bezeled">Action</tgui-button>
        </div>
      </tgui-banner>
    `,
  }),
  args: {
    type: 'section',
  },
};

export const WithCallout: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tgui-banner [type]="type" (onCloseIcon)="onCloseIcon($event)">
        <div content-slot="callout">New Feature</div>
        <div content-slot="header">This is a banner with callout</div>
        <div content-slot="description">Banner description that can span multiple lines and provide additional information about the banner content</div>
        <div content-slot="buttons">
          <tgui-button size="s" mode="bezeled">Action</tgui-button>
        </div>
      </tgui-banner>
    `,
  }),
  args: {
    type: 'section',
  },
};

export const WithBackground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tgui-banner [type]="type" (onCloseIcon)="onCloseIcon($event)">
        <div content-slot="background">
          <div style="background: linear-gradient(45deg, #4158D0, #C850C0, #FFCC70); width: 100%; height: 100%;"></div>
        </div>
        <div content-slot="header">Banner with background</div>
        <div content-slot="description">Description text on a colorful background</div>
        <div content-slot="buttons">
          <tgui-button size="s" mode="white">Action</tgui-button>
        </div>
      </tgui-banner>
    `,
  }),
  args: {
    type: 'section',
  },
};

export const WithBeforeContent: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tgui-banner [type]="type" (onCloseIcon)="onCloseIcon($event)">
        <div content-slot="before" style="width: 48px; height: 48px; background: #eee; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
          Icon
        </div>
        <div content-slot="header">Banner with before content</div>
        <div content-slot="description">This banner has content before the main text</div>
        <div content-slot="buttons">
          <tgui-button size="s" mode="bezeled">Action</tgui-button>
        </div>
      </tgui-banner>
    `,
  }),
  args: {
    type: 'section',
  },
};

export const InlineType: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tgui-banner [type]="type" (onCloseIcon)="onCloseIcon($event)">
        <div content-slot="header">Inline banner</div>
        <div content-slot="description">This banner uses the inline type</div>
        <div content-slot="buttons">
          <tgui-button size="s" mode="bezeled">Action</tgui-button>
        </div>
      </tgui-banner>
    `,
  }),
  args: {
    type: 'inline',
  },
};

export const CustomCloseIcon: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tgui-banner [type]="type" (onCloseIcon)="onCloseIcon($event)" [closeIcon]="closeIcon">
        <div content-slot="header">Banner with custom close icon</div>
        <div content-slot="description">This banner has a custom close icon</div>
      </tgui-banner>
    `,
  }),
  args: {
    type: 'section',
    closeIcon: 'tgui-icon24-qr'
  },
}; 