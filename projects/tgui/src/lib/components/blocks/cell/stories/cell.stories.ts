import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CellComponent } from '../cell.component';
import { BadgeComponent } from '../../badge/badge.component';
import { AvatarComponent } from '../../avatar/avatar.component';
import { CommonModule } from '@angular/common';
import { ContentSlotDirective } from '../../../../directives/content-slot.directive';
import { Signal, signal } from '@angular/core';

const meta: Meta<CellComponent> = {
  title: 'Blocks/Cell',
  component: CellComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BadgeComponent, AvatarComponent, ContentSlotDirective],
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
  },
};

export default meta;

type Story = StoryObj<CellComponent>;

// Equivalent to the React "Playground" story
export const Playground: Story = {
  args: {
    subhead: 'Subhead',
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'Description',
  },
  render: (args) => ({
    props: {
      ...args,
      titleValue: args.title,
      subheadValue: args.subhead,
      subtitleValue: args.subtitle,
      descriptionValue: args.description
    },
    template: `
      <tgui-cell 
        [hovered]="hovered"
        [multiline]="multiline"
        [interactiveAnimation]="interactiveAnimation"
        [disabled]="disabled"
        [readonly]="readonly"
        [subhead]="subheadValue"
        [title]="titleValue"
        [subtitle]="subtitleValue"
        [description]="descriptionValue"
      >
        <tgui-badge content-slot="title-badge" type="dot"></tgui-badge>
        <tgui-avatar content-slot="before" size="l"></tgui-avatar>
        <tgui-badge content-slot="after" type="number">99</tgui-badge>
      </tgui-cell>
    `,
  })
};

// Equivalent to the React "CellWithInfo" story
export const CellWithInfo: Story = {
  args: {
    title: 'Noah',
    subtitle: 'Yesterday',
    subhead: 'Subhead',
    hint: 'Hint',
    description: 'Description',
  },
  render: (args) => ({
    props: {
      ...args,
      titleValue: args.title,
      subtitleValue: args.subtitle,
      subheadValue: args.subhead,
      hintValue: args.hint,
      descriptionValue: args.description
    },
    template: `
      <tgui-cell
        [title]="titleValue"
        [subtitle]="subtitleValue"
        [subhead]="subheadValue"
        [hint]="hintValue"
        [description]="descriptionValue"
      >
        <tgui-avatar content-slot="before" size="l"></tgui-avatar>
        <div content-slot="after" style="text-align: right;">
          <div style="color: var(--tgui--link_color); font-weight: 500">+1000</div>
          <div style="color: var(--tgui--secondary_hinttint_color); font-size: 12px">Received</div>
        </div>
      </tgui-cell>
    `,
  })
}; 