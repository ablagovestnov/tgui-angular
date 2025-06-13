import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PinInputCellComponent } from './pin-input-cell.component';
import { PlatformService } from '../../../../../services/platform.service';
import { Component } from '@angular/core';

// Test host component to simplify property testing
@Component({
  template: `<tgui-pin-input-cell [isTyped]="isTyped" [disabled]="disabled"></tgui-pin-input-cell>`
})
class TestHostComponent {
  isTyped = false;
  disabled = false;
}

describe('PinInputCellComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let platformServiceMock: jasmine.SpyObj<PlatformService>;

  beforeEach(async () => {
    platformServiceMock = jasmine.createSpyObj('PlatformService', ['isIOS']);
    platformServiceMock.isIOS.and.returnValue(false);

    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [PinInputCellComponent],
      providers: [
        { provide: PlatformService, useValue: platformServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const pinInputCell = fixture.debugElement.query(By.directive(PinInputCellComponent));
    expect(pinInputCell).toBeTruthy();
  });

  it('should not show dot when not typed', () => {
    // Given
    hostComponent.isTyped = false;
    
    // When
    fixture.detectChanges();
    const dotElement = fixture.debugElement.query(By.css('.dot'));
    
    // Then
    expect(dotElement).toBeNull();
  });

  it('should show dot when typed and not iOS', () => {
    // Given
    platformServiceMock.isIOS.and.returnValue(false);
    hostComponent.isTyped = true;
    
    // When
    fixture.detectChanges();
    const dotElement = fixture.debugElement.query(By.css('.dot'));
    
    // Then
    expect(dotElement).not.toBeNull();
  });

  it('should not show dot when typed but platform is iOS', () => {
    // Given
    platformServiceMock.isIOS.and.returnValue(true);
    hostComponent.isTyped = true;
    
    // When
    fixture.detectChanges();
    const dotElement = fixture.debugElement.query(By.css('.dot'));
    
    // Then
    expect(dotElement).toBeNull();
  });

  it('should apply iOS-specific styles when on iOS platform', () => {
    // Given
    platformServiceMock.isIOS.and.returnValue(true);
    
    // When
    fixture.detectChanges();
    const wrapperElement = fixture.debugElement.query(By.css('.wrapper'));
    
    // Then
    expect(wrapperElement.classes['wrapper--ios']).toBeTrue();
  });

  it('should apply typed class when typed', () => {
    // Given
    hostComponent.isTyped = true;
    
    // When
    fixture.detectChanges();
    const wrapperElement = fixture.debugElement.query(By.css('.wrapper'));
    
    // Then
    expect(wrapperElement.classes['wrapper--typed']).toBeTrue();
  });
}); 