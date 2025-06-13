import { type Meta, type StoryObj } from '@storybook/angular';
import { RatingComponent } from '../rating.component';
import { SectionComponent } from '../../../blocks/section/section.component';

const meta: Meta<RatingComponent> = {
  title: 'Form/Rating',
  component: RatingComponent,
  tags: ['autodocs'],
  argTypes: {
    precision: {
      options: [0.1, 0.2, 0.25, 0.5, 1],
      control: { type: 'select' },
      description: 'The precision of the rating, determining the fraction of the star that can be selected.',
      defaultValue: 1,
    },
    max: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'The maximum rating value, representing the number of icons displayed.',
      defaultValue: 5,
    },
    ratingValue: {
      control: { type: 'number', min: 0, max: 10, step: 0.1 },
      description: 'The current value of the rating.',
      defaultValue: 0,
    }
  },
  args: {
    precision: 1,
    max: 5,
    ratingValue: 0
  }
};

export default meta;
type Story = StoryObj<RatingComponent>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [RatingComponent, SectionComponent],
    },
    template: `
      <tgui-section
        header="Navigate with tabs!"
        footer="Use the keyboard to navigate between the stars and also click on them"
      >
        <tgui-rating 
          [precision]="precision" 
          [max]="max" 
          [(ratingValue)]="ratingValue">
        </tgui-rating>
      </tgui-section>
    `,
  })
};

export const CustomIcon: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [RatingComponent, SectionComponent],
    },
    template: `
      <tgui-section header="We can use custom SVG icons in the future">
        <tgui-rating 
          [precision]="precision" 
          [max]="max" 
          [(ratingValue)]="ratingValue">
        </tgui-rating>
      </tgui-section>
    `,
  })
}; 