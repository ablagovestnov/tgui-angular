import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { LargeTitleComponent } from '../large-title.component';

const meta: Meta<LargeTitleComponent> = {
  title: 'Typography/LargeTitle',
  component: LargeTitleComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [LargeTitleComponent],
    }),
  ],
  argTypes: {
    level: {
      options: ['1', '2'],
      control: { type: 'select' },
      description: 'Size level of the large title',
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
      description: 'HTML tag to render (optional, default is h1)',
      defaultValue: 'h1',
    },
  },
};

export default meta;
type Story = StoryObj<LargeTitleComponent>;

// Level 1 (default)
export const Level1: Story = {
  args: {
    level: '1',
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <tgui-large-title level="1" weight="1">Large Title Level 1 - Bold</tgui-large-title>
        <tgui-large-title level="1" weight="2">Large Title Level 1 - Medium</tgui-large-title>
        <tgui-large-title level="1" weight="3">Large Title Level 1 - Regular</tgui-large-title>
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
        <tgui-large-title level="2" weight="1">Large Title Level 2 - Bold</tgui-large-title>
        <tgui-large-title level="2" weight="2">Large Title Level 2 - Medium</tgui-large-title>
        <tgui-large-title level="2" weight="3">Large Title Level 2 - Regular</tgui-large-title>
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
          <h3 style="margin-bottom: 12px;">Level 1 (Default)</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <tgui-large-title level="1" weight="1">Large Title Level 1 - Bold</tgui-large-title>
            <tgui-large-title level="1" weight="2">Large Title Level 1 - Medium</tgui-large-title>
            <tgui-large-title level="1" weight="3">Large Title Level 1 - Regular</tgui-large-title>
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 12px;">Level 2 (Smaller)</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <tgui-large-title level="2" weight="1">Large Title Level 2 - Bold</tgui-large-title>
            <tgui-large-title level="2" weight="2">Large Title Level 2 - Medium</tgui-large-title>
            <tgui-large-title level="2" weight="3">Large Title Level 2 - Regular</tgui-large-title>
          </div>
        </div>
      </div>
    `,
  }),
}; 
