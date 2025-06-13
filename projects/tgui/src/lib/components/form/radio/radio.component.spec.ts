import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RadioComponent } from './radio.component';

@Component({
  template: `
    <tgui-radio
      [checked]="isChecked"
      [disabled]="isDisabled"
      [name]="name"
      [value]="value"
      (change)="onChange($event)"
    ></tgui-radio>
  `
})
class TestHostComponent {
  isChecked = false;
  isDisabled = false;
  name = 'radio-name';
  value = 'radio-value';
  
  onChange(event: Event): void {}
}

describe('RadioComponent', () => {
  let component: RadioComponent;
  let fixture: ComponentFixture<RadioComponent>;
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioComponent],
      declarations: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should reflect checked state from input', () => {
    // Given
    hostComponent.isChecked = true;
    
    // When
    hostFixture.detectChanges();
    const inputEl = hostFixture.debugElement.query(By.css('input')).nativeElement;
    
    // Then
    expect(inputEl.checked).toBeTrue();
  });
  
  it('should reflect disabled state from input', () => {
    // Given
    hostComponent.isDisabled = true;
    
    // When
    hostFixture.detectChanges();
    const inputEl = hostFixture.debugElement.query(By.css('input')).nativeElement;
    const wrapperEl = hostFixture.debugElement.query(By.css('.wrapper')).nativeElement;
    
    // Then
    expect(inputEl.disabled).toBeTrue();
    expect(wrapperEl.classList.contains('wrapper--disabled')).toBeTrue();
  });
  
  it('should emit change event when radio is clicked', () => {
    // Given
    const changeSpy = spyOn(hostComponent, 'onChange');
    const inputEl = hostFixture.debugElement.query(By.css('input')).nativeElement;
    
    // When
    inputEl.dispatchEvent(new Event('change'));
    
    // Then
    expect(changeSpy).toHaveBeenCalled();
  });
  
  it('should not emit change event when radio is disabled', () => {
    // Given
    hostComponent.isDisabled = true;
    hostFixture.detectChanges();
    const changeSpy = spyOn(hostComponent, 'onChange');
    const inputEl = hostFixture.debugElement.query(By.css('input')).nativeElement;
    
    // When
    inputEl.dispatchEvent(new Event('change'));
    
    // Then
    expect(changeSpy).not.toHaveBeenCalled();
  });
}); 