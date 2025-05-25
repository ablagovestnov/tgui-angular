import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SkeletonComponent } from '../skeleton.component';
import { CellComponent } from '../../../blocks/cell/cell.component';

const meta: Meta<SkeletonComponent> = {
  title: 'Feedback/Skeleton',
  component: SkeletonComponent,
  decorators: [
    moduleMetadata({
      imports: [SkeletonComponent, CellComponent],
    }),
  ],
  argTypes: {
    withoutAnimation: {
      control: 'boolean',
      description: 'If true, disables the shimmering animation of the skeleton.',
      defaultValue: false
    },
    visible: {
      control: 'boolean',
      description: 'If true, the skeleton overlay is shown above the content.',
      defaultValue: true
    }
  }
};

export default meta;
type Story = StoryObj<SkeletonComponent>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="
        width: 400px;
        border: 1px dashed #9747FF;
        border-radius: 5px;
        padding: 20px;
      ">
        <tgui-skeleton [withoutAnimation]="withoutAnimation" [visible]="visible">
          <tgui-cell subtitle="That's live">Hello!!!!</tgui-cell>
        </tgui-skeleton>
      </div>
    `,
  }),
  args: {
    withoutAnimation: false,
    visible: true
  }
}; 