import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BlockquoteComponent } from '../blockquote.component';
import { TguiIcon12Quote } from '../../../../icons/icon12/tgui-icon12-quote';
import { TguiIcon16Chevron } from '../../../../icons/icon16/tgui-icon16-chevron';

const meta: Meta<BlockquoteComponent> = {
  title: 'Blocks/Blockquote',
  component: BlockquoteComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BlockquoteComponent, TguiIcon12Quote, TguiIcon16Chevron]
    })
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'other'],
      description: 'Content type of the blockquote'
    }
  }
};

export default meta;
type Story = StoryObj<BlockquoteComponent>;

export const Default: Story = {
  args: {
    type: 'text'
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-blockquote [type]="type">
        This is a blockquote with default styling.
      </tgui-blockquote>
    `
  })
};

export const WithCustomTemplate: Story = {
  args: {
    type: 'text'
  },
  render: () => ({
    template: `
      <tgui-blockquote>
        This is a blockquote with content from a template.
        <ng-template #topRightIcon>
          <tgui-icon12-quote></tgui-icon12-quote>
        </ng-template>
      </tgui-blockquote>
    `
  })
};

export const WithCustomIcon: Story = {
  args: {
    type: 'text'
  },
  render: () => ({
    template: `
      <tgui-blockquote>
        This is a blockquote with a custom chevron icon.
        <ng-template #topRightIcon>
          <tgui-icon16-chevron></tgui-icon16-chevron>
        </ng-template>
      </tgui-blockquote>
    `
  })
};

export const WithOtherContent: Story = {
  args: {
    type: 'other'
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-blockquote [type]="type">
        <div style="padding: 8px 0;">
          <strong>Custom content</strong>
          <p style="margin: 4px 0 0 0;">This blockquote contains custom HTML content.</p>
        </div>
      </tgui-blockquote>
    `
  })
}; 