import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../input.component';
import { TappableComponent } from '../../../utils';
import { TguiDynamicIconComponent } from '../../../../icons';
import { ListComponent } from '../../../blocks/list/list.component';
import { FormsModule } from '@angular/forms';
import { TguiIcon24Close } from '../../../../icons/icon24/tgui-icon24-close';
import { TguiIcon16Cancel } from '../../../../icons/icon16/tgui-icon16-cancel';

const meta: Meta<InputComponent> = {
  title: 'Form/Input',
  component: InputComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, TappableComponent, TguiDynamicIconComponent, ListComponent, FormsModule, TguiIcon24Close, TguiIcon16Cancel]
    })
  ],
  parameters: {
    layout: 'fullscreen',
  }
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Playground: Story = {
  render: () => {
    const value = signal('');
    let inputElement: HTMLInputElement | null = null;
    
    const onInput = (event: Event) => {
      const input = event.target as HTMLInputElement;
      inputElement = input;
      value.set(input.value);
    };
    
    const clearInput = () => {
      console.log('clearInput');
      value.set('');
      console.log(value());
      
      // Update the input element value directly
      if (inputElement) {
        inputElement.value = '';
        // Generate input event to notify Angular about the change
        inputElement.dispatchEvent(new Event('input', { bubbles: true }));
      }
    };
    
    return {
      props: {
        value,
        onInput,
        clearInput
      },
      template: `
        <tgui-list style="width: 400px; max-width: 100%; margin: auto; background: var(--tgui--secondary_bg_color);">
          <tgui-input
            header="Input"
            placeholder="I am usual input, just leave me alone"
          ></tgui-input>
          
          <tgui-input
            status="error"
            header="Input"
            placeholder="I am error input, don't make my mistakes..."
          ></tgui-input>
          
          <tgui-input
            status="focused"
            header="Input"
            placeholder="I am focused input, are u focused on me?"
          ></tgui-input>
          
          <tgui-input
            [disabled]="true"
            header="Input"
            placeholder="I am disabled input"
          ></tgui-input>
          
          <ng-template #clearButtonTemplate>
            <tgui-tappable 
              style="display: flex"
              (click)="clearInput()"
            >
              <tgui-icon16-cancel></tgui-icon16-cancel>
            </tgui-tappable>
          </ng-template>
          
          <tgui-input
            status="focused"
            header="Input with clear button"
            placeholder="Write and clean me"
            [value]="value()"
            [after]="clearButtonTemplate"
            (input)="onInput($event)"
          ></tgui-input>
          
          <tgui-input
            header="Input with before content"
            placeholder="Input with icon before"
            [before]="'$'"
          ></tgui-input>
          
          <ng-template #searchIcon>
            <div style="display: flex; padding: 0 16px;">
              <tgui-dynamic-icon icon="search-24"></tgui-dynamic-icon>
            </div>
          </ng-template>
          
          <tgui-input
            header="Input with before template"
            placeholder="Search something..."
            [before]="searchIcon"
          ></tgui-input>
        </tgui-list>
      `
    };
  }
}; 