import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { SegmentedControlItemComponent } from '../segmented-control-item.component';
import { CommonModule } from '@angular/common';

export default {
  title: 'Navigation/SegmentedControl/SegmentedControl.Item',
  component: SegmentedControlItemComponent,
  decorators: [
    moduleMetadata({
      imports: [SegmentedControlItemComponent, CommonModule]
    })
  ],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'Whether the item is selected',
      defaultValue: false
    }
  }
} as Meta<SegmentedControlItemComponent>;

type Story = StoryObj<SegmentedControlItemComponent>;

export const Default: Story = {
  args: {
    selected: false
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 200px; height: 40px; background: var(--tgui--tertiary_bg_color); padding: 2px; border-radius: 8px;">
        <tgui-segmented-control-item [selected]="selected">
          This is a SegmentedControl.Item
        </tgui-segmented-control-item>
      </div>
    `
  })
};

export const Selected: Story = {
  args: {
    selected: true
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 200px; height: 40px; background: var(--tgui--tertiary_bg_color); padding: 2px; border-radius: 8px;">
        <tgui-segmented-control-item [selected]="selected">
          This is a SegmentedControl.Item
        </tgui-segmented-control-item>
      </div>
    `
  })
}; 