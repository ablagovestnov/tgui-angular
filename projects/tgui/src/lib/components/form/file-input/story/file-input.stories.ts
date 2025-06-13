import { CommonModule } from '@angular/common';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FileInputComponent } from '../file-input.component';
import { CellComponent } from '../../../blocks/cell/cell.component';
import { SectionComponent } from '../../../blocks/section/section.component';
import { ListComponent } from '../../../blocks/list/list.component';
import { signal } from '@angular/core';
import { TguiIcon28Attach } from '../../../../icons/icon28/tgui-icon28-attach';
const meta: Meta<FileInputComponent> = {
  title: 'Form/FileInput',
  component: FileInputComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FileInputComponent,
        CellComponent,
        SectionComponent,
        ListComponent,
        TguiIcon28Attach
      ],
    }),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Text label for the file input, used as the button label',
      defaultValue: 'Attach file'
    },
    accept: {
      control: 'text',
      description: 'File types that the input should accept',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple files can be selected',
      defaultValue: false
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
      defaultValue: false
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<FileInputComponent>;

/**
 * Example with multiple file selection and displaying the selected files.
 */
export const Basic: Story = {
  args: {
    label: 'Attach files',
    multiple: true,
  },
  render: (args) => {
    // Use signals for state management in the story
    const files = signal<File[]>([]);
    
    const handleFileChange = (event: Event) => {
      const fileList = (event.target as HTMLInputElement).files;
      if (fileList) {
        files.set(Array.from(fileList));
      }
    };
    
    return {
      props: {
        ...args,
        files,
        handleFileChange
      },
      template: `
        <tgui-list>
          <tgui-section
            header="Component includes only logic of input and label"
            footer="Listen to the onChange event to get the selected files. You can pass children to display the selected files."
          >
            <tgui-file-input 
              [label]="label" 
              [multiple]="multiple" 
              [disabled]="disabled"
              [beforeTemplate]="beforeTemplate"
              (change)="handleFileChange($event)"
            >
              <tgui-cell 
                *ngFor="let file of files()" 
                [title]="file.name"
                [subtitle]="file.size + ' bytes'"
              ></tgui-cell>
            </tgui-file-input>
          </tgui-section>
        </tgui-list>

        <ng-template #beforeTemplate>
          <tgui-icon28-attach></tgui-icon28-attach>
        </ng-template>
      `
    };
  }
};
