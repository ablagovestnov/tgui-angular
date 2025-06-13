import { type Meta, type StoryObj } from '@storybook/angular';
import { PinInputCellComponent } from '../pin-input-cell.component';

const meta: Meta<PinInputCellComponent> = {
  title: 'Form/PinInputCell',
  component: PinInputCellComponent,
  tags: ['autodocs'],
  argTypes: {
    isTyped: {
      control: 'boolean',
      description: 'Whether the cell has a value typed',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      defaultValue: false,
    }
  },
  args: {
    isTyped: false,
    disabled: false
  }
};

export default meta;
type Story = StoryObj<PinInputCellComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `<tgui-pin-input-cell [isTyped]="isTyped" [disabled]="disabled"></tgui-pin-input-cell>`
  })
};

export const Typed: Story = {
  args: {
    isTyped: true
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const TypedAndDisabled: Story = {
  args: {
    isTyped: true,
    disabled: true
  }
}; 