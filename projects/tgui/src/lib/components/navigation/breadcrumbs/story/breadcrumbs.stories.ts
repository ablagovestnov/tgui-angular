import { type Meta, type StoryObj } from '@storybook/angular';
import { BreadcrumbsComponent, BreadcrumbItem, BreadcrumbsDividerType } from '../breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRouter } from '@angular/router';

const meta: Meta<BreadcrumbsComponent> = {
  title: 'Navigation/Breadcrumbs',
  component: BreadcrumbsComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [RouterModule]
    }),
    applicationConfig({
      providers: [provideRouter([])]
    })
  ],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items to display',
    },
    divider: {
      options: ['dot', 'slash', 'chevron'],
      control: { type: 'select' },
      description: 'Type of divider between breadcrumb items',
      defaultValue: 'dot',
    }
  },
};

export default meta;
type Story = StoryObj<BreadcrumbsComponent>;

// Sample breadcrumb items
const sampleItems: BreadcrumbItem[] = [
  { label: 'First'},
  { label: 'Secont'},
  { label: 'Third' },
];

// Basic story with default props
export const Basic: Story = {
  args: {
    items: sampleItems,
    divider: 'dot'
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-breadcrumbs 
        [items]="items" 
        [divider]="divider"
      ></tgui-breadcrumbs>
    `,
  }),
};

// Story showing different divider types
export const DividerTypes: Story = {
  render: () => {
    const items: BreadcrumbItem[] = [
      { label: 'Home', routerLink: '/' },
      { label: 'Products', routerLink: '/products' },
      { label: 'Current Product' }
    ];

    return {
      props: { items },
      template: `
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <div>
            <h3 style="margin-bottom: 8px;">Dot Divider</h3>
            <tgui-breadcrumbs [items]="items" divider="dot"></tgui-breadcrumbs>
          </div>
          <div>
            <h3 style="margin-bottom: 8px;">Slash Divider</h3>
            <tgui-breadcrumbs [items]="items" divider="slash"></tgui-breadcrumbs>
          </div>
          <div>
            <h3 style="margin-bottom: 8px;">Chevron Divider</h3>
            <tgui-breadcrumbs [items]="items" divider="chevron"></tgui-breadcrumbs>
          </div>
        </div>
      `
    };
  }
};

// Story showing different item configurations
export const ItemConfigurations: Story = {
  render: () => {
    const singleItem: BreadcrumbItem[] = [
      { label: 'Home' }
    ];

    const twoItems: BreadcrumbItem[] = [
      { label: 'Home', routerLink: '/' },
      { label: 'Products' }
    ];

    const threeItems: BreadcrumbItem[] = [
      { label: 'Home', routerLink: '/' },
      { label: 'Products', routerLink: '/products' },
      { label: 'Electronics' }
    ];

    const longBreadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', routerLink: '/' },
      { label: 'Catalog', routerLink: '/catalog' },
      { label: 'Electronics', routerLink: '/catalog/electronics' },
      { label: 'Computers', routerLink: '/catalog/electronics/computers' },
      { label: 'Laptops', routerLink: '/catalog/electronics/computers/laptops' },
      { label: 'MacBook Pro' }
    ];

    return {
      props: { singleItem, twoItems, threeItems, longBreadcrumbs },
      template: `
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <div>
            <h3 style="margin-bottom: 8px;">Single Item</h3>
            <tgui-breadcrumbs [items]="singleItem" divider="dot"></tgui-breadcrumbs>
          </div>
          <div>
            <h3 style="margin-bottom: 8px;">Two Items</h3>
            <tgui-breadcrumbs [items]="twoItems" divider="dot"></tgui-breadcrumbs>
          </div>
          <div>
            <h3 style="margin-bottom: 8px;">Three Items</h3>
            <tgui-breadcrumbs [items]="threeItems" divider="slash"></tgui-breadcrumbs>
          </div>
          <div>
            <h3 style="margin-bottom: 8px;">Long Breadcrumbs</h3>
            <tgui-breadcrumbs [items]="longBreadcrumbs" divider="chevron"></tgui-breadcrumbs>
          </div>
        </div>
      `
    };
  }
};

// Story showing different link types
export const LinkTypes: Story = {
  render: () => {
    const mixedLinks: BreadcrumbItem[] = [
      { label: 'Home', routerLink: '/' },
      { label: 'Products', routerLink: ['/products', { category: 'tech' }] },
      { label: 'External', href: 'https://example.com', target: '_blank' },
      { label: 'Current Page' }
    ];

    return {
      props: { mixedLinks },
      template: `
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <div>
            <h3 style="margin-bottom: 8px;">Mixed Link Types</h3>
            <p>Shows both internal navigation (routerLink) and external links (href)</p>
            <tgui-breadcrumbs [items]="mixedLinks" divider="chevron"></tgui-breadcrumbs>
          </div>
        </div>
      `
    };
  }
}; 