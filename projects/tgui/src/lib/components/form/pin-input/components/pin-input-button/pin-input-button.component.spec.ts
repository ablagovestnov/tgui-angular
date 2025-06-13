import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PinInputButtonComponent } from './pin-input-button.component';
import { PlatformService } from '../../../../../services/platform.service';
import { LargeTitleComponent, TitleComponent } from '../../../../typography';
import { TappableComponent } from '../../../../utils/tappable/tappable.component';

describe('PinInputButtonComponent', () => {
  let component: PinInputButtonComponent;
  let fixture: ComponentFixture<PinInputButtonComponent>;
  let platformServiceMock: jasmine.SpyObj<PlatformService>;

  beforeEach(async () => {
    platformServiceMock = jasmine.createSpyObj('PlatformService', ['platform', 'isIOS']);
    
    await TestBed.configureTestingModule({
      imports: [
        PinInputButtonComponent,
        TappableComponent,
        LargeTitleComponent, 
        TitleComponent
      ],
      providers: [
        { provide: PlatformService, useValue: platformServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PinInputButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display content correctly when number is provided', () => {
    (component.content as any).set(5);
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('tgui-title'));
    expect(title.nativeElement.textContent.trim()).toBe('5');
  });

  it('should display content correctly when string is provided', () => {
    (component.content as any).set('5');
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('tgui-title'));
    expect(title.nativeElement.textContent.trim()).toBe('5');
  });

  it('should display content as null by default', () => {
    expect(component.content()).toBeNull();
  });

  it('should use large title on iOS platform', () => {
    // Set iOS platform
    (component['isIOSPlatform'] as any).set(true);
    (component.content as any).set('5');
    fixture.detectChanges();

    const largeTitle = fixture.debugElement.query(By.css('tgui-large-title'));
    expect(largeTitle).toBeTruthy();
    expect(largeTitle.nativeElement.textContent.trim()).toBe('5');
  });

  it('should display content with Title component on base platform', () => {
    // Given
    platformServiceMock.isIOS.and.returnValue(false);
    (component.content as any).set('5');
    
    // When
    fixture.detectChanges();
    
    // Then
    const titleElement = fixture.debugElement.query(By.directive(TitleComponent));
    const largeTitleElement = fixture.debugElement.query(By.directive(LargeTitleComponent));
    
    expect(titleElement).toBeTruthy();
    expect(largeTitleElement).toBeFalsy();
    expect(titleElement.nativeElement.textContent.trim()).toBe('5');
  });

  it('should display content with LargeTitle component on iOS platform', () => {
    // Given
    platformServiceMock.isIOS.and.returnValue(true);
    (component.content as any).set('5');
    
    // When
    fixture.detectChanges();
    
    // Then
    const titleElement = fixture.debugElement.query(By.directive(TitleComponent));
    const largeTitleElement = fixture.debugElement.query(By.directive(LargeTitleComponent));
    
    expect(titleElement).toBeFalsy();
    expect(largeTitleElement).toBeTruthy();
    expect(largeTitleElement.nativeElement.textContent.trim()).toBe('5');
  });

  it('should have wrapper class with correct styles', () => {
    // When
    fixture.detectChanges();
    
    // Then
    const wrapperElement = fixture.debugElement.query(By.css('.wrapper'));
    expect(wrapperElement).toBeTruthy();
  });

  it('should add pin-button-ios class to host when on iOS platform', () => {
    // Given
    platformServiceMock.isIOS.and.returnValue(true);
    
    // When
    fixture.detectChanges();
    
    // Then
    expect(fixture.debugElement.nativeElement.classList.contains('pin-button-ios')).toBeTrue();
  });

  it('should not add pin-button-ios class to host when on base platform', () => {
    // Given
    platformServiceMock.isIOS.and.returnValue(false);
    
    // When
    fixture.detectChanges();
    
    // Then
    expect(fixture.debugElement.nativeElement.classList.contains('pin-button-ios')).toBeFalse();
  });
}); 