import { Meta, StoryObj } from '@storybook/angular';
import { SpoilerComponent } from '../spoiler.component';

// Meta information about the component
export default {
  title: 'Feedback/Spoiler',
  component: SpoilerComponent,
  tags: ['autodocs'],
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Controls the visibility of the content inside the spoiler'
    }
  },
  args: {
    visible: false
  }
} as Meta<SpoilerComponent>;

// Define the main story
type Story = StoryObj<SpoilerComponent>;

// Default story with hidden content
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tgui-spoiler [visible]="visible">
        <p>This is a spoiler content that can be hidden or shown with a click.</p>
      </tgui-spoiler>
    `
  })
};

// Visible content story
export const Visible: Story = {
  args: {
    visible: true
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-spoiler [visible]="visible">
        <p>This spoiler content is visible by default.</p>
      </tgui-spoiler>
    `
  })
};

// Example with longer content
export const LongContent: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tgui-spoiler [visible]="visible">
        <div style="max-width: 500px;">
          <h3>Hidden Information</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod, nunc eget aliquam ultricies, 
          nunc nisl ultricies nunc, eget aliquet nunc nisl eget nunc. Vestibulum euismod, nunc eget aliquam ultricies, 
          nunc nisl ultricies nunc, eget aliquet nunc nisl eget nunc.</p>
          <p>Click to toggle visibility.</p>
        </div>
      </tgui-spoiler>
    `
  })
}; 