import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SubheadlineComponent } from '../subheadline.component';

const meta: Meta<SubheadlineComponent> = {
  title: 'Typography/Subheadline',
  component: SubheadlineComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [SubheadlineComponent],
    }),
  ],
  argTypes: {
    level: {
      options: ['1', '2'],
      control: { type: 'select' },
      description: 'Size level of the subheadline',
      defaultValue: '1',
    },
    weight: {
      options: ['1', '2', '3'],
      control: { type: 'select' },
      description: 'Font weight',
      defaultValue: '3',
    },
    caps: {
      control: 'boolean',
      description: 'Transform text to uppercase',
      defaultValue: false,
    },
    plain: {
      control: 'boolean',
      description: 'Remove default margins',
      defaultValue: true,
    },
    tag: {
      control: 'text',
      description: 'HTML tag to render (optional, default is h6)',
      defaultValue: 'h6',
    },
  },
};

export default meta;
type Story = StoryObj<SubheadlineComponent>;

// Level 1 (default)
export const Level1: Story = {
  args: {
    level: '1',
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <tgui-subheadline level="1" weight="1">Subheadline Level 1 - Bold (h6)</tgui-subheadline>
        <tgui-subheadline level="1" weight="2">Subheadline Level 1 - Medium (h6)</tgui-subheadline>
        <tgui-subheadline level="1" weight="3">Subheadline Level 1 - Regular (h6)</tgui-subheadline>
      </div>
    `,
  }),
};

// Level 2 (smaller)
export const Level2: Story = {
  args: {
    level: '2',
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <tgui-subheadline level="2" weight="1">Subheadline Level 2 - Bold (h6)</tgui-subheadline>
        <tgui-subheadline level="2" weight="2">Subheadline Level 2 - Medium (h6)</tgui-subheadline>
        <tgui-subheadline level="2" weight="3">Subheadline Level 2 - Regular (h6)</tgui-subheadline>
      </div>
    `,
  }),
};

// All variations
export const AllVariations: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="margin-bottom: 16px;">
          <h3 style="margin-bottom: 12px;">Level 1 (Default, h6)</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <tgui-subheadline level="1" weight="1">Subheadline Level 1 - Bold (h6)</tgui-subheadline>
            <tgui-subheadline level="1" weight="2">Subheadline Level 1 - Medium (h6)</tgui-subheadline>
            <tgui-subheadline level="1" weight="3">Subheadline Level 1 - Regular (h6)</tgui-subheadline>
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 12px;">Level 2 (Smaller, h6)</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <tgui-subheadline level="2" weight="1">Subheadline Level 2 - Bold (h6)</tgui-subheadline>
            <tgui-subheadline level="2" weight="2">Subheadline Level 2 - Medium (h6)</tgui-subheadline>
            <tgui-subheadline level="2" weight="3">Subheadline Level 2 - Regular (h6)</tgui-subheadline>
          </div>
        </div>
      </div>
    `,
  }),
}; 
