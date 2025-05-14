import { Meta, StoryObj } from '@storybook/angular';
import { TabbarComponent } from '../tabbar.component';
import { TabbarItemComponent } from '../tabbar-item.component';
import { moduleMetadata } from '@storybook/angular';
import { TguiIcon28Devices, TguiIcon28Chat, TguiIcon28Stats } from '@tgui/lib/icons';

const meta: Meta<TabbarComponent> = {
  title: 'Layout/Tabbar',
  component: TabbarComponent,
  decorators: [
    moduleMetadata({
      imports: [TabbarComponent, TabbarItemComponent, TguiIcon28Devices, TguiIcon28Chat, TguiIcon28Stats],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    selectedIndex: { 
      control: { type: 'number', min: 0, max: 2, step: 1 },
      description: 'Index of the currently selected tab',
      defaultValue: 0
    }
  }
};

export default meta;
type Story = StoryObj<TabbarComponent>;

export const Basic: Story = {
  args: {
    selectedIndex: 0
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 500px; position: relative;">
        <p style="padding: 20px;">Выбран таб с индексом: {{ selectedIndex }}</p>
        <tgui-tabbar [selectedIndex]="selectedIndex" (selectedIndexChange)="selectedIndex = $event">
          
         <tgui-tabbar-item text="Devices">
            <tgui-icon28-devices></tgui-icon28-devices>
          </tgui-tabbar-item>

          <tgui-tabbar-item text="Chat">
            <tgui-icon28-chat></tgui-icon28-chat>
          </tgui-tabbar-item>

          <tgui-tabbar-item text="Stats">
             <tgui-icon28-stats></tgui-icon28-stats>
          </tgui-tabbar-item>

        </tgui-tabbar>
      </div>
    `,
  }),
};

export const IOSStyle: Story = {
  args: {
    selectedIndex: 1
  },
  parameters: {
    platform: 'ios',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 500px; position: relative;">
        <p style="padding: 20px;">Выбран таб с индексом: {{ selectedIndex }}</p>
        <tgui-tabbar [selectedIndex]="selectedIndex" (selectedIndexChange)="selectedIndex = $event">
          
          <tgui-tabbar-item text="Devices">
            <tgui-icon28-devices></tgui-icon28-devices>
          </tgui-tabbar-item>

          <tgui-tabbar-item text="Chat">
            <tgui-icon28-chat></tgui-icon28-chat>
          </tgui-tabbar-item>

          <tgui-tabbar-item text="Stats">
             <tgui-icon28-stats></tgui-icon28-stats>
          </tgui-tabbar-item>
          
        </tgui-tabbar>
      </div>
    `,
  }),
};
