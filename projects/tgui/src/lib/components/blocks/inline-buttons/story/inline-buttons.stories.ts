import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { InlineButtonsComponent } from '../inline-buttons.component';
import { InlineButtonsItemComponent } from '../components/inline-buttons-item.component';
import { TappableComponent } from '../../../utils';
import { TguiIcon24Chat } from '@tgui/lib/icons/icon24/tgui-icon24-chat';
import { TguiIcon24Notifications } from '@tgui/lib/icons/icon24/tgui-icon24-notifications';
import { TguiIcon24Qr } from '@tgui/lib/icons/icon24/tgui-icon24-qr';

const meta: Meta<InlineButtonsComponent> = {
  title: 'Blocks/InlineButtons',
  component: InlineButtonsComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        InlineButtonsItemComponent,
        TappableComponent,
        TguiIcon24Chat,
        TguiIcon24Notifications,
        TguiIcon24Qr
      ],
    }),
  ],
  argTypes: {
    mode: {
      options: ['plain', 'bezeled', 'gray'],
      control: { type: 'select' },
      description: 'Visual style of the buttons',
      table: {
        type: { summary: 'plain | bezeled | gray' },
        defaultValue: { summary: 'plain' }
      }
    }
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The InlineButtons component is a container for multiple inline button items, providing a consistent styling and layout. It is commonly used for action bars or tool strips.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<InlineButtonsComponent>;

export const Playground: Story = {
  args: {
    mode: 'plain'
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-inline-buttons [mode]="mode">
        <tgui-inline-buttons-item [text]="'Chat'">
            <tgui-icon24-chat></tgui-icon24-chat>
        </tgui-inline-buttons-item>
        <tgui-inline-buttons-item [text]="'Mute'">
            <tgui-icon24-notifications></tgui-icon24-notifications>
        </tgui-inline-buttons-item>
        <tgui-inline-buttons-item [text]="'QR'">
            <tgui-icon24-qr></tgui-icon24-qr>
        </tgui-inline-buttons-item>
      </tgui-inline-buttons>
    `
  })
};

export const Modes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3 style="margin-bottom: 8px; font-size: 14px; color: #666;">Plain Mode</h3>
          <tgui-inline-buttons mode="plain">
            <tgui-inline-buttons-item [text]="'Chat'">
              <tgui-icon24-chat></tgui-icon24-chat>
            </tgui-inline-buttons-item>
            <tgui-inline-buttons-item [text]="'Mute'">
              <tgui-icon24-notifications></tgui-icon24-notifications>
            </tgui-inline-buttons-item>
            <tgui-inline-buttons-item [text]="'QR'">
              <tgui-icon24-qr></tgui-icon24-qr>
            </tgui-inline-buttons-item>
          </tgui-inline-buttons>
        </div>

        <div>
          <h3 style="margin-bottom: 8px; font-size: 14px; color: #666;">Bezeled Mode</h3>
          <tgui-inline-buttons mode="bezeled">
            <tgui-inline-buttons-item [text]="'Chat'">
              <tgui-icon24-chat></tgui-icon24-chat>
            </tgui-inline-buttons-item>
            <tgui-inline-buttons-item [text]="'Mute'">
              <tgui-icon24-notifications></tgui-icon24-notifications>
            </tgui-inline-buttons-item>
            <tgui-inline-buttons-item [text]="'QR'">
              <tgui-icon24-qr></tgui-icon24-qr>
            </tgui-inline-buttons-item>
          </tgui-inline-buttons>
        </div>

        <div>
          <h3 style="margin-bottom: 8px; font-size: 14px; color: #666;">Gray Mode</h3>
          <tgui-inline-buttons mode="gray">
            <tgui-inline-buttons-item [text]="'Chat'">
              <tgui-icon24-chat></tgui-icon24-chat>
            </tgui-inline-buttons-item>
            <tgui-inline-buttons-item [text]="'Mute'">
              <tgui-icon24-notifications></tgui-icon24-notifications>
            </tgui-inline-buttons-item>
            <tgui-inline-buttons-item [text]="'QR'">
              <tgui-icon24-qr></tgui-icon24-qr>
            </tgui-inline-buttons-item>
          </tgui-inline-buttons>
        </div>
      </div>
    `
  })
};

export const ItemModes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h3 style="margin-bottom: 8px; font-size: 14px; color: #666;">Mixed Modes</h3>
          <tgui-inline-buttons mode="plain">
            <tgui-inline-buttons-item [text]="'Plain'">
              <tgui-icon24-chat></tgui-icon24-chat>
            </tgui-inline-buttons-item>
            <tgui-inline-buttons-item [mode]="'bezeled'" [text]="'Bezeled'">
              <tgui-icon24-notifications></tgui-icon24-notifications>
            </tgui-inline-buttons-item>
            <tgui-inline-buttons-item [mode]="'gray'" [text]="'Gray'">
              <tgui-icon24-qr></tgui-icon24-qr>
            </tgui-inline-buttons-item>
          </tgui-inline-buttons>
        </div>
      </div>
    `
  })
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px;">
        <tgui-inline-buttons mode="bezeled">
          <tgui-inline-buttons-item [text]="'Enabled'">
            <tgui-icon24-chat></tgui-icon24-chat>
          </tgui-inline-buttons-item>
          <tgui-inline-buttons-item [disabled]="true" [text]="'Disabled'">
            <tgui-icon24-notifications></tgui-icon24-notifications>
          </tgui-inline-buttons-item>
          <tgui-inline-buttons-item [text]="'Enabled'">
            <tgui-icon24-qr></tgui-icon24-qr>
          </tgui-inline-buttons-item>
        </tgui-inline-buttons>
      </div>
    `
  })
};