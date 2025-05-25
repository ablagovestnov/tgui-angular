import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { TabsListComponent, TabsItemComponent } from '../index';
import { 
  CardComponent,
  ButtonComponent,
  AvatarComponent,
  IconButtonComponent
} from '../../../blocks';
import { AvatarBadgeComponent } from '../../../blocks/avatar/components/avatar-badge/avatar-badge.component';
import { ButtonCellComponent } from '../../../blocks/cell/components/button-cell/button-cell.component';
import { SectionComponent } from '../../../blocks/section/section.component';
import { ContentSlotDirective } from '../../../../directives/content-slot.directive';
import { TguiIcon28Edit } from '../../../../icons/icon28/tgui-icon28-edit';
import { TguiIcon28AddCircle } from '../../../../icons/icon28/tgui-icon28-add-circle';
import { TextComponent } from '../../../typography/text/text.component';
import { TitleComponent } from '../../../typography/title/title.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tgui-tabs-list-content-demo',
  standalone: true,
  imports: [
    TabsListComponent, 
    TabsItemComponent,
    CardComponent,
    ButtonComponent,
    AvatarComponent,
    TextComponent,
    TitleComponent,
    IconButtonComponent,
    AvatarBadgeComponent,
    ButtonCellComponent,
    SectionComponent,
    ContentSlotDirective,
    TguiIcon28Edit,
    TguiIcon28AddCircle,
    CommonModule,
  ],
  template: `
    <div style="width: 100%; max-width: 400px; margin: 0 auto;">
      <tgui-tabs-list [selectedIndex]="activeTab" (selectedIndexChange)="setActiveTab($event)">
        <tgui-tabs-item>Чаты</tgui-tabs-item>
        <tgui-tabs-item>Контакты</tgui-tabs-item>
        <tgui-tabs-item>Настройки</tgui-tabs-item>
      </tgui-tabs-list>
      
      <!-- Контент для таба "Чаты" -->
      <div *ngIf="activeTab === 0" style="padding: 16px 0;">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div *ngFor="let chat of chats" style="display: flex; align-items: center; gap: 12px; position: relative; padding: 16px; background-color: var(--tgui--secondary_bg_color); border-radius: 12px;">
            <tgui-avatar 
              [src]="chat.avatar" 
              [initials]="chat.initials"
              [color]="chat.color"
              size="m"
            ></tgui-avatar>
            <div>
              <div style="font-weight: 600; margin-bottom: 4px;">{{ chat.name }}</div>
              <div style="color: var(--tgui--hint_color); font-size: 14px;">
                {{ chat.lastMessage }}
              </div>
            </div>
            <div style="margin-left: auto; display: flex; flex-direction: column; align-items: flex-end;">
              <div style="color: var(--tgui--secondary_hint_color); font-size: 14px; margin-bottom: 4px;">
                {{ chat.time }}
              </div>
              <tgui-avatar-badge *ngIf="chat.unread > 0" [count]="chat.unread"></tgui-avatar-badge>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Контент для таба "Контакты" -->
      <div *ngIf="activeTab === 1" style="padding: 16px 0;">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div *ngFor="let contact of contacts" style="display: flex; align-items: center; gap: 12px; position: relative; padding: 16px; background-color: var(--tgui--secondary_bg_color); border-radius: 12px;">
            <tgui-avatar 
              [src]="contact.avatar" 
              [initials]="contact.initials"
              [color]="contact.color"
              size="m"
              [online]="contact.status === 'Онлайн' ? 'true' : 'false'"
            ></tgui-avatar>
            <div>
              <div style="font-weight: 600; margin-bottom: 4px;">{{ contact.name }}</div>
              <div style="color: var(--tgui--hint_color); font-size: 14px;">
                {{ contact.status }}
              </div>
            </div>
            <div style="margin-left: auto;">
              <tgui-icon-button mode="plain">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="currentColor"/>
                </svg>
              </tgui-icon-button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Контент для таба "Настройки" -->
      <div *ngIf="activeTab === 2" style="padding: 16px 0;">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 16px; position: relative; padding: 16px; background-color: var(--tgui--secondary_bg_color); border-radius: 12px;">
            <tgui-avatar 
              src="https://randomuser.me/api/portraits/men/32.jpg"
              size="l"
              online="true"
            ></tgui-avatar>
            <div>
              <div style="font-weight: 600; margin-bottom: 4px;">Пользователь Telegram</div>
              <div style="color: var(--tgui--hint_color); font-size: 14px;">
                {{ '@username' }}
              </div>
            </div>
          </div>
          
          <div style="background: var(--tgui--secondary_bg_color); padding: 10px; border-radius: 12px;">
            <tgui-section [header]="'Профиль'">
              <tgui-button-cell>
                <tgui-icon28-edit content-slot="before"></tgui-icon28-edit>
                Редактировать профиль
              </tgui-button-cell>
              <tgui-button-cell>
                <tgui-icon28-add-circle content-slot="before"></tgui-icon28-add-circle>
                Изменить фото
              </tgui-button-cell>
            </tgui-section>
          </div>
          
          <div style="background: var(--tgui--secondary_bg_color); padding: 10px; border-radius: 12px;">
            <tgui-section [header]="'Настройки приватности'">
              <tgui-button-cell>
                <tgui-icon28-edit content-slot="before"></tgui-icon28-edit>
                Блокировка экрана
              </tgui-button-cell>
              <tgui-button-cell>
                <tgui-icon28-edit content-slot="before"></tgui-icon28-edit>
                Видимость статуса
              </tgui-button-cell>
              <tgui-button-cell [mode]="'destructive'">
                <tgui-icon28-add-circle content-slot="before"></tgui-icon28-add-circle>
                Двухфакторная аутентификация
              </tgui-button-cell>
            </tgui-section>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
class TabsListWithContentDemoComponent {
  activeTab = 0;
  
  chats = [
    { 
      name: 'John Doe', 
      lastMessage: 'Hey, how are you doing?', 
      time: '12:30', 
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      initials: 'JD',
      color: '#3949ab',
      unread: 3
    },
    { 
      name: 'Anna Smith', 
      lastMessage: 'Meeting tomorrow at 10:00', 
      time: '11:45', 
      avatar: '',
      initials: 'Anna Smith',
      color: '#8e24aa',
      unread: 1
    },
    { 
      name: 'Work Group', 
      lastMessage: 'Alex: I sent you the documents', 
      time: 'Yesterday', 
      avatar: '',
      initials: 'WG',
      color: '#e91e63',
      unread: 10
    },
    { 
      name: 'Support Team', 
      lastMessage: 'Your request has been processed', 
      time: 'Jun 23', 
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      initials: 'ST',
      color: '#00897b',
      unread: 0
    }
  ];
  
  contacts = [
    { 
      name: 'Alex Johnson', 
      status: 'Онлайн', 
      avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
      initials: 'AJ',
      color: 'blue'
    },
    { 
      name: 'Catherine Wilson', 
      status: 'Была в сети 5 минут назад', 
      avatar: '',
      initials: 'Catherine Wilson',
      color: '#8e24aa'
    },
    { 
      name: 'David Miller', 
      status: 'Был в сети вчера', 
      avatar: 'https://randomuser.me/api/portraits/men/64.jpg',
      initials: 'DM',
      color: 'orange'
    },
    { 
      name: 'Sarah Parker', 
      status: 'Печатает...', 
      avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
      initials: 'SP',
      color: 'purple'
    }
  ];
  
  setActiveTab(index: number): void {
    this.activeTab = index;
  }
}

export default {
  title: 'Navigation/TabsList/WithContent',
  component: TabsListWithContentDemoComponent,
  decorators: [
    moduleMetadata({
      imports: [
        TabsListComponent, 
        TabsItemComponent,
        CardComponent,
        ButtonComponent,
        AvatarComponent,
        TextComponent,
        TitleComponent,
        IconButtonComponent,
        AvatarBadgeComponent,
        ButtonCellComponent,
        SectionComponent,
        ContentSlotDirective,
        TguiIcon28Edit,
        TguiIcon28AddCircle,
        CommonModule
      ]
    })
  ],
  parameters: {
    layout: 'padded',
  }
} as Meta<TabsListWithContentDemoComponent>;

type Story = StoryObj<TabsListWithContentDemoComponent>;

export const TabsWithContent: Story = {}; 