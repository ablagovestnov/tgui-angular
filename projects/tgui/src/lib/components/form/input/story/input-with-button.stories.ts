import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../input.component';
import { FormInputComponent } from '../../form-input/form-input.component';
import { ButtonComponent } from '../../../blocks/button/button.component';
import { SubheadlineComponent, TextComponent, CaptionComponent } from '../../../typography';
import { ListComponent } from '../../../blocks/list/list.component';
import { TappableComponent } from '../../../utils';
import { SnackbarService } from '../../../feedback/snackbar/snackbar.service';
import { TguiIcon16Cancel } from '../../../../icons/icon16/tgui-icon16-cancel';
import { SnackbarComponent, SnackbarButtonComponent } from '../../../feedback/snackbar';
import { RootPortalComponent } from '../../../utils/portal/root-portal.component';
import { RootComponent } from '../../../utils/tgui-root/tgui-root.component';
import { PlatformService } from '../../../../services/platform.service';
import { PortalService } from '../../../../services/portal.service';

// Component for testing snackbar only
@Component({
  selector: 'test-snackbar',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    SnackbarComponent,
    RootPortalComponent,
    RootComponent
  ],
  template: `
      <div style="padding: 20px; text-align: center;">
        <tgui-button (click)="showSnackbar()">Show Test Snackbar</tgui-button>
      </div>
  `
})
class TestSnackbarComponent {
  private snackbarService = inject(SnackbarService);
  private portalService = inject(PortalService);
  
  ngOnInit(): void {
    // Check portal status
    console.log('Portal ready:', this.portalService.isPortalReady());
    console.log('Portal container:', this.portalService.getPortalContainerElement());
    
    // Automatically show snackbar after initialization
    setTimeout(() => {
      // Check portal status before showing snackbar
      console.log('Portal ready (after timeout):', this.portalService.isPortalReady());
      console.log('Portal container (after timeout):', this.portalService.getPortalContainerElement());
      this.showSnackbar();
    }, 1000);
  }
  
  showSnackbar(): void {
    console.log('Test showSnackbar called');
    try {
      this.snackbarService.show('Test snackbar message', {
        duration: 5000,
      });
      console.log('Test snackbar.show() executed successfully');
    } catch (error) {
      console.error('Error showing test snackbar:', error);
    }
  }
}

// Demo component that shows the input with button and snackbar interaction
@Component({
  selector: 'demo-input-with-button',
  standalone: true,
  imports: [
    CommonModule, 
    InputComponent, 
    ButtonComponent, 
    ListComponent, 
    FormInputComponent,
    SubheadlineComponent,
    TextComponent,
    TappableComponent,
    TguiIcon16Cancel,
    SnackbarComponent,
    RootPortalComponent,
    RootComponent
  ],
  template: `
    <tgui-list style="width: 400px; max-width: 100%; margin: auto; background: var(--tgui--secondary_bg_color); padding: 16px;">
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <ng-template #clearButtonTemplate>
          <tgui-tappable 
            style="display: flex"
            (click)="clearInput()"
            *ngIf="inputValue"
          >
            <tgui-icon16-cancel></tgui-icon16-cancel>
          </tgui-tappable>
        </ng-template>

        <tgui-input
          header="Your message"
          placeholder="Type a message..."
          [value]="inputValue"
          [after]="clearButtonTemplate"
          (input)="onInput($event)"
        ></tgui-input>
        
        <tgui-button 
          [disabled]="!inputValue" 
          (click)="showSnackbar()"
        >
          Send
        </tgui-button>
      </div>
    </tgui-list>
  `
})
class DemoInputWithButtonComponent {
  private snackbarService = inject(SnackbarService);
  inputValue = '';
  
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.inputValue = input.value;
  }
  
  clearInput(): void {
    this.inputValue = '';
  }
  
  showSnackbar(): void {
    console.log('showSnackbar');
    if (this.inputValue) {
      try {
        this.snackbarService.show(`Message sent: "${this.inputValue}"`, {
          duration: 3000,
        });
        console.log('snackbar.show() executed successfully');
        this.inputValue = '';
      } catch (error) {
        console.error('Error showing snackbar:', error);
      }
    }
  }
}

@Component({
  selector: 'direct-snackbar',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    SnackbarComponent,
    RootPortalComponent,
    RootComponent,
    CaptionComponent
  ],
  template: `
    <div style="padding: 20px; text-align: center;">
      <tgui-button (click)="toggleSnackbar()">Toggle Direct Snackbar</tgui-button>
      
      <tgui-snackbar 
        *ngIf="showSnackbarFlag"
        [description]="'This is a description'"
        [duration]="5000" 
        [onClose]="closeSnackbar">
        Direct Snackbar Message
      </tgui-snackbar>
    </div>
  `
})
class DirectSnackbarComponent {
  showSnackbarFlag = false;
  
  ngOnInit(): void {
    // Automatically show snackbar after initialization
    setTimeout(() => {
      this.toggleSnackbar();
    }, 1000);
  }
  
  toggleSnackbar(): void {
    this.showSnackbarFlag = !this.showSnackbarFlag;
    console.log('Toggled direct snackbar:', this.showSnackbarFlag);
  }
  
  closeSnackbar = () => {
    console.log('Direct snackbar closing');
    this.showSnackbarFlag = false;
  }
}

const meta: Meta<DemoInputWithButtonComponent> = {
  title: 'Form/InputWithButton',
  component: DemoInputWithButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        InputComponent,
        ButtonComponent,
        ListComponent,
        FormInputComponent,
        SubheadlineComponent,
        TextComponent,
        TappableComponent,
        TguiIcon16Cancel,
        SnackbarComponent,
        SnackbarButtonComponent,
        RootPortalComponent,
        RootComponent,
        CaptionComponent,
        TestSnackbarComponent,
        DirectSnackbarComponent
      ],
      providers: [SnackbarService, PlatformService, PortalService]
    })
  ],
  parameters: {
    layout: 'fullscreen',
  }
};

export default meta;
type Story = StoryObj<DemoInputWithButtonComponent>;

export const Default: Story = {
  render: () => ({
    template: `<demo-input-with-button></demo-input-with-button>`
  })
};

export const TestSnackbar: Story = {
  render: () => ({
    template: `<test-snackbar></test-snackbar>`
  })
};

export const DirectSnackbarExample: Story = {
  render: () => ({
    template: `<direct-snackbar></direct-snackbar>`
  })
}; 