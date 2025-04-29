import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { TypographyComponent } from '../typography.component';

const meta: Meta<TypographyComponent> = {
  title: 'Typography/Base Typography',
  component: TypographyComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TypographyComponent],
    }),
  ],
  argTypes: {
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
      description: 'HTML tag to render (optional)',
    },
  },
};

export default meta;
type Story = StoryObj<TypographyComponent>;

// Basic story
export const Basic: Story = {
  args: {
    weight: '3',
    caps: false,
    plain: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-typography [weight]="weight" [caps]="caps" [plain]="plain">
        This is a basic Typography component
      </tgui-typography>
    `,
  }),
};

// All weights example
export const Weights: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <tgui-typography weight="1">This text has Bold weight (1)</tgui-typography>
        <tgui-typography weight="2">This text has Medium weight (2)</tgui-typography>
        <tgui-typography weight="3">This text has Regular weight (3)</tgui-typography>
      </div>
    `,
  }),
};

// Uppercase text
export const Uppercase: Story = {
  args: {
    caps: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-typography [caps]="caps">
        This text is displayed in uppercase
      </tgui-typography>
    `,
  }),
};

// Custom tag example
export const CustomTag: Story = {
  args: {
    tag: 'h1',
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-typography [tag]="tag">
        This text uses a custom HTML tag (${args.tag})
      </tgui-typography>
    `,
  }),
}; 
