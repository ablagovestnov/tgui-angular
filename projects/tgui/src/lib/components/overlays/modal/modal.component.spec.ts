import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalCloseComponent } from './modal-close.component';
import { ModalOverlayComponent } from './modal-overlay.component';
import { PlatformService } from '../../../services/platform.service';
import { ThemeService } from '../../../services/theme.service';
import { PortalService } from '../../../services/portal.service';
import { TouchComponent } from '../../utils/touch/touch.component';
import { RootRendererComponent } from '../../utils/root-renderer/root-renderer.component';

@Component({
  template: `
    <tgui-modal 
      [open]="isOpen"
      [header]="headerTemplate"
      (openChange)="onOpenChange($event)"
    >
      <p>Modal content</p>
    </tgui-modal>
    
    <ng-template #headerTemplate>
      <tgui-modal-header>Test Header</tgui-modal-header>
    </ng-template>
  `
})
class TestHostComponent {
  isOpen = false;
  @ViewChild('headerTemplate') headerTemplate!: TemplateRef<any>;
  
  onOpenChange(open: boolean) {
    this.isOpen = open;
  }
}

describe('ModalComponent', () => {
  let component: ModalComponent;
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let platformServiceMock: jasmine.SpyObj<PlatformService>;
  let themeServiceMock: jasmine.SpyObj<ThemeService>;
  let portalServiceMock: jasmine.SpyObj<PortalService>;

  beforeEach(async () => {
    platformServiceMock = jasmine.createSpyObj('PlatformService', ['platform']);
    platformServiceMock.platform.and.returnValue('base');
    
    themeServiceMock = jasmine.createSpyObj('ThemeService', ['appearance']);
    themeServiceMock.appearance.and.returnValue('light');
    
    portalServiceMock = jasmine.createSpyObj('PortalService', ['createPortal']);

    await TestBed.configureTestingModule({
      imports: [
        ModalComponent,
        ModalHeaderComponent,
        ModalCloseComponent,
        ModalOverlayComponent,
        TouchComponent,
        RootRendererComponent,
        TestHostComponent
      ],
      providers: [
        { provide: PlatformService, useValue: platformServiceMock },
        { provide: ThemeService, useValue: themeServiceMock },
        { provide: PortalService, useValue: portalServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(hostComponent).toBeTruthy();
  });

  it('should not be open by default', () => {
    expect(component.isOpen()).toBe(false);
  });

  it('should open when open input is set to true', () => {
    hostComponent.isOpen = true;
    fixture.detectChanges();
    
    // Need to wait for the effect to trigger
    setTimeout(() => {
      expect(component.isOpen()).toBe(true);
    }, 20);
  });

  it('should emit openChange when modal is opened', () => {
    spyOn(hostComponent, 'onOpenChange');
    
    component.openModal();
    
    expect(hostComponent.onOpenChange).toHaveBeenCalledWith(true);
  });

  it('should emit openChange when modal is closed', () => {
    spyOn(hostComponent, 'onOpenChange');
    
    component.openModal();
    component.closeModal();
    
    expect(hostComponent.onOpenChange).toHaveBeenCalledWith(false);
  });

  it('should close modal on Escape key when dismissible', () => {
    component.openModal();
    fixture.detectChanges();
    
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    
    expect(component.isOpen()).toBe(false);
  });

  it('should not close modal on Escape key when not dismissible', () => {
    // Set dismissible to false through input
    fixture.componentRef.setInput('dismissible', false);
    component.openModal();
    fixture.detectChanges();
    
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    
    expect(component.isOpen()).toBe(true);
  });

  it('should have correct CSS classes when open', () => {
    component.openModal();
    fixture.detectChanges();
    
    const contentClasses = component.contentClasses();
    expect(contentClasses['modal-content']).toBe(true);
  });

  it('should have correct overlay styles based on theme', () => {
    const overlayStyles = component.overlayStyles();
    expect(overlayStyles.background).toContain('rgba');
  });
}); 