import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DividerComponent } from './divider.component';

const meta: Meta<DividerComponent> = {
  title: 'Misc/Divider',
  component: DividerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [DividerComponent],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<DividerComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 300px; padding: 16px; background: var(--tgui--secondary_bg_color);">
        <div style="padding: 10px 0; color: var(--tgui--text_color);">Element above divider</div>
        <tgui-divider></tgui-divider>
        <div style="padding: 10px 0; color: var(--tgui--text_color);">Element below divider</div>
      </div>
    `,
  }),
};

export const InList: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 300px; padding: 16px; background: var(--tgui--secondary_bg_color);">
        <div style="padding: 12px 0; color: var(--tgui--text_color);">First list item</div>
        <tgui-divider></tgui-divider>
        <div style="padding: 12px 0; color: var(--tgui--text_color);">Second list item</div>
        <tgui-divider></tgui-divider>
        <div style="padding: 12px 0; color: var(--tgui--text_color);">Third list item</div>
      </div>
    `,
  }),
};

export const CustomStyle: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 300px; padding: 16px; background: var(--tgui--secondary_bg_color);">
        <div style="padding: 10px 0; color: var(--tgui--text_color);">Regular divider</div>
        <tgui-divider></tgui-divider>
        <div style="padding: 10px 0; color: var(--tgui--text_color);">Custom divider</div>
        <tgui-divider style="border-color: var(--tgui--button_color); border-width: 2px;"></tgui-divider>
        <div style="padding: 10px 0; color: var(--tgui--text_color);">Element after divider</div>
      </div>
    `,
  }),
}; 