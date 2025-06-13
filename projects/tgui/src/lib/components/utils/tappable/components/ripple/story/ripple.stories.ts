import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { RippleComponent } from '../ripple.component';
import { CommonModule } from '@angular/common';
import { RippleWave } from '../../../../../../services/ripple.service';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<RippleComponent> = {
  title: 'Utils/Ripple',
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

// Demo component with ripple effect simulation
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
        content: 'Click for demonstration';
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
        <p>Ripple component creates a wave effect when an interactive element is pressed.
           This effect is automatically used in the Button component with interactiveAnimation="background" value.</p>
        <p>Ripple effect is displayed only on non-iOS platforms as it does not comply with iOS design guidelines.</p>
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

// Usage description
export const Usage: Story = {
  render: () => ({
    template: `
      <div style="max-width: 700px;">
        <h3>How to use Ripple</h3>
        <p>The Ripple component is usually not used directly in developer code, 
        but is integrated into buttons and other interactive elements.</p>
        
        <h4>Example of usage in the Button component:</h4>
        <pre>
&lt;tgui-button interactiveAnimation="background"&gt;
  With ripple effect
&lt;/tgui-button&gt;
        </pre>
        
        <p>The Ripple component is automatically displayed only on non-iOS platforms and
        when the button has the parameter interactiveAnimation="background".</p>
      </div>
    `,
  }),
}; 
