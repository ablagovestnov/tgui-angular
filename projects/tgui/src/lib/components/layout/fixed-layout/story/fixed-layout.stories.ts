import { Meta, StoryObj } from '@storybook/angular';
import { FixedLayoutComponent } from '../fixed-layout.component';
import { ButtonComponent } from '../../../blocks/button/button.component';

const meta: Meta<FixedLayoutComponent> = {
  title: 'Layout/FixedLayout',
  component: FixedLayoutComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    vertical: {
      control: 'radio',
      options: ['top', 'bottom'],
      description: 'Vertical position of the layout',
      defaultValue: 'bottom',
    }
  },
};

export default meta;
type Story = StoryObj<FixedLayoutComponent>;

export const Playground: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="height: 200px; width: 300px; ">
        <tgui-fixed-layout vertical="top" style="padding: 16px;">
          <tgui-button size="l" [stretched]="true">
            This is FixedLayout with top vertical
          </tgui-button>
        </tgui-fixed-layout>
        
        <tgui-fixed-layout style="padding: 16px;">
          <tgui-button size="l" [stretched]="true">
            This is FixedLayout with default vertical
          </tgui-button>
        </tgui-fixed-layout>
      </div>
    `,
    moduleMetadata: {
      imports: [FixedLayoutComponent, ButtonComponent]
    }
  }),
};
