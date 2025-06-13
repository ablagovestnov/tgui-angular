import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CellComponent } from '../cell.component';
import { BadgeComponent } from '../../badge/badge.component';
import { AvatarComponent } from '../../avatar/avatar.component';
import { CommonModule } from '@angular/common';

const meta: Meta<CellComponent> = {
  title: 'Blocks/Cell',
  component: CellComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BadgeComponent, AvatarComponent],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    hovered: {
      control: 'boolean',
      description: 'Controls the hover state of the component externally, useful for keyboard navigation',
    },
    multiline: {
      control: 'boolean',
      description: 'Allows for multiline content without truncation',
    },
    interactiveAnimation: {
      control: { type: 'select', options: ['opacity', 'background'] },
      description: 'Type of animation for interaction feedback',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the cell',
    },
    readonly: {
      control: 'boolean',
      description: 'Makes the cell readonly',
    },
    subhead: {
      control: 'text',
      description: 'Content displayed above the main content as a subheading',
    },
    title: {
      control: 'text',
      description: 'Main content displayed as a header',
    },
    hint: {
      control: 'text',
      description: 'Content displayed alongside the header as a hint',
    },
    subtitle: {
      control: 'text',
      description: 'Content displayed below the header as a subtitle',
    },
    description: {
      control: 'text',
      description: 'Additional description displayed below the subtitle',
    },
    beforeTemplate: {
      control: false,
      description: 'Template displayed on the left side of the cell',
    },
    afterTemplate: {
      control: false,
      description: 'Template displayed on the right side of the cell',
    },
    titleBadge: {
      control: false,
      description: 'Badge template displayed next to the title',
    },
  },
};

export default meta;

type Story = StoryObj<CellComponent>;

// Basic example with simple text content
export const Basic: Story = {
  args: {
    title: 'Basic Cell',
    subtitle: 'Subtitle text',
    description: 'Description text',
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-cell 
        [hovered]="hovered"
        [multiline]="multiline"
        [interactiveAnimation]="interactiveAnimation"
        [disabled]="disabled"
        [readonly]="readonly"
        [subhead]="subhead"
        [title]="title"
        [subtitle]="subtitle"
        [description]="description">
        Main content
      </tgui-cell>
    `,
  })
};

// Playground example with all features
export const Playground: Story = {
  args: {
    subhead: 'Subhead',
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'Description',
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-cell 
        [hovered]="hovered"
        [multiline]="multiline"
        [interactiveAnimation]="interactiveAnimation"
        [disabled]="disabled"
        [readonly]="readonly"
        [subhead]="subhead"
        [title]="title"
        [subtitle]="subtitle"
        [description]="description"
        [titleBadge]="titleBadgeRef"
        [beforeTemplate]="beforeRef"
        [afterTemplate]="afterRef">
        Main content
      </tgui-cell>

      <ng-template #titleBadgeRef>
        <tgui-badge type="dot"></tgui-badge>
      </ng-template>

      <ng-template #beforeRef>
        <tgui-avatar size="l"></tgui-avatar>
      </ng-template>

      <ng-template #afterRef>
        <tgui-badge type="number">99</tgui-badge>
      </ng-template>
    `,
  })
};

// Example with user info styling
export const CellWithInfo: Story = {
  args: {
    title: 'Noah',
    subtitle: 'Yesterday',
    subhead: 'Subhead',
    hint: 'Hint',
    description: 'Description',
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-cell
        [title]="title"
        [subtitle]="subtitle"
        [subhead]="subhead"
        [hint]="hint"
        [description]="description"
        [beforeTemplate]="avatarRef"
        [afterTemplate]="infoRef">
      </tgui-cell>

      <ng-template #avatarRef>
        <tgui-avatar size="l"></tgui-avatar>
      </ng-template>

      <ng-template #infoRef>
        <div style="text-align: right;">
          <div style="color: var(--tgui--link_color); font-weight: 500">+1000</div>
          <div style="color: var(--tgui--secondary_hinttint_color); font-size: 12px">Received</div>
        </div>
      </ng-template>
    `,
  })
};

// Example showing only before template
export const WithBeforeContent: Story = {
  args: {
    title: 'Cell with before content',
    description: 'This cell has content on the left side',
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-cell
        [title]="title"
        [description]="description"
        [beforeTemplate]="beforeRef">
      </tgui-cell>

      <ng-template #beforeRef>
        <tgui-avatar size="m"></tgui-avatar>
      </ng-template>
    `,
  })
};

// Example showing only after template
export const WithAfterContent: Story = {
  args: {
    title: 'Cell with after content',
    description: 'This cell has content on the right side',
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-cell
        [title]="title"
        [description]="description"
        [afterTemplate]="afterRef">
      </tgui-cell>

      <ng-template #afterRef>
        <tgui-badge type="number">5</tgui-badge>
      </ng-template>
    `,
  })
};

// Example with title badge only
export const WithTitleBadge: Story = {
  args: {
    title: 'Cell with title badge',
    description: 'This cell has a badge next to the title',
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-cell
        [title]="title"
        [description]="description"
        [titleBadge]="badgeRef">
      </tgui-cell>

      <ng-template #badgeRef>
        <tgui-badge type="dot"></tgui-badge>
      </ng-template>
    `,
  })
};

// Example showing multiline behavior
export const Multiline: Story = {
  args: {
    title: 'Very long title that should wrap when multiline is enabled and demonstrate the multiline behavior of the cell component',
    description: 'Very long description that should also wrap when multiline is enabled to show how the component handles overflow content',
    multiline: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 300px;">
        <tgui-cell
          [title]="title"
          [description]="description"
          [multiline]="multiline"
          [beforeTemplate]="beforeRef">
        </tgui-cell>

        <ng-template #beforeRef>
          <tgui-avatar size="l"></tgui-avatar>
        </ng-template>
      </div>
    `,
  })
}; 