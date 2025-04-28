import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { SectionComponent } from './section.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { SectionFooterComponent } from './components/section-footer/section-footer.component';
import { TextComponent } from '@typography/text/text.component';
import { DividerComponent } from '@misc/divider/divider.component';

const meta: Meta<SectionComponent> = {
  title: 'Components/Blocks/Section',
  component: SectionComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        SectionComponent,
        SectionHeaderComponent,
        SectionFooterComponent,
        TextComponent,
        DividerComponent
      ],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<SectionComponent>;

export const Default: Story = {
  args: {
    header: 'Section Header',
    footer: 'Section Footer',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px;">
        <tgui-section [header]="header" [footer]="footer">
          <div style="padding: 16px;">
            <tgui-text>Basic section content</tgui-text>
          </div>
        </tgui-section>
      </div>
    `,
  }),
};

export const WithLargeHeader: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px;">
        <tgui-section>
          <tgui-section-header [large]="true">Large Header</tgui-section-header>
          <div style="padding: 16px;">
            <tgui-text>Section with large header</tgui-text>
          </div>
        </tgui-section>
      </div>
    `,
  }),
};

export const WithCenteredFooter: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px;">
        <tgui-section>
          <tgui-section-header>Section Header</tgui-section-header>
          <div style="padding: 16px;">
            <tgui-text>Section with centered footer</tgui-text>
          </div>
          <tgui-section-footer [centered]="true">Centered Footer</tgui-section-footer>
        </tgui-section>
      </div>
    `,
  }),
};

export const MultipleItems: Story = {
  args: {
    header: 'Multiple Items',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px;">
        <tgui-section [header]="header">
          <div style="padding: 16px;">
            <tgui-text>First section item</tgui-text>
          </div>
          <div style="padding: 16px;">
            <tgui-text>Second section item</tgui-text>
          </div>
          <div style="padding: 16px;">
            <tgui-text>Third section item</tgui-text>
          </div>
        </tgui-section>
      </div>
    `,
  }),
}; 