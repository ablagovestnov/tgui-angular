import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination.component';

const meta: Meta<PaginationComponent> = {
  title: 'Navigation/Pagination',
  component: PaginationComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, PaginationComponent],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    boundaryCount: {
      control: 'number',
      description: 'Number of always visible pages at the beginning and end',
      defaultValue: 1,
    },
    count: {
      control: 'number',
      description: 'The total number of pages',
      defaultValue: 10,
    },
    defaultPage: {
      control: 'number',
      description: 'The page selected by default when uncontrolled',
      defaultValue: 1,
    },
    hideNextButton: {
      control: 'boolean',
      description: 'If true, hide the next-page button',
      defaultValue: false,
    },
    hidePrevButton: {
      control: 'boolean',
      description: 'If true, hide the previous-page button',
      defaultValue: false,
    },
    page: {
      control: 'number',
      description: 'The current page (controlled mode)',
    },
    siblingCount: {
      control: 'number',
      description: 'Number of always visible pages before and after the current page',
      defaultValue: 1,
    },
    disabled: {
      control: 'boolean',
      description: 'Controls whether the Pagination component is interactive',
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<PaginationComponent>;

// Default Pagination
export const Default: Story = {
  args: {
    count: 3,
    defaultPage: 1,
    boundaryCount: 1,
    siblingCount: 1,
  },
  render: (args) => ({
    props: {
      ...args,
      onPageChange: (page: number) => {
        console.log(`Page changed to ${page}`);
      },
    },
    template: `
      <div style="padding: 20px;">
        <tgui-pagination 
          [count]="count" 
          [defaultPage]="defaultPage" 
          [boundaryCount]="boundaryCount" 
          [siblingCount]="siblingCount"
          [hidePrevButton]="hidePrevButton"
          [hideNextButton]="hideNextButton"
          [disabled]="disabled"
          [page]="page"
          (pageChange)="onPageChange($event)"
        ></tgui-pagination>
      </div>
    `,
  }),
};

// Many Pages
export const ManyPages: Story = {
  args: {
    count: 50,
    defaultPage: 5,
    boundaryCount: 2,
    siblingCount: 2,
  },
};

// Disabled Pagination
export const Disabled: Story = {
  args: {
    count: 10,
    defaultPage: 3,
    disabled: true,
  },
}; 