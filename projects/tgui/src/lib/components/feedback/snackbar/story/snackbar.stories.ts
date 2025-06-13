import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from '../snackbar.component';
import { SnackbarButtonComponent } from '../components/snackbar-button/snackbar-button.component';
import { RootPortalComponent } from '../../../utils/portal/root-portal.component';
import { TappableComponent } from '../../../utils/tappable/tappable.component';
import { RootComponent } from '../../../utils/tgui-root/tgui-root.component';
import { ButtonComponent } from '../../../blocks/button/button.component';
import { PlatformService } from '../../../../services';

// Component for interactive demonstration
@Component({
  selector: 'demo-snackbar',
  standalone: true,
  imports: [CommonModule, SnackbarComponent, SnackbarButtonComponent, ButtonComponent, RootComponent],
  template: `
        <tgui-button (click)="showDeleteSnackbar()">Show notification</tgui-button>
        
        <tgui-snackbar 
          *ngIf="isDeleteSnackbarShown"
          [description]="description"
          [duration]="duration" 
          [onClose]="closeDeleteSnackbar">
          {{ mainMessage }}
          <ng-template #before>
            <div style="width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
              <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M18.59,14l6.7-6.7c0.39-0.39,0.39-1.02,0-1.42l-2.17-2.17c-0.39-0.39-1.02-0.39-1.42,0L14,10.41l-6.7-6.7  c-0.39-0.39-1.02-0.39-1.42,0L3.71,5.88c-0.39,0.39-0.39,1.02,0,1.42L10.41,14l-6.7,6.7c-0.39,0.39-0.39,1.02,0,1.42l2.17,2.17  c0.39,0.39,1.02,0.39,1.42,0l6.7-6.7l6.7,6.7c0.39,0.39,1.02,0.39,1.42,0l2.17-2.17c0.39-0.39,0.39-1.02,0-1.42L18.59,14z"/>
              </svg>
            </div>
          </ng-template>
          <ng-template #after>
            <tgui-snackbar-button (click)="showUndoSnackbar()">
              Undo
            </tgui-snackbar-button>
          </ng-template>
        </tgui-snackbar>
        
        <tgui-snackbar 
          *ngIf="isUndoSnackbarShown"
          [description]="'Message returned to list'"
          [duration]="duration" 
          [onClose]="closeUndoSnackbar">
          Message restored
          <ng-template #before>
            <div style="width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
              <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M14,2C7.37,2,2,7.37,2,14s5.37,12,12,12s12-5.37,12-12S20.63,2,14,2z M10.5,16.87l-4.13-4.13l1.4-1.4l2.73,2.73 l7.23-7.23l1.4,1.4L10.5,16.87z"/>
              </svg>
            </div>
          </ng-template>
          <ng-template #link>
            <a href="https://telegram.org" target="_blank" style="color: inherit; text-decoration: underline;">Open</a>
          </ng-template>
        </tgui-snackbar>
  `
})
class DemoSnackbarComponent {
  isDeleteSnackbarShown = false;
  isUndoSnackbarShown = false;
  
  mainMessage = 'Message deleted';
  description = 'Restore message within 4 seconds';
  duration = 4000;
  
  showDeleteSnackbar() {
    this.isDeleteSnackbarShown = true;
  }
  
  closeDeleteSnackbar = () => {
    this.isDeleteSnackbarShown = false;
  }
  
  showUndoSnackbar() {
    this.isDeleteSnackbarShown = false;
    this.isUndoSnackbarShown = true;
  }
  
  closeUndoSnackbar = () => {
    this.isUndoSnackbarShown = false;
  }
}

const meta: Meta<SnackbarComponent> = {
  title: 'Feedback/Snackbar',
  component: SnackbarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        SnackbarComponent,
        SnackbarButtonComponent,
        RootPortalComponent,
        TappableComponent,
        RootComponent,
        ButtonComponent,
        DemoSnackbarComponent
      ],
      providers: [PlatformService]
    })
  ],
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    description: {
      control: 'text',
      description: 'Additional text description shown below the main message'
    },
    duration: {
      control: {
        type: 'number',
        min: 1000,
        max: 10000,
        step: 1000
      },
      description: 'Duration in milliseconds before the snackbar is automatically closed'
    },
    beforeTemplate: { control: false },
    afterTemplate: { control: false },
    linkTemplate: { control: false },
    onClose: { control: false }
  }
};

export default meta;
type Story = StoryObj<SnackbarComponent>;

export const Playground: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true }
  },
  render: () => ({
    template: `<demo-snackbar></demo-snackbar>`
  })
};
