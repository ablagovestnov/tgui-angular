import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have plain type by default', () => {
    expect(component.type).toBe('plain');
  });

  it('should apply ambient type when specified', () => {
    component.type = 'ambient';
    fixture.detectChanges();
    expect(component.className).toContain('tgui-card--ambient');
  });
}); 