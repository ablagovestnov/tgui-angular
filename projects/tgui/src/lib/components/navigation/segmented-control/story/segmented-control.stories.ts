import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component, signal } from '@angular/core';
import { SegmentedControlComponent, SegmentedControlItemComponent } from '../index';
import { CommonModule } from '@angular/common';

interface SegmentedOption {
  label: string;
  value: string;
}

@Component({
  selector: 'tgui-segmented-control-demo',
  standalone: true,
  imports: [SegmentedControlComponent, SegmentedControlItemComponent, CommonModule],
  template: `
    <div style="width: 100%; max-width: 600px; margin: 0 auto;">
      <h3>Базовый пример</h3>
      <div style="padding: 20px;">
        <tgui-segmented-control 
          [selectedIndex]="selectedIndex()" 
          (selectedIndexChange)="onSelectionChange($event)"
        >
          <tgui-segmented-control-item *ngFor="let option of options; let i = index">
            {{ option.label }}
          </tgui-segmented-control-item>
        </tgui-segmented-control>
        <p style="margin-top: 20px;">
          Выбранный элемент: <strong>{{ options[selectedIndex()].label }} ({{ options[selectedIndex()].value }})</strong>
        </p>
      </div>

      <h3 style="margin-top: 2rem;">Несколько вариантов</h3>
      <div style="resize: both; overflow: auto; border: 1px dashed #ccc; padding: 20px; min-width: 200px;">
        <tgui-segmented-control [selectedIndex]="0">
          <tgui-segmented-control-item>Опция 1</tgui-segmented-control-item>
          <tgui-segmented-control-item>Опция 2</tgui-segmented-control-item>
          <tgui-segmented-control-item>Опция 3</tgui-segmented-control-item>
          <tgui-segmented-control-item>Опция 4</tgui-segmented-control-item>
        </tgui-segmented-control>
        <div style="font-size: 12px; margin-top: 8px; color: #666;">
          ⟲ Этот контейнер можно растягивать, чтобы увидеть адаптивность компонента
        </div>
      </div>

      <h3 style="margin-top: 2rem;">Длинные названия</h3>
      <div style="padding: 20px;">
        <tgui-segmented-control [selectedIndex]="1">
          <tgui-segmented-control-item>Очень длинный текст опции</tgui-segmented-control-item>
          <tgui-segmented-control-item>Еще один длинный вариант</tgui-segmented-control-item>
          <tgui-segmented-control-item>Третий длинный вариант</tgui-segmented-control-item>
        </tgui-segmented-control>
      </div>
    </div>
  `
})
class SegmentedControlDemoComponent {
  options: SegmentedOption[] = [
    { label: 'Label', value: 'label' },
    { label: 'Label 2', value: 'label2' },
    { label: 'Label 3', value: 'label3' }
  ];
  
  // Используем сигнал для реактивного отслеживания выбранного индекса
  selectedIndex = signal<number>(0);
  
  onSelectionChange(index: number): void {
    this.selectedIndex.set(index);
    console.log(`Selected option: ${this.options[index].label} (${this.options[index].value})`);
  }
}

export default {
  title: 'Navigation/SegmentedControl',
  component: SegmentedControlDemoComponent,
  decorators: [
    moduleMetadata({
      imports: [SegmentedControlComponent, SegmentedControlItemComponent, CommonModule]
    })
  ],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    selectedIndex: {
      control: { type: 'number' },
      description: 'Index of the selected option',
    }
  }
} as Meta<SegmentedControlDemoComponent>;

type Story = StoryObj<SegmentedControlDemoComponent>;

export const Default: Story = {};

export const SecondOptionSelected: Story = {
  render: () => ({
    component: SegmentedControlDemoComponent,
    props: {
      selectedIndex: signal(1)
    }
  })
}; 