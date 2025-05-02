import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ButtonCellComponent } from '../button-cell.component';
import { TguiIcon28AddCircle } from '@tgui/lib/icons/icon28/tgui-icon28-add-circle';
import { SectionComponent } from '@tgui/lib/components/blocks/section/section.component';
import { CellComponent } from '@tgui/lib/components/blocks/cell/cell.component';
import { CommonModule } from '@angular/common';
import { ContentSlotDirective } from '@tgui/lib/directives/content-slot.directive';
import { TguiIcon32ProfileColoredSquare } from '@tgui/lib/icons';
import { ListComponent } from '@tgui/lib/components/blocks/list/list.component';
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
        ContentSlotDirective,
        TguiIcon32ProfileColoredSquare,
        ListComponent
      ],
    }),
  ],
};

export default meta;

type Story = StoryObj<ButtonCellComponent>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
    <tgui-list>
      <div style="background: var(--tgui--secondary_bg_color); padding: 10px;">
        <tgui-section>
          <tgui-cell>
            <tgui-icon32-profile-colored-square content-slot="before"></tgui-icon32-profile-colored-square>
            <div content-slot="title">My Ads</div>
            <div content-slot="subtitle">Manage ads and payment settings</div>
          </tgui-cell>
          <tgui-button-cell>
            <tgui-icon28-add-circle content-slot="before"></tgui-icon28-add-circle>
            Create Ad
          </tgui-button-cell>
        </tgui-section>
      </div>
    </tgui-list>
    `
  })
};

export const Multiple: Story = {
  render: () => ({
    template: `
    <tgui-list>
      <div style="background: var(--tgui--secondary_bg_color); padding: 10px;">
        <tgui-section header="Account Settings">
          <tgui-button-cell>
            <tgui-icon28-add-circle content-slot="before"></tgui-icon28-add-circle>
            Change Username
          </tgui-button-cell>
          <tgui-button-cell>
            <tgui-icon28-add-circle content-slot="before"></tgui-icon28-add-circle>
            Change Phone Number
          </tgui-button-cell>
          <tgui-button-cell>
            <tgui-icon28-add-circle content-slot="before"></tgui-icon28-add-circle>
            Change Email
          </tgui-button-cell>
        </tgui-section>

        <tgui-section header="Privacy & Security" style="margin-top: 16px;">
          <tgui-button-cell>
            <tgui-icon28-add-circle content-slot="before"></tgui-icon28-add-circle>
            Privacy Settings
          </tgui-button-cell>
          <tgui-button-cell>
            <tgui-icon28-add-circle content-slot="before"></tgui-icon28-add-circle>
            Security Settings
          </tgui-button-cell>
          <tgui-button-cell [mode]="'destructive'">
            <tgui-icon28-add-circle content-slot="before"></tgui-icon28-add-circle>
            Delete Account
          </tgui-button-cell>
        </tgui-section>
      </div>
    </tgui-list>
    `
  })
}; 