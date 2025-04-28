import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { SpinnerComponent } from '../spinner.component';
import { CommonModule } from '@angular/common';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<SpinnerComponent> = {
  title: 'TGUI/Feedback/Spinner',
  component: SpinnerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, SpinnerComponent],
    }),
  ],
  argTypes: {
    size: {
      options: ['s', 'm', 'l'],
      control: { type: 'select' },
      description: 'Размер индикатора загрузки',
      defaultValue: 'm',
    }
  },
};

export default meta;
type Story = StoryObj<SpinnerComponent>;

// Basic spinner with different sizes
export const Basic: Story = {
  args: {
    size: 'm',
  },
  render: (args) => ({
    props: args,
    template: `<tgui-spinner [size]="size"></tgui-spinner>`,
  }),
};

// All size variants
export const Sizes: Story = {
  render: () => ({
    styles: [`
      .spinner-container {
        display: flex;
        gap: 24px;
        align-items: center;
      }
      .spinner-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }
      .spinner-label {
        font-size: 14px;
        margin-top: 8px;
      }
    `],
    template: `
      <div class="spinner-container">
        <div class="spinner-item">
          <tgui-spinner size="s"></tgui-spinner>
          <span class="spinner-label">Small (s)</span>
        </div>
        <div class="spinner-item">
          <tgui-spinner size="m"></tgui-spinner>
          <span class="spinner-label">Medium (m)</span>
        </div>
        <div class="spinner-item">
          <tgui-spinner size="l"></tgui-spinner>
          <span class="spinner-label">Large (l)</span>
        </div>
      </div>
    `,
  }),
};

// Platform-specific appearance
export const PlatformSpecific: Story = {
  render: () => ({
    styles: [`
      .platform-demo {
        display: flex;
        flex-direction: column;
        gap: 32px;
      }
      .platform-container {
        padding: 24px;
        border-radius: 8px;
        background-color: var(--tgui--secondary_fill);
      }
      .platform-title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 16px;
      }
      .platform-spinners {
        display: flex;
        gap: 24px;
      }
    `],
    template: `
      <div class="platform-demo">
        <div>
          <p>
            Компонент Spinner автоматически адаптируется к текущей платформе. 
            На iOS отображается круговой индикатор со сплошной заливкой, на Android/Web - круговой прогресс.
          </p>
        </div>
        
        <div class="platform-container">
          <div class="platform-title">iOS Spinner (для примера)</div>
          <div class="platform-spinners">
            <tgui-spinner size="s" class="platform-ios"></tgui-spinner>
            <tgui-spinner size="m" class="platform-ios"></tgui-spinner>
            <tgui-spinner size="l" class="platform-ios"></tgui-spinner>
          </div>
        </div>
        
        <div class="platform-container">
          <div class="platform-title">Android/Web Spinner (для примера)</div>
          <div class="platform-spinners">
            <tgui-spinner size="s"></tgui-spinner>
            <tgui-spinner size="m"></tgui-spinner>
            <tgui-spinner size="l"></tgui-spinner>
          </div>
        </div>
      </div>
    `,
  }),
};

// Custom colors
export const CustomColors: Story = {
  render: () => ({
    styles: [`
      .color-container {
        display: flex;
        gap: 24px;
      }
      .color-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
        border-radius: 8px;
      }
      .color-item:nth-child(1) {
        color: var(--tgui--link_color);
      }
      .color-item:nth-child(2) {
        color: var(--tgui--destructive);
      }
      .color-item:nth-child(3) {
        color: #4CAF50;
      }
      .color-item:nth-child(4) {
        background: #333;
        color: white;
      }
      .color-label {
        margin-top: 8px;
        font-size: 14px;
      }
    `],
    template: `
      <div>
        <p style="margin-bottom: 16px;">
          Цвет спиннера наследуется от родительского контейнера через CSS свойство <code>color</code>.
        </p>
        
        <div class="color-container">
          <div class="color-item">
            <tgui-spinner></tgui-spinner>
            <span class="color-label">Primary</span>
          </div>
          <div class="color-item">
            <tgui-spinner></tgui-spinner>
            <span class="color-label">Destructive</span>
          </div>
          <div class="color-item">
            <tgui-spinner></tgui-spinner>
            <span class="color-label">Success</span>
          </div>
          <div class="color-item">
            <tgui-spinner></tgui-spinner>
            <span class="color-label">Light</span>
          </div>
        </div>
      </div>
    `,
  }),
};
