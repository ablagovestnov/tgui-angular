import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CardComponent, CardCellComponent, CardChipComponent } from '@blocks/card/public-api';

const meta: Meta<CardComponent> = {
  title: 'Blocks/Card',
  component: CardComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CardComponent, CardCellComponent, CardChipComponent],
    }),
  ],
  argTypes: {
    type: {
      options: ['plain', 'ambient'],
      control: { type: 'radio' },
      description: 'Defines the visual style of the card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'plain' },
      },
    },
    borderRadius: {
      control: { type: 'text' },
      description: 'Defines the border radius of the card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '24px' },
      },
    },
    image: {
      control: { type: 'text' },
      description: 'URL of the image to display at the top of the card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    imageHeight: {
      control: { type: 'text' },
      description: 'Height of the image section',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '200px' },
      },
    }
  },
  args: {
    type: 'plain',
    borderRadius: '24px',
    imageHeight: '200px'
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tgui-card [type]="type" [borderRadius]="borderRadius" style="width: 300px;">
        <tgui-card-cell [isImage]="true">
          <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #707579;">
            Image content goes here
          </div>
        </tgui-card-cell>
        <tgui-card-cell
          header="Card Title"
          subtitle="Card description text would go here to provide more information about this card.">
          <div style="margin-top: 10px; color: #707579;">
            Additional content can be added here
          </div>
        </tgui-card-cell>
      </tgui-card>
    `,
  }),
};

export const WithDirectImage: Story = {
  args: {
    image: 'https://via.placeholder.com/300x200'
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-card 
        [type]="type" 
        [borderRadius]="borderRadius" 
        [image]="image" 
        [imageHeight]="imageHeight"
        style="width: 300px;">
        <tgui-card-cell
          header="Direct Image Card"
          subtitle="This card uses the image property directly on the card without a separate cell.">
          <div style="margin-top: 10px; color: #707579;">
            This approach is more similar to the React implementation.
          </div>
        </tgui-card-cell>
      </tgui-card>
    `,
  }),
};

export const WithChip: Story = {
  render: (args) => ({
    props: args,
    template: `
      <tgui-card [type]="type" [borderRadius]="borderRadius" style="width: 300px; position: relative;">
        <tgui-card-chip mode="elevated">
          <span>New</span>
        </tgui-card-chip>
        <tgui-card-cell [isImage]="true">
          <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #707579;">
            Image content goes here
          </div>
        </tgui-card-cell>
        <tgui-card-cell
          header="Card with Chip"
          subtitle="This card includes a chip component positioned in the top-right corner.">
        </tgui-card-cell>
      </tgui-card>
    `,
  }),
};

export const WithDirectImageAndChip: Story = {
  args: {
    image: 'https://via.placeholder.com/300x200'
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-card 
        [type]="type" 
        [borderRadius]="borderRadius" 
        [image]="image" 
        [imageHeight]="imageHeight"
        style="width: 300px; position: relative;">
        <tgui-card-chip mode="elevated">
          <span>New</span>
        </tgui-card-chip>
        <tgui-card-cell
          header="Direct Image with Chip"
          subtitle="This card combines the direct image approach with a chip.">
        </tgui-card-cell>
      </tgui-card>
    `,
  }),
};

export const WithAdvancedChip: Story = {
  render: (args) => ({
    props: {
      ...args,
      beforeIcon: `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 3.5V12.5M3.5 8H12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      `
    },
    template: `
      <tgui-card [type]="type" [borderRadius]="borderRadius" style="width: 300px; position: relative;">
        <tgui-card-chip [mode]="'mono'" [before]="beforeTemplate">
          Featured
        </tgui-card-chip>
        <tgui-card-cell [isImage]="true">
          <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #707579;">
            Image content goes here
          </div>
        </tgui-card-cell>
        <tgui-card-cell
          header="Advanced Chip"
          subtitle="This card uses a chip with an icon and styling.">
        </tgui-card-cell>

        <ng-template #beforeTemplate>
          <div [innerHTML]="beforeIcon"></div>
        </ng-template>
      </tgui-card>
    `,
  }),
};

export const CustomBorderRadius: Story = {
  args: {
    borderRadius: '8px'
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-card [type]="type" [borderRadius]="borderRadius" style="width: 300px; position: relative;">
        <tgui-card-cell [isImage]="true">
          <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #707579;">
            Image with custom border radius
          </div>
        </tgui-card-cell>
        <tgui-card-cell
          header="Custom Border Radius"
          subtitle="This card uses a custom border radius of 8px instead of the default 24px.">
        </tgui-card-cell>
      </tgui-card>
    `,
  }),
};

export const Ambient: Story = {
  args: {
    type: 'ambient',
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-card [type]="type" [borderRadius]="borderRadius" style="width: 300px;">
        <tgui-card-cell
          header="Ambient Card"
          subtitle="This card uses the ambient style with a dark background.">
          <div style="margin-top: 12px; color: rgba(255, 255, 255, 0.5);">
            Additional content with lower opacity text
          </div>
        </tgui-card-cell>
      </tgui-card>
    `,
  }),
}; 
