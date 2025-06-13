import { type Meta, type StoryObj } from '@storybook/angular';
import { ColorInputComponent } from '../color-input.component';

const meta: Meta<ColorInputComponent> = {
  title: 'Form/ColorInput',
  component: ColorInputComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ColorInputComponent>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="background: var(--tgui--secondary_bg_color); width: 500px;">
        <tgui-color-input
          [header]="header"
          [value]="value"
          [defaultValue]="defaultValue"
          [disabled]="disabled"
          [status]="status"
        ></tgui-color-input>
      </div>
    `,
  }),
  args: {
    header: 'Color',
    value: '#3389FF',
    defaultValue: '#EFEFF4',
    disabled: false,
    status: 'default',
  },
}; 