import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ProgressComponent } from '../progress.component';

const meta: Meta<ProgressComponent> = {
  title: 'Feedback/Progress',
  component: ProgressComponent,
  decorators: [
    moduleMetadata({
      imports: [ProgressComponent],
    }),
  ],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The current value of the progress bar (0-100)',
      defaultValue: 0
    }
  }
};

export default meta;
type Story = StoryObj<ProgressComponent>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px; margin: 20px;">
        <tgui-progress [value]="value"></tgui-progress>
      </div>
    `,
  }),
  args: {
    value: 50
  }
};

export const Examples: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px; display: flex; flex-direction: column; gap: 20px; margin: 20px;">
        <div>
          <p style="margin-bottom: 5px;">0%</p>
          <tgui-progress [value]="0"></tgui-progress>
        </div>
        <div>
          <p style="margin-bottom: 5px;">25%</p>
          <tgui-progress [value]="25"></tgui-progress>
        </div>
        <div>
          <p style="margin-bottom: 5px;">50%</p>
          <tgui-progress [value]="50"></tgui-progress>
        </div>
        <div>
          <p style="margin-bottom: 5px;">75%</p>
          <tgui-progress [value]="75"></tgui-progress>
        </div>
        <div>
          <p style="margin-bottom: 5px;">100%</p>
          <tgui-progress [value]="100"></tgui-progress>
        </div>
      </div>
    `
  })
}; 