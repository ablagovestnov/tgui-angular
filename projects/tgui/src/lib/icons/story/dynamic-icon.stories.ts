import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { TguiDynamicIconComponent } from '../dynamic-icon.component';

const meta: Meta<TguiDynamicIconComponent> = {
  title: 'Icons/Dynamic Icon',
  component: TguiDynamicIconComponent,
  decorators: [
    moduleMetadata({
      imports: [TguiDynamicIconComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      description: 'Name of the icon to render',
    }
  },
};

export default meta;
type Story = StoryObj<TguiDynamicIconComponent>;

export const Default: Story = {
  args: {
    icon: 'close',
  },
};

export const WithDifferentSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; color: var(--tgui--link_color); align-items: center;">
        <tgui-dynamic-icon [icon]="'close-28'"></tgui-dynamic-icon>
        <tgui-dynamic-icon [icon]="'quote-12'"></tgui-dynamic-icon>
        <tgui-dynamic-icon [icon]="'qr-24'"></tgui-dynamic-icon>
        <tgui-dynamic-icon [icon]="'backspace-36'"></tgui-dynamic-icon>
      </div>
    `,
  }),
};


export const AutosizingIcons: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <tgui-dynamic-icon [icon]="'close'"></tgui-dynamic-icon>
        <tgui-dynamic-icon [icon]="'chat'"></tgui-dynamic-icon>
        <tgui-dynamic-icon [icon]="'chevron-left'"></tgui-dynamic-icon>
        <tgui-dynamic-icon [icon]="'chevron-right'"></tgui-dynamic-icon>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'When no size is specified in the icon name, the component automatically tries to use the smallest available size (12) first, then tries larger sizes if needed.',
      },
    },
  },
}; 