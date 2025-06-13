import { type Meta, type StoryObj } from '@storybook/angular';
import { BadgeComponent } from '../badge.component';
import { CommonModule } from '@angular/common';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<BadgeComponent> = {
  title: 'Blocks/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  decorators: [],
  argTypes: {
    type: {
      options: ['number', 'dot'],
      control: { type: 'select' },
      description: 'Badge type',
      defaultValue: 'number',
    },
    mode: {
      options: ['primary', 'critical', 'secondary', 'gray', 'white'],
      control: { type: 'select' },
      description: 'Badge color mode',
      defaultValue: 'primary',
    },
    large: {
      control: 'boolean',
      description: 'Increases badge size (for number type only)',
      defaultValue: false,
    }
  },
};

export default meta;
type Story = StoryObj<BadgeComponent>;

// Basic story with all controls
export const Basic: Story = {
  args: {
    type: 'number',
    mode: 'primary',
    large: false
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-badge 
        [type]="type" 
        [mode]="mode" 
        [large]="large"
      >
        3
      </tgui-badge>
    `,
  }),
};

// Different types of badges
export const Types: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
        <tgui-badge type="number">5</tgui-badge>
        <tgui-badge type="dot"></tgui-badge>
      </div>
    `,
  }),
};

// Different color modes
export const Modes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
        <tgui-badge mode="primary">1</tgui-badge>
        <tgui-badge mode="critical">2</tgui-badge>
        <tgui-badge mode="secondary">3</tgui-badge>
        <tgui-badge mode="gray">4</tgui-badge>
        <tgui-badge mode="white">5</tgui-badge>
      </div>
    `,
  }),
};

// Different sizes
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
        <tgui-badge [large]="false">1</tgui-badge>
        <tgui-badge [large]="true">99</tgui-badge>
      </div>
    `,
  }),
};

// Dots with different modes
export const Dots: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
        <tgui-badge type="dot" mode="primary"></tgui-badge>
        <tgui-badge type="dot" mode="critical"></tgui-badge>
        <tgui-badge type="dot" mode="secondary"></tgui-badge>
        <tgui-badge type="dot" mode="gray"></tgui-badge>
        <tgui-badge type="dot" mode="white"></tgui-badge>
      </div>
    `,
  }),
};

// Usage in context example
export const UsageExamples: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <div style="margin-bottom: 8px;">Notifications count:</div>
          <div style="display: flex; align-items: center;">
            Messages <tgui-badge style="margin-left: 8px;">12</tgui-badge>
          </div>
        </div>
        
        <div>
          <div style="margin-bottom: 8px;">Status indicators:</div>
          <div style="display: flex; gap: 16px;">
            <div style="display: flex; align-items: center;">
              <tgui-badge type="dot" mode="critical"></tgui-badge> 
              <span style="margin-left: 8px;">Critical</span>
            </div>
            <div style="display: flex; align-items: center;">
              <tgui-badge type="dot" mode="primary"></tgui-badge> 
              <span style="margin-left: 8px;">Active</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}; 