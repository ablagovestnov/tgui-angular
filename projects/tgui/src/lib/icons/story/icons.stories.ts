import { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';
import { CaptionComponent } from '../../components/typography/caption/caption.component';

// 12x12 icons
import { TguiIcon12Quote } from '../icon12/tgui-icon12-quote';

// 16x16 icons
import { TguiIcon16Cancel } from '../icon16/tgui-icon16-cancel';
import { TguiIcon16Chevron } from '../icon16/tgui-icon16-chevron';

// 20x20 icons
import { TguiIcon20ChevronDown } from '../icon20/tgui-icon20-chevron-down';
import { TguiIcon20Copy } from '../icon20/tgui-icon20-copy';
import { TguiIcon20QuestionMark } from '../icon20/tgui-icon20-question-mark';
import { TguiIcon20Select } from '../icon20/tgui-icon20-select';
import { TguiIcon20SelectIos } from '../icon20/tgui-icon20-select-ios';

// 24x24 icons
import { TguiIcon24Cancel } from '../icon24/tgui-icon24-cancel';
import { TguiIcon24Channel } from '../icon24/tgui-icon24-channel';
import { TguiIcon24Chat } from '../icon24/tgui-icon24-chat';
import { TguiIcon24ChevronDown } from '../icon24/tgui-icon24-chevron-down';
import { TguiIcon24ChevronLeft } from '../icon24/tgui-icon24-chevron-left';
import { TguiIcon24ChevronRight } from '../icon24/tgui-icon24-chevron-right';
import { TguiIcon24Close } from '../icon24/tgui-icon24-close';
import { TguiIcon24Notifications } from '../icon24/tgui-icon24-notifications';
import { TguiIcon24PersonRemove } from '../icon24/tgui-icon24-person-remove';
import { TguiIcon24QR } from '../icon24/tgui-icon24-qr';
import { TguiIcon24SunLow } from '../icon24/tgui-icon24-sun-low';

// 28x28 icons
import { TguiIcon28AddCircle } from '../icon28/tgui-icon28-add-circle';
import { TguiIcon28Archive } from '../icon28/tgui-icon28-archive';
import { TguiIcon28Attach } from '../icon28/tgui-icon28-attach';
import { TguiIcon28Chat } from '../icon28/tgui-icon28-chat';
import { TguiIcon28Close } from '../icon28/tgui-icon28-close';
import { TguiIcon28CloseAmbient } from '../icon28/tgui-icon28-close-ambient';
import { TguiIcon28Devices } from '../icon28/tgui-icon28-devices';
import { TguiIcon28Edit } from '../icon28/tgui-icon28-edit';
import { TguiIcon28Heart } from '../icon28/tgui-icon28-heart';
import { TguiIcon28Stats } from '../icon28/tgui-icon28-stats';

// 32x32 icons
import { TguiIcon32ProfileColoredSquare } from '../icon32/tgui-icon32-profile-colored-square';

// 36x36 icons
import { TguiIcon36Backspace } from '../icon36/tgui-icon36-backspace';

@Component({
  selector: 'tgui-icons-showcase',
  standalone: true,
  imports: [
    // Typography
    CaptionComponent,
    
    // 12x12 icons
    TguiIcon12Quote,
    
    // 16x16 icons
    TguiIcon16Cancel,
    TguiIcon16Chevron,
    
    // 20x20 icons
    TguiIcon20ChevronDown, 
    TguiIcon20Copy, 
    TguiIcon20QuestionMark, 
    TguiIcon20Select, 
    TguiIcon20SelectIos,
    
    // 24x24 icons
    TguiIcon24Cancel,
    TguiIcon24Channel,
    TguiIcon24Chat,
    TguiIcon24ChevronDown,
    TguiIcon24ChevronLeft,
    TguiIcon24ChevronRight,
    TguiIcon24Close,
    TguiIcon24Notifications,
    TguiIcon24PersonRemove,
    TguiIcon24QR,
    TguiIcon24SunLow,
    
    // 28x28 icons
    TguiIcon28AddCircle,
    TguiIcon28Archive,
    TguiIcon28Attach,
    TguiIcon28Chat,
    TguiIcon28Close,
    TguiIcon28CloseAmbient,
    TguiIcon28Devices,
    TguiIcon28Edit,
    TguiIcon28Heart,
    TguiIcon28Stats,
    
    // 32x32 icons
    TguiIcon32ProfileColoredSquare,
    
    // 36x36 icons
    TguiIcon36Backspace
  ],
  template: `
    <div style="display: flex; color: var(--tgui-link_color); flex-direction: column; gap: 24px; padding: 16px;">
      <!-- 12x12 Icons -->
      <div>
        <h2>12×12 Icons</h2>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <div class="icon-container">
            <tgui-icon12-quote></tgui-icon12-quote>
            <tgui-caption style="margin-top: 8px;">Quote</tgui-caption>
          </div>
        </div>
      </div>

      <!-- 16x16 Icons -->
      <div>
        <h2>16×16 Icons</h2>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <div class="icon-container">
            <tgui-icon16-cancel></tgui-icon16-cancel>
            <tgui-caption style="margin-top: 8px;">Cancel</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon16-chevron></tgui-icon16-chevron>
            <tgui-caption style="margin-top: 8px;">Chevron</tgui-caption>
          </div>
        </div>
      </div>

      <!-- 20x20 Icons -->
      <div>
        <h2>20×20 Icons</h2>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <div class="icon-container">
            <tgui-icon20-chevron-down></tgui-icon20-chevron-down>
            <tgui-caption style="margin-top: 8px;">ChevronDown</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon20-copy></tgui-icon20-copy>
            <tgui-caption style="margin-top: 8px;">Copy</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon20-question-mark></tgui-icon20-question-mark>
            <tgui-caption style="margin-top: 8px;">QuestionMark</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon20-select></tgui-icon20-select>
            <tgui-caption style="margin-top: 8px;">Select</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon20-select-ios></tgui-icon20-select-ios>
            <tgui-caption style="margin-top: 8px;">SelectIos</tgui-caption>
          </div>
        </div>
      </div>
      
      <!-- 24x24 Icons -->
      <div>
        <h2>24×24 Icons</h2>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <div class="icon-container">
            <tgui-icon24-cancel></tgui-icon24-cancel>
            <tgui-caption style="margin-top: 8px;">Cancel</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon24-channel></tgui-icon24-channel>
            <tgui-caption style="margin-top: 8px;">Channel</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon24-chat></tgui-icon24-chat>
            <tgui-caption style="margin-top: 8px;">Chat</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon24-chevron-down></tgui-icon24-chevron-down>
            <tgui-caption style="margin-top: 8px;">ChevronDown</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon24-chevron-left></tgui-icon24-chevron-left>
            <tgui-caption style="margin-top: 8px;">ChevronLeft</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon24-chevron-right></tgui-icon24-chevron-right>
            <tgui-caption style="margin-top: 8px;">ChevronRight</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon24-close></tgui-icon24-close>
            <tgui-caption style="margin-top: 8px;">Close</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon24-notifications></tgui-icon24-notifications>
            <tgui-caption style="margin-top: 8px;">Notifications</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon24-person-remove></tgui-icon24-person-remove>
            <tgui-caption style="margin-top: 8px;">PersonRemove</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon24-qr></tgui-icon24-qr>
            <tgui-caption style="margin-top: 8px;">QR</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon24-sun-low></tgui-icon24-sun-low>
            <tgui-caption style="margin-top: 8px;">SunLow</tgui-caption>
          </div>
        </div>
      </div>
      
      <!-- 28x28 Icons -->
      <div>
        <h2>28×28 Icons</h2>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <div class="icon-container">
            <tgui-icon28-add-circle></tgui-icon28-add-circle>
            <tgui-caption style="margin-top: 8px;">AddCircle</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon28-archive></tgui-icon28-archive>
            <tgui-caption style="margin-top: 8px;">Archive</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon28-attach></tgui-icon28-attach>
            <tgui-caption style="margin-top: 8px;">Attach</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon28-chat></tgui-icon28-chat>
            <tgui-caption style="margin-top: 8px;">Chat</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon28-close></tgui-icon28-close>
            <tgui-caption style="margin-top: 8px;">Close</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon28-close-ambient></tgui-icon28-close-ambient>
            <tgui-caption style="margin-top: 8px;">CloseAmbient</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon28-devices></tgui-icon28-devices>
            <tgui-caption style="margin-top: 8px;">Devices</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon28-edit></tgui-icon28-edit>
            <tgui-caption style="margin-top: 8px;">Edit</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon28-heart></tgui-icon28-heart>
            <tgui-caption style="margin-top: 8px;">Heart</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon28-stats></tgui-icon28-stats>
            <tgui-caption style="margin-top: 8px;">Stats</tgui-caption>
          </div>
        </div>
      </div>
      
      <!-- 32x32 Icons -->
      <div>
        <h2>32×32 Icons</h2>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <div class="icon-container">
            <tgui-icon32-profile-colored-square></tgui-icon32-profile-colored-square>
            <tgui-caption style="margin-top: 8px;">ProfileColoredSquare</tgui-caption>
          </div>
        </div>
      </div>
      
      <!-- 36x36 Icons -->
      <div>
        <h2>36×36 Icons</h2>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <div class="icon-container">
            <tgui-icon36-backspace></tgui-icon36-backspace>
            <tgui-caption style="margin-top: 8px;">Backspace</tgui-caption>
          </div>
        </div>
      </div>

      <!-- Custom Colors -->
      <div>
        <h2>Custom Colors</h2>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <div class="icon-container">
            <tgui-icon20-chevron-down style="color: #ff5722;"></tgui-icon20-chevron-down>
            <tgui-caption style="margin-top: 8px;">Orange</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon20-copy style="color: #4caf50;"></tgui-icon20-copy>
            <tgui-caption style="margin-top: 8px;">Green</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon20-question-mark style="color: #9c27b0;"></tgui-icon20-question-mark>
            <tgui-caption style="margin-top: 8px;">Purple</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon16-cancel style="color: #f44336;"></tgui-icon16-cancel>
            <tgui-caption style="margin-top: 8px;">Red</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon32-profile-colored-square></tgui-icon32-profile-colored-square>
            <tgui-caption style="margin-top: 8px;">Original colors</tgui-caption>
          </div>
        </div>
      </div>

      <!-- Different Sizes -->
      <div>
        <h2>Different Sizes</h2>
        <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
          <div class="icon-container">
            <tgui-icon20-chevron-down [props]="{ width: 16, height: 16 }"></tgui-icon20-chevron-down>
            <tgui-caption style="margin-top: 8px;">16px</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon20-chevron-down [props]="{ width: 24, height: 24 }"></tgui-icon20-chevron-down>
            <tgui-caption style="margin-top: 8px;">24px</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon20-chevron-down [props]="{ width: 32, height: 32 }"></tgui-icon20-chevron-down>
            <tgui-caption style="margin-top: 8px;">32px</tgui-caption>
          </div>
          <div class="icon-container">
            <tgui-icon36-backspace [props]="{ width: 48, height: 48 }"></tgui-icon36-backspace>
            <tgui-caption style="margin-top: 8px;">48px</tgui-caption>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      /* Temporary define variable for demo purposes */
      --tgui-link_color: #2196f3;
    }

    .icon-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px;
    }
  `]
})
class IconsShowcaseComponent {}

const meta: Meta<IconsShowcaseComponent> = {
  title: 'Icons/Overview',
  component: IconsShowcaseComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<IconsShowcaseComponent>;

export const Overview: Story = {
  args: {},
}; 