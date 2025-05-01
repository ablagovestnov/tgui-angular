import { Meta, StoryObj } from '@storybook/angular';
import { IconContainerComponent } from '../icon-container.component';

const meta: Meta<IconContainerComponent> = {
  title: 'Blocks/IconContainer',
  component: IconContainerComponent,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `
      <tgui-icon-container>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
        </svg>
      </tgui-icon-container>
    `,
  }),
};

export default meta;
type Story = StoryObj<IconContainerComponent>;

export const Default: Story = {
  args: {},
}; 