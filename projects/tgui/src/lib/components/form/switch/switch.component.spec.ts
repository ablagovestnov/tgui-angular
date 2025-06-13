import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { SwitchComponent } from './switch.component';
import { PlatformService } from '../../../services/platform.service';

// Create a test host component
@Component({
  template: `
    <tgui-switch
      [checked]="isChecked"
      [disabled]="isDisabled"
      [name]="name"
      [value]="value"
      (change)="onChange($event)"
    ></tgui-switch>
  `,
  standalone: true,
  imports: [SwitchComponent]
})
class TestHostComponent {
  isChecked = false;
  isDisabled = false;
  name = 'test-switch';
  value = 'test-value';
  
  onChange(event: Event): void {}
}

describe('SwitchComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let platformServiceMock: jasmine.SpyObj<PlatformService>;
  let switchEl: HTMLElement;

  beforeEach(async () => {
    platformServiceMock = jasmine.createSpyObj('PlatformService', ['platform', 'isIOS']);
    platformServiceMock.platform.and.returnValue('base');
    platformServiceMock.isIOS.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        { provide: PlatformService, useValue: platformServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
    switchEl = fixture.debugElement.query(By.directive(SwitchComponent)).nativeElement;
  });

  it('should create', () => {
    expect(switchEl).toBeTruthy();
  });

  it('should set checked state correctly', () => {
    // Given
    hostComponent.isChecked = true;
    
    // When
    fixture.detectChanges();
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    
    // Then
    expect(inputEl.checked).toBeTrue();
  });
  
  it('should set disabled state correctly', () => {
    // Given
    hostComponent.isDisabled = true;
    
    // When
    fixture.detectChanges();
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    const wrapperEl = fixture.debugElement.query(By.css('.wrapper')).nativeElement;
    
    // Then
    expect(inputEl.disabled).toBeTrue();
    expect(wrapperEl.classList.contains('wrapper--disabled')).toBeTrue();
  });
  
  it('should emit change event when switch is clicked', () => {
    // Given
    const changeSpy = spyOn(hostComponent, 'onChange');
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    
    // When
    inputEl.dispatchEvent(new Event('change'));
    
    // Then
    expect(changeSpy).toHaveBeenCalled();
  });
  
  it('should not emit change event when switch is disabled', () => {
    // Given
    hostComponent.isDisabled = true;
    fixture.detectChanges();
    const changeSpy = spyOn(hostComponent, 'onChange');
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    
    // When
    inputEl.dispatchEvent(new Event('change'));
    
    // Then
    expect(changeSpy).not.toHaveBeenCalled();
  });
  
  it('should apply platform-specific styles', () => {
    // Test base platform
    expect(fixture.debugElement.query(By.css('.wrapper--base'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.wrapper--ios'))).toBeFalsy();
    
    // Change to iOS platform
    platformServiceMock.platform.and.returnValue('ios');
    fixture.detectChanges();
    
    // Test iOS platform
    expect(fixture.debugElement.query(By.css('.wrapper--ios'))).toBeTruthy();
  });
}); 