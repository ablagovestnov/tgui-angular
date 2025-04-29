import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { HeadlineComponent } from '../headline.component';

const meta: Meta<HeadlineComponent> = {
  title: 'Typography/Headline',
  component: HeadlineComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [HeadlineComponent],
    }),
  ],
  argTypes: {
    level: {
      options: ['1', '2'],
      control: { type: 'select' },
      description: 'Size level of the headline',
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
      description: 'HTML tag to render (optional, default is h5)',
      defaultValue: 'h5',
    },
  },
};

export default meta;
type Story = StoryObj<HeadlineComponent>;

// Level 1 (default)
export const Level1: Story = {
  args: {
    level: '1',
  },
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <tgui-headline level="1" weight="1">Headline Level 1 - Bold (h5)</tgui-headline>
        <tgui-headline level="1" weight="2">Headline Level 1 - Medium (h5)</tgui-headline>
        <tgui-headline level="1" weight="3">Headline Level 1 - Regular (h5)</tgui-headline>
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
        <tgui-headline level="2" weight="1">Headline Level 2 - Bold (h5)</tgui-headline>
        <tgui-headline level="2" weight="2">Headline Level 2 - Medium (h5)</tgui-headline>
        <tgui-headline level="2" weight="3">Headline Level 2 - Regular (h5)</tgui-headline>
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
          <h3 style="margin-bottom: 12px;">Level 1 (Default, h5)</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <tgui-headline level="1" weight="1">Headline Level 1 - Bold (h5)</tgui-headline>
            <tgui-headline level="1" weight="2">Headline Level 1 - Medium (h5)</tgui-headline>
            <tgui-headline level="1" weight="3">Headline Level 1 - Regular (h5)</tgui-headline>
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 12px;">Level 2 (Smaller, h5)</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <tgui-headline level="2" weight="1">Headline Level 2 - Bold (h5)</tgui-headline>
            <tgui-headline level="2" weight="2">Headline Level 2 - Medium (h5)</tgui-headline>
            <tgui-headline level="2" weight="3">Headline Level 2 - Regular (h5)</tgui-headline>
          </div>
        </div>
      </div>
    `,
  }),
}; 
