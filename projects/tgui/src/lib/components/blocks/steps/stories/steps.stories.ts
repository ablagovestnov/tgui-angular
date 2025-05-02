import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { StepsComponent } from '../steps.component';

const meta: Meta<StepsComponent> = {
  title: 'Blocks/Steps',
  component: StepsComponent,
  decorators: [
    moduleMetadata({
      imports: [StepsComponent]
    })
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<StepsComponent>;

export const Playground: Story = {
  args: {
    count: 10,
    progress: 5,
  },
};

export const FewSteps: Story = {
  args: {
    count: 3,
    progress: 1,
  },
};

export const ManySteps: Story = {
  args: {
    count: 20,
    progress: 15,
  },
}; 