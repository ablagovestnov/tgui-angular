import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BannerComponent } from '../banner.component';
import { ButtonComponent } from '../../button/button.component';
import { TguiIcon24QR } from '@tgui/lib/icons/icon24/tgui-icon24-qr';

const meta: Meta<BannerComponent> = {
  title: 'Blocks/Banner',
  component: BannerComponent,
  decorators: [
    moduleMetadata({
      imports: [BannerComponent, ButtonComponent, TguiIcon24QR],
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
  },
};

export default meta;
type Story = StoryObj<BannerComponent>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="background: var(--tgui--secondary_bg_color); padding: 8px;">
        <tgui-banner [type]="type" (onCloseIcon)="onCloseIcon($event)">
          <ng-template #before>
            <div tguiBannerBefore style="width: 48px; height: 48px; background: #eaeaea; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
            <tgui-icon24-qr></tgui-icon24-qr>
          </div>
          </ng-template>
          <ng-template #callout>Urgent notification</ng-template>
          <ng-template #header>Introducing TON Space</ng-template>
          <ng-template #description>Start exploring TON in a new, better way</ng-template>
          <ng-template #buttons>
            <div tguiBannerButtons>
              <tgui-button size="s">Try it out</tgui-button>
              <tgui-button size="s" mode="plain">Maybe later</tgui-button>
            </div>
          </ng-template>
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
        <ng-template #header>This is a banner</ng-template>
        <ng-template #description>Banner description that can span multiple lines and provide additional information about the banner content</ng-template>
        <div tguiBannerButtons>
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
        <ng-template #callout>New Feature</ng-template>
        <ng-template #header>This is a banner with callout</ng-template>
        <ng-template #description>Banner description that can span multiple lines and provide additional information about the banner content</ng-template>
        <div tguiBannerButtons>
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
        <ng-template #background>
          <div style="background: linear-gradient(45deg, #4158D0, #C850C0, #FFCC70); width: 100%; height: 100%;"></div>
        </ng-template>
        <ng-template #header>Banner with background</ng-template>
        <ng-template #description>Description text on a colorful background</ng-template>
        <div tguiBannerButtons>
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
        <div tguiBannerBefore style="width: 48px; height: 48px; background: #eee; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
          Icon
        </div>
        <ng-template #header>Banner with before content</ng-template>
        <ng-template #description>This banner has content before the main text</ng-template>
        <div tguiBannerButtons>
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
        <ng-template #header>Inline banner</ng-template>
        <ng-template #description>This banner uses the inline type</ng-template>
        <div tguiBannerButtons>
          <tgui-button size="s" mode="bezeled">Action</tgui-button>
        </div>
      </tgui-banner>
    `,
  }),
  args: {
    type: 'inline',
  },
}; 