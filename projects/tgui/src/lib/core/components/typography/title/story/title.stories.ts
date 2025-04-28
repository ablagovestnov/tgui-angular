import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { TitleComponent } from '../title.component';

const meta: Meta<TitleComponent> = {
  title: 'Typography/Title',
  component: TitleComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TitleComponent],
    }),
  ],
  argTypes: {
    level: {
      options: ['1', '2', '3'],
      control: { type: 'select' },
      description: 'Size level of the title, determines size and semantic tag (h2, h3, h4)',
      defaultValue: '2',
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
      description: 'HTML tag to render (optional, defaults based on level)',
    },
  },
};

export default meta;
type Story = StoryObj<TitleComponent>;

// Level 1 (h2)
export const Title1: Story = {
  args: {
    level: '1',
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <tgui-title level="1" weight="1">Title Level 1 - Bold (h2)</tgui-title>
        <tgui-title level="1" weight="2">Title Level 1 - Medium (h2)</tgui-title>
        <tgui-title level="1" weight="3">Title Level 1 - Regular (h2)</tgui-title>
      </div>
    `,
  }),
};

// Level 2 (h3)
export const Title2: Story = {
  args: {
    level: '2',
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <tgui-title level="2" weight="1">Title Level 2 - Bold (h3)</tgui-title>
        <tgui-title level="2" weight="2">Title Level 2 - Medium (h3)</tgui-title>
        <tgui-title level="2" weight="3">Title Level 2 - Regular (h3)</tgui-title>
      </div>
    `,
  }),
};

// Level 3 (h4)
export const Title3: Story = {
  args: {
    level: '3',
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <tgui-title level="3" weight="1">Title Level 3 - Bold (h4)</tgui-title>
        <tgui-title level="3" weight="2">Title Level 3 - Medium (h4)</tgui-title>
        <tgui-title level="3" weight="3">Title Level 3 - Regular (h4)</tgui-title>
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
          <h3 style="margin-bottom: 12px;">Level 1 (h2)</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <tgui-title level="1" weight="1">Title Level 1 - Bold (h2)</tgui-title>
            <tgui-title level="1" weight="2">Title Level 1 - Medium (h2)</tgui-title>
            <tgui-title level="1" weight="3">Title Level 1 - Regular (h2)</tgui-title>
          </div>
        </div>
        
        <div style="margin-bottom: 16px;">
          <h3 style="margin-bottom: 12px;">Level 2 (h3)</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <tgui-title level="2" weight="1">Title Level 2 - Bold (h3)</tgui-title>
            <tgui-title level="2" weight="2">Title Level 2 - Medium (h3)</tgui-title>
            <tgui-title level="2" weight="3">Title Level 2 - Regular (h3)</tgui-title>
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 12px;">Level 3 (h4)</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <tgui-title level="3" weight="1">Title Level 3 - Bold (h4)</tgui-title>
            <tgui-title level="3" weight="2">Title Level 3 - Medium (h4)</tgui-title>
            <tgui-title level="3" weight="3">Title Level 3 - Regular (h4)</tgui-title>
          </div>
        </div>
      </div>
    `,
  }),
}; 
