import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { TabsListComponent, TabsItemComponent } from '../index';

@Component({
  selector: 'tgui-tabs-list-demo',
  standalone: true,
  imports: [TabsListComponent, TabsItemComponent],
  template: `
    <div style="width: 100%; max-width: 600px; margin: 0 auto;">
      <h3>Обычные табы</h3>
      <tgui-tabs-list [selectedIndex]="selectedIndex" (selectedIndexChange)="onTabChange($event)">
        <tgui-tabs-item>Все</tgui-tabs-item>
        <tgui-tabs-item>Непрочитанные</tgui-tabs-item>
        <tgui-tabs-item>Важные</tgui-tabs-item>
      </tgui-tabs-list>
      
      <h3 style="margin-top: 2rem;">Много табов</h3>
      <tgui-tabs-list [selectedIndex]="0">
        <tgui-tabs-item>Первый</tgui-tabs-item>
        <tgui-tabs-item>Второй</tgui-tabs-item>
        <tgui-tabs-item>Третий</tgui-tabs-item>
        <tgui-tabs-item>Четвертый</tgui-tabs-item>
        <tgui-tabs-item>Пятый</tgui-tabs-item>
      </tgui-tabs-list>
      
      <h3 style="margin-top: 2rem;">Длинные названия (с троеточиями)</h3>
      <div style="resize: both; overflow: auto; border: 1px dashed #ccc; padding: 10px; min-width: 200px;">
        <tgui-tabs-list [selectedIndex]="0">
          <tgui-tabs-item>Очень длинное название таба</tgui-tabs-item>
          <tgui-tabs-item>Еще одно длинное название</tgui-tabs-item>
          <tgui-tabs-item>И третье длинное название таба</tgui-tabs-item>
        </tgui-tabs-list>
        <div style="font-size: 12px; margin-top: 8px; color: #666;">
          ⟲ Этот контейнер можно растягивать, чтобы увидеть троеточия
        </div>
      </div>
    </div>
  `
})
class TabsListDemoComponent {
  selectedIndex = 0;
  
  onTabChange(index: number): void {
    this.selectedIndex = index;
    console.log(`Selected tab: ${index}`);
  }
}

export default {
  title: 'Navigation/TabsList',
  component: TabsListDemoComponent,
  decorators: [
    moduleMetadata({
      imports: [TabsListComponent, TabsItemComponent]
    })
  ],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    selectedIndex: {
      control: { type: 'number' },
      description: 'Index of the selected tab',
    }
  }
} as Meta<TabsListDemoComponent>;

type Story = StoryObj<TabsListDemoComponent>;

export const Default: Story = {
  args: {
    selectedIndex: 0
  }
};

export const SecondTabSelected: Story = {
  args: {
    selectedIndex: 1
  }
}; 