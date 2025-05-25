import { type Meta, type StoryObj } from '@storybook/angular';
import { LinkComponent } from '../link.component';

const meta: Meta<LinkComponent> = {
  title: 'Navigation/Link',
  component: LinkComponent,
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'URL that the hyperlink points to',
      defaultValue: 'https://example.com',
    },
    target: {
      options: ['_self', '_blank', '_parent', '_top'],
      control: { type: 'select' },
      description: 'Specifies where to open the linked document',
      defaultValue: '_self',
    },
    rel: {
      control: 'text',
      description: 'Specifies the relationship between the current document and the linked document',
    },
    title: {
      control: 'text',
      description: 'Specifies extra information about an element',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the link',
    }
  },
  args: {
    href: 'https://example.com',
  }
};

export default meta;
type Story = StoryObj<LinkComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `<tgui-link [href]="href" [target]="target" [rel]="rel" [title]="title" [ariaLabel]="ariaLabel">Link text</tgui-link>`
  })
};

export const ExternalLink: Story = {
  args: {
    href: 'https://t.me',
    target: '_blank',
    rel: 'noopener noreferrer'
  },
  render: (args) => ({
    props: args,
    template: `<tgui-link [href]="href" [target]="target" [rel]="rel">External Link</tgui-link>`
  })
};

export const WithTitle: Story = {
  args: {
    href: 'https://example.com',
    title: 'Click to visit example.com'
  },
  render: (args) => ({
    props: args,
    template: `<tgui-link [href]="href" [title]="title">Link with title</tgui-link>`
  })
}; 