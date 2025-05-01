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
        <div style="padding: 10px 0; color: var(--tgui--text_color);">Элемент выше разделителя</div>
        <tgui-divider></tgui-divider>
        <div style="padding: 10px 0; color: var(--tgui--text_color);">Элемент ниже разделителя</div>
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
        <div style="padding: 12px 0; color: var(--tgui--text_color);">Первый элемент списка</div>
        <tgui-divider></tgui-divider>
        <div style="padding: 12px 0; color: var(--tgui--text_color);">Второй элемент списка</div>
        <tgui-divider></tgui-divider>
        <div style="padding: 12px 0; color: var(--tgui--text_color);">Третий элемент списка</div>
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
        <div style="padding: 10px 0; color: var(--tgui--text_color);">Обычный разделитель</div>
        <tgui-divider></tgui-divider>
        <div style="padding: 10px 0; color: var(--tgui--text_color);">Кастомный разделитель</div>
        <tgui-divider style="border-color: var(--tgui--button_color); border-width: 2px;"></tgui-divider>
        <div style="padding: 10px 0; color: var(--tgui--text_color);">Элемент после разделителя</div>
      </div>
    `,
  }),
}; 