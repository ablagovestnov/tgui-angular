import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CheckboxComponent } from './checkbox.component';
import { PlatformService } from '../../../services/platform.service';

// Create test host component
@Component({
  template: `
    <tgui-checkbox
      [checked]="isChecked"
      [disabled]="isDisabled"
      [indeterminate]="isIndeterminate"
      [name]="name"
      [value]="value"
      (change)="onChange($event)"
    ></tgui-checkbox>
  `,
  standalone: true,
  imports: [CheckboxComponent]
})
class TestHostComponent {
  isChecked = false;
  isDisabled = false;
  isIndeterminate = false;
  name = 'test-checkbox';
  value = 'test-value';
  
  onChange(event: Event): void {}
}

describe('CheckboxComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let platformServiceMock: jasmine.SpyObj<PlatformService>;
  let checkboxEl: HTMLElement;

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
    checkboxEl = fixture.debugElement.query(By.directive(CheckboxComponent)).nativeElement;
  });

  it('should create', () => {
    expect(checkboxEl).toBeTruthy();
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
  
  it('should emit change event when checkbox is clicked', () => {
    // Given
    const changeSpy = spyOn(hostComponent, 'onChange');
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    
    // When
    inputEl.dispatchEvent(new Event('change'));
    
    // Then
    expect(changeSpy).toHaveBeenCalled();
  });
  
  it('should not emit change event when checkbox is disabled', () => {
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
  
  it('should display indeterminate icon when indeterminate is true', () => {
    // Given
    hostComponent.isIndeterminate = true;
    
    // When
    fixture.detectChanges();
    const indeterminateIconEl = fixture.debugElement.query(By.css('tgui-icon-checkbox-indeterminate'));
    
    // Then
    expect(indeterminateIconEl).toBeTruthy();
  });
  
  it('should display checked icon when checked is true and indeterminate is false', () => {
    // Given
    hostComponent.isChecked = true;
    hostComponent.isIndeterminate = false;
    
    // When
    fixture.detectChanges();
    const checkedIconEl = fixture.debugElement.query(By.css('tgui-icon-checkbox-checked'));
    
    // Then
    expect(checkedIconEl).toBeTruthy();
  });
}); 