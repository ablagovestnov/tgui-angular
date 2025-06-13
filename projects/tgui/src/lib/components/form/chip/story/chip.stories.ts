import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ChipComponent } from '../chip.component';
import { AvatarComponent } from '../../../blocks/avatar/avatar.component';
import { TguiIcon16Cancel } from '../../../../icons/icon16/tgui-icon16-cancel';
import { CommonModule } from '@angular/common';
import { RadioComponent } from '../../radio/radio.component';

const meta: Meta<ChipComponent> = {
  title: 'Form/Chip',
  component: ChipComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ChipComponent, AvatarComponent, TguiIcon16Cancel, CommonModule, RadioComponent],
    }),
  ],
  argTypes: {
    mode: {
      options: ['elevated', 'mono', 'outline'],
      control: { type: 'select' },
      description: 'Defines the visual style of the chip',
      defaultValue: 'elevated',
    },
    before: {
      control: false,
      description: 'Content to be placed before the main text',
    },
    after: {
      control: false,
      description: 'Content to be placed after the main text',
    },
    className: {
      control: 'text',
      description: 'Custom CSS class',
    },
  },
};

export default meta;
type Story = StoryObj<ChipComponent>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="background: var(--tgui--secondary_bg_color); padding: 20px; width: 500px;">
        <div style="display: flex; gap: 16px;">
          <tgui-chip [mode]="mode" [className]="className">Chip</tgui-chip>
          <tgui-chip [mode]="mode" [className]="className">'n'</tgui-chip>
          <tgui-chip [mode]="mode" [className]="className">Dale</tgui-chip>
        </div>
        <div style="display: flex; gap: 16px; margin-top: 16px;">
          <tgui-chip mode="mono" [className]="className">Chip</tgui-chip>
          <tgui-chip mode="mono" [className]="className">'n'</tgui-chip>
          <tgui-chip mode="mono" [className]="className">Dale</tgui-chip>
        </div>
        <div style="display: flex; gap: 16px; margin-top: 16px;">
          <tgui-chip mode="outline" [className]="className">Chip</tgui-chip>
          <tgui-chip mode="outline" [className]="className">'n'</tgui-chip>
          <tgui-chip mode="outline" [className]="className">Dale</tgui-chip>
        </div>
      </div>
    `,
  }),
  args: {
    mode: 'elevated',
    className: '',
  },
};

export const WithAfter: Story = {
  render: () => ({
    template: `
      <div style="background: var(--tgui--secondary_bg_color); padding: 20px; width: 500px;">
        <div style="display: flex; gap: 8px;">
          <tgui-chip mode="elevated" [after]="cancelIcon">
            Elevated
          </tgui-chip>
          <tgui-chip mode="mono" [after]="cancelIcon">
            Mono
          </tgui-chip>
          <tgui-chip mode="outline" [after]="cancelIcon">
            Outline
          </tgui-chip>
        </div>
      </div>

      <ng-template #cancelIcon>
        <tgui-icon16-cancel></tgui-icon16-cancel>
      </ng-template>
    `,
  }),
};

export const WithBefore: Story = {
  render: () => ({
    template: `
      <div style="background: var(--tgui--secondary_bg_color); padding: 20px; width: 500px;">
        <div style="display: flex; gap: 8px;">
          <tgui-chip mode="elevated" [before]="avatarTemplate">
            Elevated
          </tgui-chip>
          <tgui-chip mode="mono" [before]="avatarTemplate">
            Mono
          </tgui-chip>
          <tgui-chip mode="outline" [before]="avatarTemplate">
            Outline
          </tgui-chip>
        </div>
      </div>

      <ng-template #avatarTemplate>
        <tgui-avatar size="xs"></tgui-avatar>
      </ng-template>
    `,
  }),
};

export const WithRadioBefore: Story = {
  render: () => ({
    template: `
      <div style="background: var(--tgui--secondary_bg_color); padding: 20px; width: 500px;">
        <div style="display: flex; gap: 8px;">
          <label style="display: contents">
            <tgui-chip mode="elevated" [before]="radioChecked">
              Elevated
            </tgui-chip>
          </label>
          <label style="display: contents">
            <tgui-chip mode="mono" [before]="radioUnchecked1">
              Mono
            </tgui-chip>
          </label>
          <label style="display: contents">
            <tgui-chip mode="outline" [before]="radioUnchecked2">
              Outline
            </tgui-chip>
          </label>
        </div>
      </div>

      <ng-template #radioChecked>
        <tgui-radio name="test" [checked]="true"></tgui-radio>
      </ng-template>

      <ng-template #radioUnchecked1>
        <tgui-radio name="test"></tgui-radio>
      </ng-template>

      <ng-template #radioUnchecked2>
        <tgui-radio name="test"></tgui-radio>
      </ng-template>
    `,
  }),
}; 