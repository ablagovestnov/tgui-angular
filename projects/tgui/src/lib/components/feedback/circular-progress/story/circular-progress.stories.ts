import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CircularProgressComponent } from '../circular-progress.component';

const meta: Meta<CircularProgressComponent> = {
  title: 'Feedback/CircularProgress',
  component: CircularProgressComponent,
  decorators: [
    moduleMetadata({
      imports: [CircularProgressComponent],
    }),
  ],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the circular progress component',
      defaultValue: 'medium'
    },
    progress: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The current progress percentage (0-100)',
      defaultValue: 0
    }
  }
};

export default meta;
type Story = StoryObj<CircularProgressComponent>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; align-items: center; justify-content: center; padding: 20px;">
        <tgui-circular-progress 
          [size]="size" 
          [progress]="progress"
        ></tgui-circular-progress>
      </div>
    `,
  }),
  args: {
    size: 'medium',
    progress: 65
  }
};

export const Sizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; align-items: center; gap: 20px; padding: 20px;">
        <div>
          <p style="margin-bottom: 10px; text-align: center;">Small</p>
          <tgui-circular-progress size="small" [progress]="progress"></tgui-circular-progress>
        </div>
        <div>
          <p style="margin-bottom: 10px; text-align: center;">Medium</p>
          <tgui-circular-progress size="medium" [progress]="progress"></tgui-circular-progress>
        </div>
        <div>
          <p style="margin-bottom: 10px; text-align: center;">Large</p>
          <tgui-circular-progress size="large" [progress]="progress"></tgui-circular-progress>
        </div>
      </div>
    `,
  }),
  args: {
    progress: 65
  }
};

export const ProgressValues: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; padding: 20px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <tgui-circular-progress size="medium" [progress]="0"></tgui-circular-progress>
          <span>0%</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <tgui-circular-progress size="medium" [progress]="25"></tgui-circular-progress>
          <span>25%</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <tgui-circular-progress size="medium" [progress]="50"></tgui-circular-progress>
          <span>50%</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <tgui-circular-progress size="medium" [progress]="75"></tgui-circular-progress>
          <span>75%</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <tgui-circular-progress size="medium" [progress]="100"></tgui-circular-progress>
          <span>100%</span>
        </div>
      </div>
    `
  })
}; 