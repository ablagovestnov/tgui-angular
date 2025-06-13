import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BannerComponent } from '../banner.component';
import { ButtonComponent } from '../../button/button.component';
import { TguiIcon24Qr } from '../../../../icons/icon24/tgui-icon24-qr';

const meta: Meta<BannerComponent> = {
  title: 'Blocks/Banner',
  component: BannerComponent,
  decorators: [
    moduleMetadata({
      imports: [BannerComponent, ButtonComponent, TguiIcon24Qr],
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
        <tgui-banner 
          [type]="type" 
          (onCloseIcon)="onCloseIcon($event)" 
          [closeIcon]="closeIcon"
          [beforeTemplate]="beforeTemplate"
          [calloutTemplate]="calloutTemplate"
          [headerTemplate]="headerTemplate"
          [descriptionTemplate]="descriptionTemplate"
          [buttonsTemplate]="buttonsTemplate">
        </tgui-banner>
        
        <ng-template #beforeTemplate>
          <div style="width: 48px; height: 48px; background: #eaeaea; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
            <tgui-icon24-qr></tgui-icon24-qr>
          </div>
        </ng-template>
        
        <ng-template #calloutTemplate>
          Urgent notification
        </ng-template>
        
        <ng-template #headerTemplate>
          Introducing TON Space
        </ng-template>
        
        <ng-template #descriptionTemplate>
          Start exploring TON in a new, better way
        </ng-template>
        
        <ng-template #buttonsTemplate>
          <tgui-button size="s">Try it out</tgui-button>
          <tgui-button size="s" mode="plain">Maybe later</tgui-button>
        </ng-template>
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
      <tgui-banner 
        [type]="type" 
        (onCloseIcon)="onCloseIcon($event)"
        [headerTemplate]="headerTemplate"
        [descriptionTemplate]="descriptionTemplate"
        [buttonsTemplate]="buttonsTemplate">
      </tgui-banner>
      
      <ng-template #headerTemplate>
        This is a banner
      </ng-template>
      
      <ng-template #descriptionTemplate>
        Banner description that can span multiple lines and provide additional information about the banner content
      </ng-template>
      
      <ng-template #buttonsTemplate>
        <tgui-button size="s" mode="bezeled">Action</tgui-button>
      </ng-template>
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
      <tgui-banner 
        [type]="type" 
        (onCloseIcon)="onCloseIcon($event)"
        [calloutTemplate]="calloutTemplate"
        [headerTemplate]="headerTemplate"
        [descriptionTemplate]="descriptionTemplate"
        [buttonsTemplate]="buttonsTemplate">
      </tgui-banner>
      
      <ng-template #calloutTemplate>
        New Feature
      </ng-template>
      
      <ng-template #headerTemplate>
        This is a banner with callout
      </ng-template>
      
      <ng-template #descriptionTemplate>
        Banner description that can span multiple lines and provide additional information about the banner content
      </ng-template>
      
      <ng-template #buttonsTemplate>
        <tgui-button size="s" mode="bezeled">Action</tgui-button>
      </ng-template>
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
      <tgui-banner 
        [type]="type" 
        (onCloseIcon)="onCloseIcon($event)"
        [backgroundTemplate]="backgroundTemplate"
        [headerTemplate]="headerTemplate"
        [descriptionTemplate]="descriptionTemplate"
        [buttonsTemplate]="buttonsTemplate">
      </tgui-banner>
      
      <ng-template #backgroundTemplate>
        <div style="background: linear-gradient(45deg, #4158D0, #C850C0, #FFCC70); width: 100%; height: 100%;"></div>
      </ng-template>
      
      <ng-template #headerTemplate>
        Banner with background
      </ng-template>
      
      <ng-template #descriptionTemplate>
        Description text on a colorful background
      </ng-template>
      
      <ng-template #buttonsTemplate>
        <tgui-button size="s" mode="white">Action</tgui-button>
      </ng-template>
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
      <tgui-banner 
        [type]="type" 
        (onCloseIcon)="onCloseIcon($event)"
        [beforeTemplate]="beforeTemplate"
        [headerTemplate]="headerTemplate"
        [descriptionTemplate]="descriptionTemplate"
        [buttonsTemplate]="buttonsTemplate">
      </tgui-banner>
      
      <ng-template #beforeTemplate>
        <div style="width: 48px; height: 48px; background: #eee; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
          Icon
        </div>
      </ng-template>
      
      <ng-template #headerTemplate>
        Banner with before content
      </ng-template>
      
      <ng-template #descriptionTemplate>
        This banner has content before the main text
      </ng-template>
      
      <ng-template #buttonsTemplate>
        <tgui-button size="s" mode="bezeled">Action</tgui-button>
      </ng-template>
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
      <tgui-banner 
        [type]="type" 
        (onCloseIcon)="onCloseIcon($event)"
        [headerTemplate]="headerTemplate"
        [descriptionTemplate]="descriptionTemplate"
        [buttonsTemplate]="buttonsTemplate">
      </tgui-banner>
      
      <ng-template #headerTemplate>
        Inline banner
      </ng-template>
      
      <ng-template #descriptionTemplate>
        This banner uses the inline type
      </ng-template>
      
      <ng-template #buttonsTemplate>
        <tgui-button size="s" mode="bezeled">Action</tgui-button>
      </ng-template>
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
      <tgui-banner 
        [type]="type" 
        (onCloseIcon)="onCloseIcon($event)" 
        [closeIcon]="closeIcon"
        [headerTemplate]="headerTemplate"
        [descriptionTemplate]="descriptionTemplate">
      </tgui-banner>
      
      <ng-template #headerTemplate>
        Banner with custom close icon
      </ng-template>
      
      <ng-template #descriptionTemplate>
        This banner has a custom close icon
      </ng-template>
    `,
  }),
  args: {
    type: 'section',
    closeIcon: 'tgui-icon24-qr'
  },
}; 