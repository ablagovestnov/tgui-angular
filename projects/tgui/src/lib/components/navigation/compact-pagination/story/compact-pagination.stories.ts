import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CompactPaginationComponent } from '../compact-pagination.component';
import { CompactPaginationItemComponent } from '../compact-pagination-item.component';
import { CommonModule } from '@angular/common';

const meta: Meta<CompactPaginationComponent> = {
  title: 'Navigation/CompactPagination',
  component: CompactPaginationComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, CompactPaginationComponent, CompactPaginationItemComponent],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['default', 'ambient', 'white'],
      description: 'Sets the color theme of the pagination',
      defaultValue: 'default',
    },
    selectedIndex: {
      control: 'number',
      description: 'Currently selected page index',
      defaultValue: 0,
    },
  },
};

export default meta;

type Story = StoryObj<CompactPaginationComponent>;

// Template for stories
const paginationTemplate = `
<tgui-compact-pagination
  [mode]="mode"
  [selectedIndex]="selectedIndex"
  (selectedIndexChange)="onIndexChange($event)"
>
  <tgui-compact-pagination-item>Page 1</tgui-compact-pagination-item>
  <tgui-compact-pagination-item>Page 2</tgui-compact-pagination-item>
  <tgui-compact-pagination-item>Page 3</tgui-compact-pagination-item>
  <tgui-compact-pagination-item>Page 4</tgui-compact-pagination-item>
  <tgui-compact-pagination-item>Page 5</tgui-compact-pagination-item>
  <tgui-compact-pagination-item>Page 6</tgui-compact-pagination-item>
  <tgui-compact-pagination-item>Page 7</tgui-compact-pagination-item>
  <tgui-compact-pagination-item>Page 8</tgui-compact-pagination-item>
</tgui-compact-pagination>
`;

export const Default: Story = {
  args: {
    mode: 'default',
    selectedIndex: 0
  },
  render: (args) => ({
    props: {
      ...args,
      onIndexChange: (index: number) => {
        args.selectedIndex = index;
      }
    },
    template: `
      <div style="padding: 20px; display: inline-block; background: var(--tgui--secondary_bg_color);">
        ${paginationTemplate}
      </div>
    `
  })
};

export const Ambient: Story = {
  args: {
    mode: 'ambient',
    selectedIndex: 0
  },
  render: (args) => ({
    props: {
      ...args,
      onIndexChange: (index: number) => {
        args.selectedIndex = index;
      }
    },
    template: `
      <div style="padding: 20px; display: inline-block; background: rgba(0, 0, 0, 0.5);">
        ${paginationTemplate}
      </div>
    `
  })
};

export const White: Story = {
  args: {
    mode: 'white',
    selectedIndex: 0
  },
  render: (args) => ({
    props: {
      ...args,
      onIndexChange: (index: number) => {
        args.selectedIndex = index;
      }
    },
    template: `
      <div style="padding: 20px; display: inline-block; background: var(--tgui--black);">
        ${paginationTemplate}
      </div>
    `
  })
}; 