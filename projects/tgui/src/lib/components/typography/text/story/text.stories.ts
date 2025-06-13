import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { TextComponent } from '../text.component';

const meta: Meta<TextComponent> = {
  title: 'Typography/Text',
  component: TextComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TextComponent],
    }),
  ],
  argTypes: {
    level: {
      options: ['1', '2'],
      control: { type: 'select' },
      description: 'Size level of the text',
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
type Story = StoryObj<TextComponent>;

// Level 1 (default)
export const Level1: Story = {
  args: {
    level: '1',
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <tgui-text level="1" weight="1">Text Level 1 - Bold</tgui-text>
        <tgui-text level="1" weight="2">Text Level 1 - Medium</tgui-text>
        <tgui-text level="1" weight="3">Text Level 1 - Regular</tgui-text>
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
        <tgui-text level="2" weight="1">Text Level 2 - Bold</tgui-text>
        <tgui-text level="2" weight="2">Text Level 2 - Medium</tgui-text>
        <tgui-text level="2" weight="3">Text Level 2 - Regular</tgui-text>
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
            <tgui-text level="1" weight="1">Text Level 1 - Bold</tgui-text>
            <tgui-text level="1" weight="2">Text Level 1 - Medium</tgui-text>
            <tgui-text level="1" weight="3">Text Level 1 - Regular</tgui-text>
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 12px;">Level 2 (Smaller)</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <tgui-text level="2" weight="1">Text Level 2 - Bold</tgui-text>
            <tgui-text level="2" weight="2">Text Level 2 - Medium</tgui-text>
            <tgui-text level="2" weight="3">Text Level 2 - Regular</tgui-text>
          </div>
        </div>
      </div>
    `,
  }),
};

// Paragraph example
export const Paragraph: Story = {
  render: () => ({
    template: `
      <div style="max-width: 600px;">
        <tgui-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget ultricies ultrices, 
          nunc nisl aliquam nunc, quis ultricies nisl nunc eget nisl. Nullam euismod, nisl eget ultricies ultrices, 
          nunc nisl aliquam nunc, quis ultricies nisl nunc eget nisl. Nullam euismod, nisl eget ultricies ultrices, 
          nunc nisl aliquam nunc, quis ultricies nisl nunc eget nisl.
        </tgui-text>
      </div>
    `,
  }),
}; 
