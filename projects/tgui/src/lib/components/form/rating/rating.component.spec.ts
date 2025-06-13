import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RatingComponent } from './rating.component';
import { Component, signal } from '@angular/core';

// Create a test host component to test the component with inputs
@Component({
  template: `
    <tgui-rating 
      [precision]="precision" 
      [max]="maxStars" 
      [(ratingValue)]="rating">
    </tgui-rating>
  `,
  standalone: true,
  imports: [RatingComponent]
})
class TestHostComponent {
  precision = 1;
  maxStars = 5;
  rating = signal(0);
}

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingComponent, TestHostComponent]
    }).compileComponents();

    // Create the component fixture
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;

    // Create the host component fixture
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    
    fixture.detectChanges();
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of stars based on max input', () => {
    // Given
    hostComponent.maxStars = 3;
    
    // When
    hostFixture.detectChanges();
    const starElements = hostFixture.debugElement.queryAll(By.css('.element'));
    
    // Then
    expect(starElements.length).toBe(3);
  });

  it('should apply correct width to picked element based on rating value', () => {
    // Given
    hostComponent.rating.set(2.5);
    
    // When
    hostFixture.detectChanges();
    const pickedElements = hostFixture.debugElement.queryAll(By.css('.element--picked'));
    
    // Then
    // First 2 stars should be fully filled (width 100%)
    expect(pickedElements[0].styles['width']).toBe('100%');
    expect(pickedElements[1].styles['width']).toBe('100%');
    // Third star should be half filled (width 50%)
    expect(pickedElements[2].styles['width']).toBe('50%');
  });

  it('should update the model value when a star is clicked', () => {
    // Given
    const initialValue = hostComponent.rating();
    
    // When
    const inputs = hostFixture.debugElement.queryAll(By.css('input[type="radio"]'));
    const secondStar = inputs[1]; // Get the second star's input
    secondStar.nativeElement.click();
    
    // Dispatch change event which will be caught by the parent label
    const changeEvent = new Event('change', { bubbles: true });
    secondStar.nativeElement.dispatchEvent(changeEvent);
    hostFixture.detectChanges();
    
    // Then
    expect(hostComponent.rating()).not.toBe(initialValue);
  });
}); 