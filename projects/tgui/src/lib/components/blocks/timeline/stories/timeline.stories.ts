import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TimelineComponent } from '../timeline.component';
import { TimelineItemComponent } from '../components/timeline-item/timeline-item.component';

const meta: Meta<TimelineComponent> = {
  title: 'Blocks/Timeline',
  component: TimelineComponent,
  decorators: [
    moduleMetadata({
      imports: [TimelineComponent, TimelineItemComponent]
    })
  ]
};

export default meta;
type Story = StoryObj<TimelineComponent>;

const timelineItems = [
  {
    key: '1',
    header: 'Arrived',
    content: 'Yesterday'
  },
  {
    key: '2',
    header: 'Departed',
    content: 'Today'
  },
  {
    key: '3',
    header: 'In transit',
    content: 'Tomorrow'
  },
  {
    key: '4',
    header: 'Processed to delivery center',
    content: 'Next week'
  },
  {
    key: '5',
    header: 'Shipped',
    content: 'Someday'
  }
];

export const Playground: Story = {
  args: {
    active: 2
  },
  render: (args) => ({
    props: {
      ...args,
      timelineItems
    },
    template: `
      <tgui-timeline [active]="active">
        <tgui-timeline-item 
          *ngFor="let item of timelineItems"
          [header]="item.header"
        >
          {{item.content}}
        </tgui-timeline-item>
      </tgui-timeline>
    `
  })
};

export const Horizontal: Story = {
  args: {
    ...Playground.args,
    horizontal: true
  },
  render: (args) => ({
    props: {
      ...args,
      timelineItems
    },
    template: `
      <tgui-timeline [active]="active" [horizontal]="horizontal">
        <tgui-timeline-item 
          *ngFor="let item of timelineItems"
          [header]="item.header"
        >
          {{item.content}}
        </tgui-timeline-item>
      </tgui-timeline>
    `
  })
}; 