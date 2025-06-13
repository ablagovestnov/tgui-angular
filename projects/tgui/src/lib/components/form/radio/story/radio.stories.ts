import { type Meta, type StoryObj } from '@storybook/angular';
import { RadioComponent } from '../radio.component';
import { PlaceholderComponent } from '../../../blocks/placeholder/placeholder.component';
import { CellComponent } from '../../../blocks/cell/cell.component';

const meta: Meta<RadioComponent> = {
  title: 'Form/Radio',
  component: RadioComponent,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Checked state',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      defaultValue: false,
    },
    name: {
      control: 'text',
      description: 'Input name attribute',
    },
    value: {
      control: 'text',
      description: 'Input value attribute',
    },
  },
  args: {
    checked: false,
    disabled: false,
  }
};

export default meta;
type Story = StoryObj<RadioComponent>;

export const Playground: Story = {
  args: {
    checked: true,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [RadioComponent, PlaceholderComponent],
    },
    template: `
      <tgui-placeholder 
        description="This component wraps input with type=radio, see usage example on the With Cells page">
        <tgui-radio 
          [checked]="checked" 
          [disabled]="disabled" 
          [name]="name"
          [value]="value">
        </tgui-radio>
      </tgui-placeholder>
    `,
  })
};

export const WithCells: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [RadioComponent, CellComponent],
    },
    template: `
      <form>
        <tgui-cell
          description="Pass propagateEvents=true to Cell to make it clickable."
          [multiline]="true"
          [propagateEvents]="true" 
          [beforeTemplate]="radioTemplate1">
          First radio
        </tgui-cell>
        
        <tgui-cell
          description="Pass propagateEvents=true to Cell to make it clickable."
          [multiline]="true"
          [propagateEvents]="true"
          [beforeTemplate]="radioTemplate2">
          Second radio
        </tgui-cell>

        <ng-template #radioTemplate1>
          <tgui-radio 
            [name]="'radio'" 
            [value]="'1'">
          </tgui-radio>
        </ng-template>

        <ng-template #radioTemplate2>
          <tgui-radio 
            [name]="'radio'" 
            [value]="'2'">
          </tgui-radio>
        </ng-template>
      </form>
    `,
  })
}; 