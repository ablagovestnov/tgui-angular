import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ImageComponent, ImageBadgeComponent } from '../index';
import { TguiIcon24Qr } from '../../../../icons/icon24/tgui-icon24-qr';

export default {
  title: 'Blocks/Image',
  component: ImageComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ImageComponent, ImageBadgeComponent, TguiIcon24Qr]
    })
  ],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: [20, 24, 28, 40, 48, 96],
      description: 'Image size in pixels'
    },
    src: {
      control: 'text',
      description: 'Source URL of the image'
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image'
    }
  }
} as Meta<ImageComponent>;

type Story = StoryObj<ImageComponent>;

// Basic example with source
export const Basic: Story = {
  render: () => ({
    props: {},
    template: `
      <tgui-image [size]="96" [src]="'https://placehold.co/96x96/png'" [alt]="'Sample image'"></tgui-image>
    `
  }),
};


// Different sizes
export const Sizes: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 16px; align-items: flex-end;">
        <tgui-image [size]="20" [src]="'https://placehold.co/20x20/png'" [alt]="'Size 20'"></tgui-image>
        <tgui-image [size]="24" [src]="'https://placehold.co/24x24/png'" [alt]="'Size 24'"></tgui-image>
        <tgui-image [size]="28" [src]="'https://placehold.co/28x28/png'" [alt]="'Size 28'"></tgui-image>
        <tgui-image [size]="40" [src]="'https://placehold.co/40x40/png'" [alt]="'Size 40'"></tgui-image>
        <tgui-image [size]="48" [src]="'https://placehold.co/48x48/png'" [alt]="'Size 48'"></tgui-image>
        <tgui-image [size]="96" [src]="'https://placehold.co/96x96/png'" [alt]="'Size 96'"></tgui-image>
      </div>
    `
  })
};

// With fallback icon
export const WithFallbackIcon: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 16px;">
        <tgui-image [size]="96">
          <ng-template #fallbackIcon>
            <div style="font-size: 24px;">🖼️</div>
          </ng-template>
        </tgui-image>
      </div>
    `
  })
};

// With badge
export const WithBadge: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 16px;">
        <tgui-image [size]="40" [src]="'https://placehold.co/40x40/png'" [alt]="'Image with badge'">
          <tgui-image-badge [count]="5"></tgui-image-badge>
        </tgui-image>
        
        <tgui-image [size]="40" [src]="'https://placehold.co/40x40/png'" [alt]="'Image with large count badge'">
          <tgui-image-badge [count]="125" [maxCount]="99"></tgui-image-badge>
        </tgui-image>
      </div>
    `
  })
};

// Basic example with source
export const WithChildren: Story = {
    render: () => ({
      props: {},
      template: `
        <tgui-image [size]="96">
          <tgui-icon24-qr></tgui-icon24-qr>
        </tgui-image>
      `
    }),
  };

// Loading state simulation
export const LoadingStates: Story = {
  render: () => ({
    props: {},
    template: `
      <div style="display: flex; gap: 16px;">
        <tgui-image [size]="40" [src]="'https://placehold.co/40x40/png?text=Loading'" [alt]="'Loading image'"></tgui-image>
        
        <tgui-image [size]="40" [alt]="'Failed image'">
          <ng-template #fallbackIcon>
            <div style="font-size: 18px;">❓</div>
          </ng-template>
        </tgui-image>
      </div>
    `
  })
}; 