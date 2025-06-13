import { type Meta, type StoryObj } from '@storybook/angular';
import { PinInputButtonComponent } from '../pin-input-button.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TappableComponent } from '../../../../../utils/tappable/tappable.component';
import { LargeTitleComponent, TitleComponent } from '../../../../../typography';

const meta: Meta<PinInputButtonComponent> = {
  title: 'Form/PinInput/PinInputButton',
  component: PinInputButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, TappableComponent, LargeTitleComponent, TitleComponent]
    })
  ],
  argTypes: {
    content: {
      control: 'text',
      description: 'Button content to display through input property',
      defaultValue: '1'
    }
  },
  args: {
    content: '1'
  }
};

export default meta;
type Story = StoryObj<PinInputButtonComponent>;

export const WithInputContent: Story = {
  args: {
    content: '3'
  },
  render: (args) => ({
    props: args,
    template: `<tgui-pin-input-button [content]="content"></tgui-pin-input-button>`
  })
};

export const WithProjectedContent: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `<tgui-pin-input-button><tgui-title>2</tgui-title></tgui-pin-input-button>`
  })
};

export const NumbersWithInputContent: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, auto); gap: 10px; padding: 16px; background: var(--tgui--secondary_bg_color);">
        <tgui-pin-input-button [content]="'1'"></tgui-pin-input-button>
        <tgui-pin-input-button [content]="'2'"></tgui-pin-input-button>
        <tgui-pin-input-button [content]="'3'"></tgui-pin-input-button>
        <tgui-pin-input-button [content]="'4'"></tgui-pin-input-button>
        <tgui-pin-input-button [content]="'5'"></tgui-pin-input-button>
        <tgui-pin-input-button [content]="'6'"></tgui-pin-input-button>
        <tgui-pin-input-button [content]="'7'"></tgui-pin-input-button>
        <tgui-pin-input-button [content]="'8'"></tgui-pin-input-button>
        <tgui-pin-input-button [content]="'9'"></tgui-pin-input-button>
        <div></div>
        <tgui-pin-input-button [content]="'0'"></tgui-pin-input-button>
      </div>
    `
  })
};

export const NumbersWithProjectedContent: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, auto); gap: 10px; padding: 16px; background: var(--tgui--secondary_bg_color);">
        <tgui-pin-input-button>1</tgui-pin-input-button>
        <tgui-pin-input-button>2</tgui-pin-input-button>
        <tgui-pin-input-button>3</tgui-pin-input-button>
        <tgui-pin-input-button>4</tgui-pin-input-button>
        <tgui-pin-input-button>5</tgui-pin-input-button>
        <tgui-pin-input-button>6</tgui-pin-input-button>
        <tgui-pin-input-button>7</tgui-pin-input-button>
        <tgui-pin-input-button>8</tgui-pin-input-button>
        <tgui-pin-input-button>9</tgui-pin-input-button>
        <div></div>
        <tgui-pin-input-button>0</tgui-pin-input-button>
      </div>
    `
  })
}; 