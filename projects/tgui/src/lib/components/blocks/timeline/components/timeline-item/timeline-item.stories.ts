import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TimelineItemComponent } from './timeline-item.component';

const meta: Meta<TimelineItemComponent> = {
  title: 'Blocks/Timeline/Timeline Item',
  component: TimelineItemComponent,
  decorators: [
    moduleMetadata({
      imports: [TimelineItemComponent]
    })
  ]
};

export default meta;
type Story = StoryObj<TimelineItemComponent>;

export const Playground: Story = {
  args: {
    header: 'It\'s my header = header prop',
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-timeline-item [header]="header">
        It's my description = content projection
      </tgui-timeline-item>
    `
  })
}; 