import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { AvatarComponent, AvatarBadgeComponent } from '../index';
import { CommonModule } from '@angular/common';

const meta: Meta<AvatarComponent> = {
  title: 'Blocks/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, AvatarComponent, AvatarBadgeComponent],
    }),
  ],
  argTypes: {
    size: {
      options: ['xs', 's', 'm', 'l', 'xl'],
      control: { type: 'select' },
      description: 'Avatar size',
      defaultValue: 'm',
    },
    shape: {
      options: ['circle', 'rounded', 'square'],
      control: { type: 'select' },
      description: 'Avatar shape',
      defaultValue: 'circle',
    },
    src: {
      control: 'text',
      description: 'Avatar image URL',
    },
    initials: {
      control: 'text',
      description: 'Text for generating initials when image is absent',
    },
    color: {
      control: 'color',
      description: 'Background color for avatar with initials',
    },
    online: {
      control: 'boolean',
      description: 'Online status indicator',
      defaultValue: false,
    },
  },
};

export default meta;

type Story = StoryObj<AvatarComponent>;

// Basic example with image
export const WithImage: Story = {
  args: {
    size: 'm',
    shape: 'circle',
    src: 'https://randomuser.me/api/portraits/men/32.jpg',
    alt: 'User avatar',
  },
};

// Example with initials
export const WithInitials: Story = {
  args: {
    size: 'm',
    shape: 'circle',
    initials: 'John Doe',
  },
};

// Example with initials and custom color
export const WithCustomColor: Story = {
  args: {
    size: 'm',
    shape: 'circle',
    initials: 'John Doe',
    color: '#3949ab',
  },
};

// Example with online status indicator
export const WithOnlineStatus: Story = {
  args: {
    size: 'm',
    shape: 'circle',
    src: 'https://randomuser.me/api/portraits/women/44.jpg',
    online: true,
  },
};

// Example with different sizes
export const DifferentSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <tgui-avatar size="xs" initials="JD"></tgui-avatar>
        <tgui-avatar size="s" initials="JD"></tgui-avatar>
        <tgui-avatar size="m" initials="JD"></tgui-avatar>
        <tgui-avatar size="l" initials="JD"></tgui-avatar>
        <tgui-avatar size="xl" initials="JD"></tgui-avatar>
      </div>
    `,
  }),
};

// Example with different shapes
export const DifferentShapes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <tgui-avatar shape="circle" size="l" src="https://randomuser.me/api/portraits/men/32.jpg"></tgui-avatar>
        <tgui-avatar shape="rounded" size="l" src="https://randomuser.me/api/portraits/men/32.jpg"></tgui-avatar>
        <tgui-avatar shape="square" size="l" src="https://randomuser.me/api/portraits/men/32.jpg"></tgui-avatar>
      </div>
    `,
  }),
};

// Example with numeric badge
export const WithBadge: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <tgui-avatar size="l" src="https://randomuser.me/api/portraits/men/32.jpg">
          <tgui-avatar-badge [count]="5"></tgui-avatar-badge>
        </tgui-avatar>
        
        <tgui-avatar size="l" initials="John Doe">
          <tgui-avatar-badge [count]="42"></tgui-avatar-badge>
        </tgui-avatar>
        
        <tgui-avatar size="l" initials="Overflow" color="#e91e63">
          <tgui-avatar-badge [count]="999"></tgui-avatar-badge>
        </tgui-avatar>
      </div>
    `,
  }),
};

// Example usage in user cards
export const UserCardExample: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div style="display: flex; align-items: center; gap: 12px; position: relative; padding: 16px; background-color: var(--tgui--secondary_bg_color); border-radius: 12px;">
          <tgui-avatar size="l" src="https://randomuser.me/api/portraits/men/32.jpg" online="true"></tgui-avatar>
          <div>
            <div style="font-weight: 600; margin-bottom: 4px;">John Doe</div>
            <div style="color: var(--tgui--hint_color); font-size: 14px;">Last seen just now</div>
          </div>
          <div style="margin-left: auto;">
            <tgui-avatar-badge [count]="10"></tgui-avatar-badge>
          </div>
        </div>
        
        <div style="display: flex; align-items: center; gap: 12px; position: relative; padding: 16px; background-color: var(--tgui--secondary_bg_color); border-radius: 12px;">
          <tgui-avatar size="l" initials="Anna Smith" color="#8e24aa"></tgui-avatar>
          <div>
            <div style="font-weight: 600; margin-bottom: 4px;">Anna Smith</div>
            <div style="color: var(--tgui--hint_color); font-size: 14px;">Last seen 2 hours ago</div>
          </div>
          <div style="margin-left: auto;">
            <tgui-avatar-badge [count]="3"></tgui-avatar-badge>
          </div>
        </div>
      </div>
    `,
  }),
}; 
