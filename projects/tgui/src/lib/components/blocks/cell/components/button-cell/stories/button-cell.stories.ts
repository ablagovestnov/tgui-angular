import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ButtonCellComponent } from '../button-cell.component';
import { TguiIcon28AddCircle } from '../../../../../../icons/icon28/tgui-icon28-add-circle';
import { SectionComponent } from '../../../../section/section.component';
import { CellComponent } from '../../../cell.component';
import { CommonModule } from '@angular/common';
import { TguiIcon32ProfileColoredSquare } from '../../../../../../icons';
import { ListComponent } from '../../../../list/list.component';
/**
 * The ButtonCell component is an interactive cell component that combines
 * the flexibility of a cell with button-like interaction behavior.
 */
const meta: Meta<ButtonCellComponent> = {
  title: 'Blocks/Cell/ButtonCell',
  component: ButtonCellComponent,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        TguiIcon28AddCircle,
        SectionComponent,
        CellComponent,
        TguiIcon32ProfileColoredSquare,
        ListComponent
      ],
    }),
  ],
  argTypes: {
    mode: {
      control: { type: 'select', options: ['default', 'destructive'] },
      description: 'Determines the button cell\'s visual theme',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables button interaction',
    }
  }
};

export default meta;

type Story = StoryObj<ButtonCellComponent>;

export const Playground: Story = {
  args: {
    mode: 'default',
    disabled: false
  },
  render: (args) => ({
    props: {
      ...args,
      modeValue: args.mode,
      disabledValue: args.disabled
    },
    template: `
    <tgui-list>
      <div style="background: var(--tgui--secondary_bg_color); padding: 10px;">
        <tgui-section>
          <tgui-cell
            [title]="'My Ads'"
            [subtitle]="'Manage ads and payment settings'"
            [beforeTemplate]="cellBeforeTemplate"
          >
          </tgui-cell>
          <tgui-button-cell
            [mode]="modeValue"
            [disabled]="disabledValue"
            [beforeTemplate]="buttonBeforeTemplate"
          >
            Create Ad
          </tgui-button-cell>
        </tgui-section>
      </div>
    </tgui-list>

    <ng-template #cellBeforeTemplate>
      <tgui-icon32-profile-colored-square></tgui-icon32-profile-colored-square>
    </ng-template>

    <ng-template #buttonBeforeTemplate>
      <tgui-icon28-add-circle></tgui-icon28-add-circle>
    </ng-template>
    `
  })
};

export const Multiple: Story = {
  render: () => ({
    template: `
    <tgui-list>
      <div style="background: var(--tgui--secondary_bg_color); padding: 10px;">
        <tgui-section [header]="'Account Settings'">
          <tgui-button-cell [beforeTemplate]="beforeTemplate">
            Change Username
          </tgui-button-cell>
          <tgui-button-cell [beforeTemplate]="beforeTemplate">
            Change Phone Number
          </tgui-button-cell>
          <tgui-button-cell [beforeTemplate]="beforeTemplate">
            Change Email
          </tgui-button-cell>
        </tgui-section>

        <tgui-section [header]="'Privacy & Security'" style="margin-top: 16px;">
          <tgui-button-cell [beforeTemplate]="beforeTemplate">
            Privacy Settings
          </tgui-button-cell>
          <tgui-button-cell [beforeTemplate]="beforeTemplate">
            Security Settings
          </tgui-button-cell>
          <tgui-button-cell [mode]="'destructive'" [beforeTemplate]="beforeTemplate">
            Delete Account
          </tgui-button-cell>
        </tgui-section>
      </div>
    </tgui-list>

    <ng-template #beforeTemplate>
      <tgui-icon28-add-circle></tgui-icon28-add-circle>
    </ng-template>
    `
  })
}; 