import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../button.component';
import { SpinnerComponent } from '@feedback/spinner/spinner.component';
import { RippleComponent } from '@service/tappable/components/ripple/ripple.component';
import { CommonModule } from '@angular/common';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<ButtonComponent> = {
  title: 'TGUI/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ButtonComponent, SpinnerComponent, RippleComponent],
    }),
  ],
  argTypes: {
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'select' },
      description: 'Размер кнопки',
      defaultValue: 'm',
    },
    mode: {
      options: ['filled', 'bezeled', 'plain', 'gray', 'outline', 'white'],
      control: { type: 'select' },
      description: 'Вариант отображения кнопки',
      defaultValue: 'filled',
    },
    stretched: {
      control: 'boolean',
      description: 'Растягивать кнопку на всю ширину',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      description: 'Показывать индикатор загрузки',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      description: 'Отключенное состояние',
      defaultValue: false,
    },
    interactiveAnimation: {
      options: ['opacity', 'background'],
      control: { type: 'radio' },
      description: 'Тип анимации при взаимодействии',
      defaultValue: 'background',
    }
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Basic: Story = {
  args: {
    size: 'm',
    mode: 'filled',
    stretched: false,
    loading: false,
    disabled: false,
    interactiveAnimation: 'background'
  },
  render: (args) => ({
    props: args,
    template: `
      <tgui-button 
        [size]="size" 
        [mode]="mode" 
        [stretched]="stretched" 
        [loading]="loading" 
        [disabled]="disabled"
        [interactiveAnimation]="interactiveAnimation"
      >
        Кнопка
      </tgui-button>
    `,
  }),
};

export const Modes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 16px;">
        <tgui-button mode="filled">Filled</tgui-button>
        <tgui-button mode="bezeled">Bezeled</tgui-button>
        <tgui-button mode="plain">Plain</tgui-button>
        <tgui-button mode="gray">Gray</tgui-button>
        <tgui-button mode="outline">Outline</tgui-button>
        <tgui-button mode="white">White</tgui-button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center;">
        <tgui-button size="s">Small</tgui-button>
        <tgui-button size="m">Medium</tgui-button>
        <tgui-button size="l">Large</tgui-button>
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <tgui-button [loading]="true">Загрузка</tgui-button>
        </div>
        <div>
          <tgui-button [disabled]="true">Отключена</tgui-button>
        </div>
        <div style="width: 100%;">
          <tgui-button [stretched]="true">Растянутая кнопка</tgui-button>
        </div>
      </div>
    `,
  }),
};

export const RippleEffects: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="margin-bottom: 8px;">
          <strong>Ripple effect (background)</strong>
          <p>Кликните на кнопку, чтобы увидеть эффект ripple (работает на не-iOS платформах)</p>
        </div>
        <div style="display: flex; gap: 16px;">
          <tgui-button interactiveAnimation="background" mode="filled">Background Ripple</tgui-button>
          <tgui-button interactiveAnimation="background" mode="bezeled">Background Ripple</tgui-button>
          <tgui-button interactiveAnimation="background" mode="plain">Background Ripple</tgui-button>
        </div>
        
        <div style="margin: 16px 0 8px 0;">
          <strong>Без ripple (opacity)</strong>
        </div>
        <div style="display: flex; gap: 16px;">
          <tgui-button interactiveAnimation="opacity" mode="filled">Opacity Effect</tgui-button>
          <tgui-button interactiveAnimation="opacity" mode="bezeled">Opacity Effect</tgui-button>
          <tgui-button interactiveAnimation="opacity" mode="plain">Opacity Effect</tgui-button>
        </div>
      </div>
    `,
  }),
};
