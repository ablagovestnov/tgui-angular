import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TGUIRootComponent } from './tgui-root.component';
import { PortalService } from '@services/portal.service';
import { ThemeService } from '@services/theme.service';
import { PlatformService } from '@services/platform.service';

@Component({
  selector: 'test-host',
  template: '<tgui-root></tgui-root>'
})
class TestHostComponent {}

describe('TGUIRootComponent', () => {
  let component: TGUIRootComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let portalService: PortalService;
  let themeService: ThemeService;
  let platformService: PlatformService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TGUIRootComponent],
      declarations: [TestHostComponent],
      providers: [
        PortalService,
        ThemeService,
        PlatformService
      ]
    }).compileComponents();

    portalService = TestBed.inject(PortalService);
    themeService = TestBed.inject(ThemeService);
    platformService = TestBed.inject(PlatformService);

    // Spy on service methods
    spyOn(portalService, 'setPortalContainer').and.callThrough();
    spyOn(portalService, 'clearPortalContainer').and.callThrough();
    spyOn(themeService, 'loadGlobalStyles').and.callThrough();
    spyOn(themeService, 'setupTheme').and.callThrough();

    hostFixture = TestBed.createComponent(TestHostComponent);
    const rootComponent = hostFixture.debugElement.children[0];
    component = rootComponent.componentInstance as TGUIRootComponent;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize theme service on init', () => {
    expect(themeService.loadGlobalStyles).toHaveBeenCalled();
    expect(themeService.setupTheme).toHaveBeenCalled();
  });

  it('should setup portal container after view init', fakeAsync(() => {
    hostFixture.detectChanges();
    tick(0); // Wait for setTimeout to complete
    
    expect(portalService.setPortalContainer).toHaveBeenCalled();
    
    // Verify portal container element exists
    expect(portalService.isPortalReady()).toBeTrue();
    
    const portalElement = portalService.getPortalContainerElement();
    expect(portalElement).toBeTruthy();
    expect(portalElement?.className).toContain('tgui-portal-container');
  }));

  it('should update theme when appearance input changes', () => {
    // Reset spy count
    (themeService.setupTheme as jasmine.Spy).calls.reset();
    
    // Change appearance input
    component.appearance = 'dark';
    component.ngOnChanges({
      appearance: {
        currentValue: 'dark',
        previousValue: undefined,
        firstChange: false,
        isFirstChange: () => false
      }
    });
    
    expect(themeService.setupTheme).toHaveBeenCalledWith('dark', true);
  });

  it('should clean up on destroy', () => {
    component.ngOnDestroy();
    expect(portalService.clearPortalContainer).toHaveBeenCalled();
  });
}); 