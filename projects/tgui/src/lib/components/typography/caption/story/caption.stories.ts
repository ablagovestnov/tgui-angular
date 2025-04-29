import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CaptionComponent } from '../caption.component';
const meta: Meta<CaptionComponent> = {
  title: 'Typography/Caption',
  component: CaptionComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CaptionComponent],
    }),
  ],
  argTypes: {
    level: {
      options: ['1', '2'],
      control: { type: 'select' },
      description: 'Size level of the caption',
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
      description: 'HTML tag to render (optional, default is span)',
      defaultValue: 'span',
    },
  },
};

export default meta;
type Story = StoryObj<CaptionComponent>;

// Level 1 (default)
export const Level1: Story = {
  args: {
    level: '1',
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <tgui-caption level="1" weight="1">Caption Level 1 - Bold</tgui-caption>
        <tgui-caption level="1" weight="2">Caption Level 1 - Medium</tgui-caption>
        <tgui-caption level="1" weight="3">Caption Level 1 - Regular</tgui-caption>
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
        <tgui-caption level="2" weight="1">Caption Level 2 - Bold</tgui-caption>
        <tgui-caption level="2" weight="2">Caption Level 2 - Medium</tgui-caption>
        <tgui-caption level="2" weight="3">Caption Level 2 - Regular</tgui-caption>
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
            <tgui-caption level="1" weight="1">Caption Level 1 - Bold</tgui-caption>
            <tgui-caption level="1" weight="2">Caption Level 1 - Medium</tgui-caption>
            <tgui-caption level="1" weight="3">Caption Level 1 - Regular</tgui-caption>
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 12px;">Level 2 (Smaller)</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <tgui-caption level="2" weight="1">Caption Level 2 - Bold</tgui-caption>
            <tgui-caption level="2" weight="2">Caption Level 2 - Medium</tgui-caption>
            <tgui-caption level="2" weight="3">Caption Level 2 - Regular</tgui-caption>
          </div>
        </div>
      </div>
    `,
  }),
};

// Caption in context
export const CaptionInContext: Story = {
  render: () => ({
    template: `
      <div style="max-width: 600px; display: flex; flex-direction: column; gap: 16px;">
        <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px;">
          <h4 style="margin-bottom: 8px;">Chart Title</h4>
          <div style="height: 150px; background-color: #f5f5f5; margin-bottom: 10px;"></div>
          <tgui-caption level="2">Chart data source: Example Dataset, 2023</tgui-caption>
        </div>
        
        <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px;">
          <img style="width: 100%; height: 200px; background-color: #f5f5f5; margin-bottom: 10px;" />
          <tgui-caption level="1">Photo by Example Photographer © 2023</tgui-caption>
        </div>
      </div>
    `,
  }),
}; 
