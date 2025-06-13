import { type Meta, type StoryObj } from '@storybook/angular';
import { SwitchComponent } from '../switch.component';
import { PlaceholderComponent } from '../../../blocks/placeholder/placeholder.component';
import { CellComponent } from '../../../blocks/cell/cell.component';

const meta: Meta<SwitchComponent> = {
  title: 'Form/Switch',
  component: SwitchComponent,
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
type Story = StoryObj<SwitchComponent>;

export const Playground: Story = {
  args: {
    checked: true,
  },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [SwitchComponent, PlaceholderComponent],
    },
    template: `
      <tgui-placeholder 
        description="This component wraps input with type=checkbox, see usage example on the With Cell page">
        <div style="display: flex; gap: 6px;">
          <tgui-switch [checked]="false" [disabled]="disabled"></tgui-switch>
          <tgui-switch [checked]="true" [disabled]="disabled"></tgui-switch>
          <tgui-switch [checked]="false" [disabled]="true"></tgui-switch>
          <tgui-switch [checked]="true" [disabled]="true"></tgui-switch>
        </div>
      </tgui-placeholder>
    `,
  })
};

export const WithCell: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [SwitchComponent, CellComponent],
    },
    template: `
      <tgui-cell
        [propagateEvents]="true"
        description="Clicking anywhere on this cell will toggle the switch with ripple effects!"
        [multiline]="true"
        [afterTemplate]="switchTemplate">
        First option
      </tgui-cell>

      <ng-template #switchTemplate>
        <tgui-switch 
          [checked]="true" 
          [disabled]="disabled">
        </tgui-switch>
      </ng-template>
    `,
  })
}; 