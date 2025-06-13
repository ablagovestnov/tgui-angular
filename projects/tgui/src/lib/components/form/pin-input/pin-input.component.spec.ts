import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { PinInputComponent, PIN_MIN_COUNT } from './pin-input.component';
import { PlatformService } from '../../../services/platform.service';
import { PinInputService } from './hooks/use-pin-input';
import { HeadlineComponent } from '../../typography/headline/headline.component';
import { RootRendererComponent } from '../../utils/root-renderer/root-renderer.component';

// Test host component to ensure proper work with @Input()
@Component({
  template: `
    <tgui-pin-input
      [label]="label"
      [pinCount]="pinCount"
      [initialValue]="initialValue"
    ></tgui-pin-input>
  `
})
class TestHostComponent {
  label = 'Enter your pin';
  pinCount = 4;
  initialValue: number[] = [];
}

describe('PinInputComponent', () => {
  let hostComponent: TestHostComponent;
  let pinInputComponent: PinInputComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let platformServiceMock: jasmine.SpyObj<PlatformService>;
  let pinInputServiceMock: jasmine.SpyObj<PinInputService>;
  let mockController: any;

  beforeEach(async () => {
    // Create mock for controller
    mockController = {
      value: jasmine.createSpy('value').and.returnValue([]),
      handleClickValue: jasmine.createSpy('handleClickValue'),
      handleClickBackspace: jasmine.createSpy('handleClickBackspace'),
      handleButton: jasmine.createSpy('handleButton')
    };

    // Create mocks for services
    platformServiceMock = jasmine.createSpyObj('PlatformService', ['isIOS', 'platform']);
    platformServiceMock.isIOS.and.returnValue(false);
    platformServiceMock.platform.and.returnValue('base');

    pinInputServiceMock = jasmine.createSpyObj('PinInputService', ['create']);
    pinInputServiceMock.create.and.returnValue(mockController);

    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [PinInputComponent],
      providers: [
        { provide: PlatformService, useValue: platformServiceMock },
        { provide: PinInputService, useValue: pinInputServiceMock }
      ]
    })
    // Replace real components with stubs for test isolation
    .overrideComponent(PinInputComponent, {
      set: {
        imports: [],
        template: '<div class="mock-pin-input"></div>'
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    
    const pinInputDebugElement = fixture.debugElement.query(By.directive(PinInputComponent));
    pinInputComponent = pinInputDebugElement.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(pinInputComponent).toBeTruthy();
  });

  it('should use minimum pin count if provided count is less than minimum', () => {
    // Given
    hostComponent.pinCount = 1; // Less than PIN_MIN_COUNT

    // When
    fixture.detectChanges();

    // Then
    expect(pinInputServiceMock.create).toHaveBeenCalledWith(
      jasmine.objectContaining({
        pinCount: PIN_MIN_COUNT
      })
    );
  });

  it('should use provided pin count if it is valid', () => {
    // Given
    const validPinCount = 6;
    hostComponent.pinCount = validPinCount;

    // When
    fixture.detectChanges();

    // Then
    expect(pinInputServiceMock.create).toHaveBeenCalledWith(
      jasmine.objectContaining({
        pinCount: validPinCount
      })
    );
  });

  it('should pass initial value to the controller', () => {
    // Given
    const initialValue = [1, 2, 3];
    hostComponent.initialValue = initialValue;

    // When
    fixture.detectChanges();

    // Then
    expect(pinInputServiceMock.create).toHaveBeenCalledWith(
      jasmine.objectContaining({
        value: initialValue
      })
    );
  });

  it('should delegate click value handling to the controller', () => {
    // When
    pinInputComponent['handleClickValue'](5);

    // Then
    expect(mockController.handleClickValue).toHaveBeenCalledWith(5);
  });

  it('should delegate backspace handling to the controller', () => {
    // When
    pinInputComponent['handleClickBackspace']();

    // Then
    expect(mockController.handleClickBackspace).toHaveBeenCalled();
  });

  it('should delegate button handling to the controller', () => {
    // When
    pinInputComponent['handleButton'](1, 'Backspace');

    // Then
    expect(mockController.handleButton).toHaveBeenCalledWith(1, 'Backspace');
  });

  it('should check platform through PlatformService', () => {
    // When
    pinInputComponent['isIOS']();

    // Then
    expect(platformServiceMock.isIOS).toHaveBeenCalled();
  });
}); 