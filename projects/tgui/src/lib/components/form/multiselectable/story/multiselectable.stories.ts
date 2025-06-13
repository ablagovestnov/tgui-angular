import { type Meta, type StoryObj } from '@storybook/angular';
import { MultiselectableComponent } from '../multiselectable.component';
import { PlaceholderComponent } from '../../../blocks/placeholder/placeholder.component';
import { CellComponent } from '../../../blocks/cell/cell.component';

const meta: Meta<MultiselectableComponent> = {
  title: 'Form/Multiselectable',
  component: MultiselectableComponent,
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
type Story = StoryObj<MultiselectableComponent>;

export const Playground: Story = {
  args: {
    checked: true,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [MultiselectableComponent, PlaceholderComponent],
    },
    template: `
      <tgui-placeholder 
        description="This component wraps input with type=checkbox, see usage example on the With Cell page">
        <tgui-multiselectable 
          [checked]="checked" 
          [disabled]="disabled" 
          [name]="name"
          [value]="value">
        </tgui-multiselectable>
      </tgui-placeholder>
    `,
  })
};

export const WithCell: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [MultiselectableComponent, CellComponent],
    },
    template: `
      <form>
        <tgui-cell
          [propagateEvents]="true"
          description="Pass propagateEvents=true to Cell to make it clickable."
          [multiline]="true"
          [beforeTemplate]="multiselectTemplate1"
        >
          Multiselect in cell 1
        </tgui-cell>
        <tgui-cell
          [propagateEvents]="true"
          description="Pass propagateEvents=true to Cell to make it clickable."
          [multiline]="true"
          [beforeTemplate]="multiselectTemplate2"
        >
          Multiselect in cell 2
        </tgui-cell>

        <ng-template #multiselectTemplate1>
          <tgui-multiselectable name="multiselect" value="1"></tgui-multiselectable>
        </ng-template>

        <ng-template #multiselectTemplate2>
          <tgui-multiselectable name="multiselect" value="2"></tgui-multiselectable>
        </ng-template>
      </form>
    `,
  })
}; 