import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { AvatarComponent, AvatarBadgeComponent } from '@blocks/avatar';
import { CommonModule } from '@angular/common';

const meta: Meta<AvatarComponent> = {
  title: 'TGUI/Content/Avatar',
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
      description: 'Размер аватара',
      defaultValue: 'm',
    },
    shape: {
      options: ['circle', 'rounded', 'square'],
      control: { type: 'select' },
      description: 'Форма аватара',
      defaultValue: 'circle',
    },
    src: {
      control: 'text',
      description: 'URL изображения аватара',
    },
    initials: {
      control: 'text',
      description: 'Текст для формирования инициалов, если изображение отсутствует',
    },
    color: {
      control: 'color',
      description: 'Цвет фона для аватара с инициалами',
    },
    online: {
      control: 'boolean',
      description: 'Индикатор онлайн-статуса',
      defaultValue: false,
    },
  },
};

export default meta;

type Story = StoryObj<AvatarComponent>;

// Базовый пример с изображением
export const WithImage: Story = {
  args: {
    size: 'm',
    shape: 'circle',
    src: 'https://randomuser.me/api/portraits/men/32.jpg',
    alt: 'User avatar',
  },
};

// Пример с инициалами
export const WithInitials: Story = {
  args: {
    size: 'm',
    shape: 'circle',
    initials: 'John Doe',
  },
};

// Пример с инициалами и кастомным цветом
export const WithCustomColor: Story = {
  args: {
    size: 'm',
    shape: 'circle',
    initials: 'John Doe',
    color: '#3949ab',
  },
};

// Пример с индикатором онлайн-статуса
export const WithOnlineStatus: Story = {
  args: {
    size: 'm',
    shape: 'circle',
    src: 'https://randomuser.me/api/portraits/women/44.jpg',
    online: true,
  },
};

// Пример с разными размерами
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

// Пример с разными формами
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

// Пример с численным бейджем
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

// Пример с использованием в карточках пользователей
export const UserCardExample: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div style="display: flex; align-items: center; gap: 12px; padding: 16px; background-color: var(--tgui--secondary_bg_color); border-radius: 12px;">
          <tgui-avatar size="l" src="https://randomuser.me/api/portraits/men/32.jpg" online="true"></tgui-avatar>
          <div>
            <div style="font-weight: 600; margin-bottom: 4px;">John Doe</div>
            <div style="color: var(--tgui--hint_color); font-size: 14px;">Last seen just now</div>
          </div>
        </div>
        
        <div style="display: flex; align-items: center; gap: 12px; padding: 16px; background-color: var(--tgui--secondary_bg_color); border-radius: 12px;">
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
