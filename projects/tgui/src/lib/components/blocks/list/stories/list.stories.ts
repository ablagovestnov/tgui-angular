import { type Meta, type StoryObj } from '@storybook/angular';
import { ListComponent } from '../list.component';
import { CommonModule } from '@angular/common';

const meta: Meta<ListComponent> = {
  title: 'Blocks/List',
  component: ListComponent,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<ListComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tgui-list>
        <div style="background: var(--tgui--secondary_fill); padding: 16px; border-radius: 12px;">List item 1</div>
        <div style="background: var(--tgui--secondary_fill); padding: 16px; border-radius: 12px;">List item 2</div>
        <div style="background: var(--tgui--secondary_fill); padding: 16px; border-radius: 12px;">List item 3</div>
      </tgui-list>
    `,
  }),
}; 