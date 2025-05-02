import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BlockquoteComponent } from '../blockquote.component';
import { TextComponent } from '../../../typography/text/text.component';
import { TguiDynamicIconComponent } from '../../../../icons/dynamic-icon.component';

const meta: Meta<BlockquoteComponent> = {
  title: 'Blocks/Blockquote',
  component: BlockquoteComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BlockquoteComponent, 
        TextComponent,
        TguiDynamicIconComponent
      ]
    })
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      control: 'text',
      description: 'The icon to display in the top right corner'
    },
    text: {
      control: 'text',
      description: 'Optional text to display as a headline above the content'
    }
  }
};

export default meta;
type Story = StoryObj<BlockquoteComponent>;

export const Default: Story = {
  args: {
    icon: 'quote'
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-blockquote [icon]="icon">
        This is a blockquote with default styling.
      </tgui-blockquote>
    `
  })
};

export const WithText: Story = {
  args: {
    icon: 'quote',
    text: 'This is the headline text'
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-blockquote [icon]="icon" [text]="text">
        This is the content below the headline.
      </tgui-blockquote>
    `
  })
};

export const WithCustomIcon: Story = {
  args: {
    icon: 'chevron',
    text: 'Blockquote with chevron icon'
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-blockquote [icon]="icon" [text]="text">
        This is a blockquote with a custom chevron icon.
      </tgui-blockquote>
    `
  })
};

export const WithLargerIcon: Story = {
  args: {
    icon: 'backspace',
    text: 'Blockquote with larger quote icon'
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-blockquote [icon]="icon" [text]="text">
        This is a blockquote with a larger quote icon.
      </tgui-blockquote>
    `
  })
};

export const WithComplexContent: Story = {
  args: {
    icon: 'quote'
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-blockquote [icon]="icon">
        <div style="padding: 8px 0;">
          <strong>Custom content</strong>
          <p style="margin: 4px 0 0 0;">This blockquote contains custom HTML content.</p>
        </div>
      </tgui-blockquote>
    `
  })
};

export const WithTextAndComplexContent: Story = {
  args: {
    icon: 'quote',
    text: 'Complex content example'
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-blockquote [icon]="icon" [text]="text">
        <div style="padding: 8px 0;">
          <strong>Custom content below the headline</strong>
          <p style="margin: 4px 0 0 0;">This shows how to combine text headline with complex content.</p>
        </div>
      </tgui-blockquote>
    `
  })
};

export const MultipleExamples: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <tgui-blockquote icon="quote" text="Simple example with text">
          Basic blockquote with text headline and default quote icon.
        </tgui-blockquote>
        
        <tgui-blockquote icon="chevron">
          Blockquote with only content and custom chevron icon.
        </tgui-blockquote>
        
        <tgui-blockquote icon="quote" text="Complex content example">
          <div style="padding: 4px 0;">
            <strong>HTML content</strong>
            <p style="margin: 4px 0 0 0;">With formatted elements</p>
          </div>
        </tgui-blockquote>
      </div>
    `
  })
}; 