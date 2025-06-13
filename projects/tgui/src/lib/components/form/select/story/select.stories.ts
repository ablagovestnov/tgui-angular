import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { SelectComponent } from '../select.component';
import { ListComponent } from '../../../blocks/list/list.component';

const meta: Meta<SelectComponent> = {
  title: 'Form/Select',
  component: SelectComponent,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      imports: [SelectComponent, ListComponent]
    })
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SelectComponent>;

export const Playground: Story = {
  render: () => ({
    template: `
      <tgui-list style="width: 240px; background: var(--tgui--secondary_bg_color);">
        <tgui-select header="Select">
          <option>Hello</option>
          <option>Okay</option>
        </tgui-select>
      </tgui-list>
    `
  }),
}; 