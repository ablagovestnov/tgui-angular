import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { AvatarStackComponent } from '../avatar-stack.component';
import { AvatarComponent } from '@blocks/avatar/avatar.component';
import { CommonModule } from '@angular/common';

const meta: Meta<AvatarStackComponent> = {
  title: 'Blocks/AvatarStack',
  component: AvatarStackComponent,
  decorators: [
    moduleMetadata({
      imports: [AvatarComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    offset: {
      control: { type: 'range', min: -24, max: 0, step: 1 },
      defaultValue: -12,
      description: 'Смещение между аватарами в пикселях'
    }
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-avatar-stack [offset]="offset">
        <tgui-avatar [src]="'https://i.pravatar.cc/150?img=1'" [size]="'m'"></tgui-avatar>
        <tgui-avatar [src]="'https://i.pravatar.cc/150?img=2'" [size]="'m'"></tgui-avatar>
        <tgui-avatar [src]="'https://i.pravatar.cc/150?img=3'" [size]="'m'"></tgui-avatar>
      </tgui-avatar-stack>
    `,
  }),
};

export default meta;
type Story = StoryObj<AvatarStackComponent>;

export const Default: Story = {
  args: {
    offset: -12
  }
};

export const WithInitials: Story = {
  args: {
    offset: -12
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-avatar-stack [offset]="offset">
        <tgui-avatar [initials]="'AB'" [size]="'m'"></tgui-avatar>
        <tgui-avatar [initials]="'CD'" [size]="'m'"></tgui-avatar>
        <tgui-avatar [initials]="'EF'" [size]="'m'"></tgui-avatar>
      </tgui-avatar-stack>
    `,
  }),
};

export const WithMixedContent: Story = {
  args: {
    offset: -12
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-avatar-stack [offset]="offset">
        <tgui-avatar [src]="'https://i.pravatar.cc/150?img=1'" [size]="'m'"></tgui-avatar>
        <tgui-avatar [initials]="'CD'" [size]="'m'"></tgui-avatar>
        <tgui-avatar [src]="'https://i.pravatar.cc/150?img=3'" [size]="'m'"></tgui-avatar>
      </tgui-avatar-stack>
    `,
  }),
};

export const DifferentSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <tgui-avatar-stack>
          <tgui-avatar [src]="'https://i.pravatar.cc/150?img=1'" [size]="'s'"></tgui-avatar>
          <tgui-avatar [src]="'https://i.pravatar.cc/150?img=2'" [size]="'s'"></tgui-avatar>
          <tgui-avatar [src]="'https://i.pravatar.cc/150?img=3'" [size]="'s'"></tgui-avatar>
        </tgui-avatar-stack>
        
        <tgui-avatar-stack>
          <tgui-avatar [src]="'https://i.pravatar.cc/150?img=1'" [size]="'m'"></tgui-avatar>
          <tgui-avatar [src]="'https://i.pravatar.cc/150?img=2'" [size]="'m'"></tgui-avatar>
          <tgui-avatar [src]="'https://i.pravatar.cc/150?img=3'" [size]="'m'"></tgui-avatar>
        </tgui-avatar-stack>
        
        <tgui-avatar-stack>
          <tgui-avatar [src]="'https://i.pravatar.cc/150?img=1'" [size]="'l'"></tgui-avatar>
          <tgui-avatar [src]="'https://i.pravatar.cc/150?img=2'" [size]="'l'"></tgui-avatar>
          <tgui-avatar [src]="'https://i.pravatar.cc/150?img=3'" [size]="'l'"></tgui-avatar>
        </tgui-avatar-stack>
      </div>
    `,
  }),
};

export const CustomOffsets: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <p>Большой отступ (-6px):</p>
          <tgui-avatar-stack [offset]="-6">
            <tgui-avatar [src]="'https://i.pravatar.cc/150?img=1'" [size]="'m'"></tgui-avatar>
            <tgui-avatar [src]="'https://i.pravatar.cc/150?img=2'" [size]="'m'"></tgui-avatar>
            <tgui-avatar [src]="'https://i.pravatar.cc/150?img=3'" [size]="'m'"></tgui-avatar>
          </tgui-avatar-stack>
        </div>
        
        <div>
          <p>Стандартный отступ (-12px):</p>
          <tgui-avatar-stack [offset]="-12">
            <tgui-avatar [src]="'https://i.pravatar.cc/150?img=1'" [size]="'m'"></tgui-avatar>
            <tgui-avatar [src]="'https://i.pravatar.cc/150?img=2'" [size]="'m'"></tgui-avatar>
            <tgui-avatar [src]="'https://i.pravatar.cc/150?img=3'" [size]="'m'"></tgui-avatar>
          </tgui-avatar-stack>
        </div>
        
        <div>
          <p>Маленький отступ (-18px):</p>
          <tgui-avatar-stack [offset]="-18">
            <tgui-avatar [src]="'https://i.pravatar.cc/150?img=1'" [size]="'m'"></tgui-avatar>
            <tgui-avatar [src]="'https://i.pravatar.cc/150?img=2'" [size]="'m'"></tgui-avatar>
            <tgui-avatar [src]="'https://i.pravatar.cc/150?img=3'" [size]="'m'"></tgui-avatar>
          </tgui-avatar-stack>
        </div>
      </div>
    `,
  }),
}; 
