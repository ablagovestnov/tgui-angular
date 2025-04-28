import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TguiComponent } from './tgui.component';

describe('TguiComponent', () => {
  let component: TguiComponent;
  let fixture: ComponentFixture<TguiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TguiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TguiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
