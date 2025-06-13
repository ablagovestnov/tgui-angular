import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { TabsListComponent, TabsItemComponent } from '../index';

@Component({
  selector: 'tgui-tabs-list-demo',
  standalone: true,
  imports: [TabsListComponent, TabsItemComponent],
  template: `
    <div style="width: 100%; max-width: 600px; margin: 0 auto;">
      <h3>Regular tabs</h3>
      <tgui-tabs-list [selectedIndex]="selectedIndex" (selectedIndexChange)="onTabChange($event)">
        <tgui-tabs-item>All</tgui-tabs-item>
        <tgui-tabs-item>Unread</tgui-tabs-item>
        <tgui-tabs-item>Important</tgui-tabs-item>
      </tgui-tabs-list>
      
      <h3 style="margin-top: 2rem;">Many tabs</h3>
      <tgui-tabs-list [selectedIndex]="0">
        <tgui-tabs-item>First</tgui-tabs-item>
        <tgui-tabs-item>Second</tgui-tabs-item>
        <tgui-tabs-item>Third</tgui-tabs-item>
        <tgui-tabs-item>Fourth</tgui-tabs-item>
        <tgui-tabs-item>Fifth</tgui-tabs-item>
      </tgui-tabs-list>
      
      <h3 style="margin-top: 2rem;">Long names (with ellipsis)</h3>
      <div style="resize: both; overflow: auto; border: 1px dashed #ccc; padding: 10px; min-width: 200px;">
        <tgui-tabs-list [selectedIndex]="0">
          <tgui-tabs-item>Very long tab name</tgui-tabs-item>
          <tgui-tabs-item>Another long name</tgui-tabs-item>
          <tgui-tabs-item>And third long tab name</tgui-tabs-item>
        </tgui-tabs-list>
        <div style="font-size: 12px; margin-top: 8px; color: #666;">
          ⟲ This container can be resized to see ellipsis
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