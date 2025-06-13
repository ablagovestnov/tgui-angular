import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { PlaceholderComponent } from '../placeholder.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';
import { ImageComponent } from '../../image/image.component';
const meta: Meta<PlaceholderComponent> = {
  title: 'Blocks/Placeholder',
  component: PlaceholderComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent, ImageComponent],
    }),
  ],  
  tags: ['autodocs'],
  argTypes: {
    header: {
      control: 'text',
      description: 'The primary text, usually a title or a header, for the placeholder',
    },
    description: {
      control: 'text',
      description: 'Additional descriptive text to provide more details or context',
    }
  },
};

export default meta;
type Story = StoryObj<PlaceholderComponent>;

export const Basic: Story = {
  args: {
    header: 'Placeholder Title',
    description: 'This is a description text for the placeholder component. It provides additional context.'
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-placeholder 
        [header]="header" 
        [description]="description"
      >
      </tgui-placeholder>
    `,
  }),
};

export const WithImage: Story = {
  render: () => ({
    template: `
      <tgui-placeholder 
        header="Image Placeholder" 
        description="This placeholder includes an image element"
      >
        <tgui-image image [size]="96" [src]="'https://placehold.co/96x96/png'" [alt]="'Size 96'"></tgui-image>

      </tgui-placeholder>
    `,
  }),
};

export const WithAction: Story = {
  render: () => ({
    imports: [CommonModule, ButtonComponent],
    template: `
      <tgui-placeholder 
        header="Action Placeholder" 
        description="This placeholder includes an actionable button"
      >
        <tgui-image image [size]="96" [src]="'https://placehold.co/96x96/png'" [alt]="'Size 96'"></tgui-image>
        <tgui-button action [size]="'l'" [mode]="'filled'">Take Action</tgui-button>
      </tgui-placeholder>
    `,
  }),
};

export const EmptyState: Story = {
  render: () => ({
    imports: [CommonModule, ButtonComponent],
    template: `
      <tgui-placeholder 
        header="No Items Found" 
        description="There are no items matching your search criteria. Try changing your search parameters or create a new item."
      >
        <tgui-image image [size]="96" [src]="'https://placehold.co/96x96/png'" [alt]="'Size 96'"></tgui-image>

        <tgui-button action [size]="'l'" [mode]="'filled'">Take Action</tgui-button>
      </tgui-placeholder>
    `,
  }),
};

export const HeaderOnly: Story = {
  render: () => ({
    template: `
      <tgui-placeholder 
        header="Header Only Placeholder" 
      >
      </tgui-placeholder>
    `,
  }),
};

export const DescriptionOnly: Story = {
  render: () => ({
    template: `
      <tgui-placeholder 
        description="This is a placeholder with only a description text and no header."
      >
      </tgui-placeholder>
    `,
  }),
}; 