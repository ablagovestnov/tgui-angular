import { type Meta, type StoryObj } from '@storybook/angular';
import { TextareaComponent } from '../textarea.component';

const meta: Meta<TextareaComponent> = {
  title: 'Form/Textarea',
  component: TextareaComponent,
  tags: ['autodocs'],
  argTypes: {
    status: {
      options: ['default', 'error', 'focused'],
      control: { type: 'select' },
      description: 'Visual status of the textarea',
      defaultValue: 'default',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      defaultValue: false,
    },
    header: {
      control: 'text',
      description: 'Header text displayed above the textarea',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      defaultValue: 'Enter text...'
    },
    value: {
      control: 'text',
      description: 'Textarea value',
      defaultValue: ''
    }
  },
  args: {
    status: 'default',
    disabled: false,
    placeholder: 'Enter text...',
    value: ''
  }
};

export default meta;
type Story = StoryObj<TextareaComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `<tgui-textarea [status]="status" [disabled]="disabled" [placeholder]="placeholder" [value]="value"></tgui-textarea>`
  })
};

export const WithHeader: Story = {
  args: {
    header: 'Comment'
  },
  render: (args) => ({
    props: args,
    template: `<tgui-textarea [status]="status" [header]="header" [disabled]="disabled" [placeholder]="placeholder" [value]="value"></tgui-textarea>`
  })
};

export const Error: Story = {
  args: {
    status: 'error',
    header: 'Comment'
  },
  render: (args) => ({
    props: args,
    template: `<tgui-textarea [status]="status" [header]="header" [disabled]="disabled" [placeholder]="placeholder" [value]="value"></tgui-textarea>`
  })
};

export const Focused: Story = {
  args: {
    status: 'focused',
    header: 'Comment'
  },
  render: (args) => ({
    props: args,
    template: `<tgui-textarea [status]="status" [header]="header" [disabled]="disabled" [placeholder]="placeholder" [value]="value"></tgui-textarea>`
  })
};

export const Disabled: Story = {
  args: {
    disabled: true,
    header: 'Comment',
    value: 'This textarea is disabled'
  },
  render: (args) => ({
    props: args,
    template: `<tgui-textarea [status]="status" [header]="header" [disabled]="disabled" [placeholder]="placeholder" [value]="value"></tgui-textarea>`
  })
};

export const WithValue: Story = {
  args: {
    header: 'Comment',
    value: 'This is a sample text in the textarea.'
  },
  render: (args) => ({
    props: args,
    template: `<tgui-textarea [status]="status" [header]="header" [disabled]="disabled" [placeholder]="placeholder" [value]="value"></tgui-textarea>`
  })
}; 