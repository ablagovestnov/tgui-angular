import { type Meta, type StoryObj } from '@storybook/angular';
import { CheckboxComponent } from '../checkbox.component';
import { PlaceholderComponent } from '../../../blocks/placeholder/placeholder.component';
import { CellComponent } from '../../../blocks/cell/cell.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Form/Checkbox',
  component: CheckboxComponent,
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
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state',
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
    indeterminate: false,
  }
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Playground: Story = {
  args: {
    checked: true,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [CheckboxComponent, PlaceholderComponent],
    },
    template: `
      <tgui-placeholder 
        description="This component wraps input with type=checkbox, see usage example on the With Cells page">
        <tgui-checkbox 
          [checked]="checked" 
          [disabled]="disabled" 
          [indeterminate]="indeterminate"
          [name]="name"
          [value]="value">
        </tgui-checkbox>
      </tgui-placeholder>
    `,
  })
};

// TODO: Cell component doesn't propagate clicks to its children, which prevents creating
// a Cell with clickable elements inside. This needs to be fixed in the Cell component to
// properly handle click events and propagate them to children like checkbox.

export const WithCells: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [CheckboxComponent, CellComponent],
    },
    template: `
      <tgui-cell
        description="Pass a label element to make it clickable."
        [multiline]="true"
        [beforeTemplate]="checkboxTemplate1">
        Apples
      </tgui-cell>
      
      <tgui-cell
        description="Pass a label element to make it clickable."
        [multiline]="true"
        [beforeTemplate]="checkboxTemplate2">
        Milk
      </tgui-cell>

      <ng-template #checkboxTemplate1>
        <tgui-checkbox 
          [checked]="checked" 
          [disabled]="disabled" 
          [name]="'checkbox'" 
          [value]="'1'">
        </tgui-checkbox>
      </ng-template>

      <ng-template #checkboxTemplate2>
        <tgui-checkbox 
          [checked]="checked" 
          [disabled]="disabled" 
          [name]="'checkbox'" 
          [value]="'2'">
        </tgui-checkbox>
      </ng-template>
    `,
  })
}; 