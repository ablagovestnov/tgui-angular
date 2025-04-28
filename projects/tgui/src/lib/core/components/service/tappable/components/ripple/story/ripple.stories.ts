import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { RippleComponent } from '../ripple.component';
import { CommonModule } from '@angular/common';
import { RippleWave } from '@services/ripple.service';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<RippleComponent> = {
  title: 'TGUI/Utils/Ripple',
  component: RippleComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RippleComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<RippleComponent>;

interface RippleDemoProps {
  waves: RippleWave[];
  addRipple: (event: MouseEvent) => void;
}

// Демонстрационный компонент с симуляцией ripple-эффекта
export const Preview: Story = {
  render: () => ({
    styles: [`
      .ripple-demo {
        position: relative;
        width: 200px;
        height: 200px;
        background-color: var(--tgui--secondary_fill);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        overflow: hidden;
        margin-bottom: 16px;
      }
      
      .ripple-demo::after {
        content: 'Нажмите для демонстрации';
        position: relative;
        z-index: 1;
      }
      
      .description {
        max-width: 600px;
        margin-bottom: 16px;
      }
    `],
    template: `
      <div class="description">
        <p>Ripple компонент создает эффект волны при нажатии на интерактивный элемент.
           Этот эффект автоматически используется в компоненте Button при значении interactiveAnimation="background".</p>
        <p>Ripple эффект отображается только на не-iOS платформах, так как не соответствует дизайн-гайдлайнам iOS.</p>
      </div>
      
      <div #container class="ripple-demo" (click)="addRipple($event)">
        <tgui-ripple [waves]="waves"></tgui-ripple>
      </div>
    `,
    props: {
      waves: [] as RippleWave[],
      addRipple: function(event: MouseEvent) {
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const newWave: RippleWave = {
          x,
          y,
          date: Date.now(),
          pointerId: Date.now() // use timestamp as a unique ID
        };
        
        this['waves'] = [...this['waves'], newWave];
        
        // Clear the wave after animation completes
        setTimeout(() => {
          this['waves'] = this['waves'].filter((wave: RippleWave) => wave.date !== newWave.date);
        }, 300);
      }
    } as RippleDemoProps
  }),
};

// Описание использования
export const Usage: Story = {
  render: () => ({
    template: `
      <div style="max-width: 700px;">
        <h3>Как использовать Ripple</h3>
        <p>Ripple компонент обычно не используется напрямую в коде разработчика, 
        а интегрирован в кнопки и другие интерактивные элементы.</p>
        
        <h4>Пример использования в компоненте Button:</h4>
        <pre>
&lt;tgui-button interactiveAnimation="background"&gt;
  С эффектом ripple
&lt;/tgui-button&gt;
        </pre>
        
        <p>Компонент Ripple автоматически отображается только на не-iOS платформах и
        когда для кнопки установлен параметр interactiveAnimation="background".</p>
      </div>
    `,
  }),
}; 
