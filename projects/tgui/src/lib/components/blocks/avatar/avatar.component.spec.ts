import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarComponent } from './avatar.component';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input properties', () => {
    it('should set default values correctly', () => {
      expect(component.size()).toBe('m');
      expect(component.shape()).toBe('circle');
      expect(component.online()).toBe(false);
      expect(component.src()).toBeUndefined();
      expect(component.initials()).toBeUndefined();
      expect(component.alt()).toBeUndefined();
      expect(component.color()).toBeUndefined();
    });

    it('should update size class when size input changes', () => {
      const sizes: ('xxs' | 'xs' | 's' | 'm' | 'l' | 'xl')[] = ['xxs', 'xs', 's', 'm', 'l', 'xl'];
      
      sizes.forEach(size => {
        (component.size as any).set(size);
        fixture.detectChanges();
        expect(fixture.debugElement.classes[`size-${size}`]).toBeTruthy();
      });
    });

    it('should update shape class when shape input changes', () => {
      const shapes: ('circle' | 'rounded' | 'square')[] = ['circle', 'rounded', 'square'];
      
      shapes.forEach(shape => {
        (component.shape as any).set(shape);
        fixture.detectChanges();
        expect(fixture.debugElement.classes[`shape-${shape}`]).toBeTruthy();
      });
    });
  });

  describe('Image rendering', () => {
    it('should render image when src is provided', () => {
      const testSrc = 'test-image.jpg';
      const testAlt = 'Test Alt Text';
      
      (component.src as any).set(testSrc);
      (component.alt as any).set(testAlt);
      fixture.detectChanges();

      const img = fixture.debugElement.query(By.css('img'));
      expect(img).toBeTruthy();
      expect(img.nativeElement.src).toContain(testSrc);
      expect(img.nativeElement.alt).toBe(testAlt);
    });

    it('should use default alt text when alt is not provided', () => {
      (component.src as any).set('test-image.jpg');
      fixture.detectChanges();

      const img = fixture.debugElement.query(By.css('img'));
      expect(img.nativeElement.alt).toBe('Avatar');
    });
  });

  describe('Initials rendering', () => {
    it('should render initials when no src is provided', () => {
      (component.initials as any).set('AB');
      fixture.detectChanges();

      const acronym = fixture.debugElement.query(By.css('tgui-avatar-acronym'));
      expect(acronym).toBeTruthy();
    });

    it('should not render initials when src is provided', () => {
      (component.src as any).set('test-image.jpg');
      (component.initials as any).set('AB');
      fixture.detectChanges();

      const acronym = fixture.debugElement.query(By.css('tgui-avatar-acronym'));
      expect(acronym).toBeFalsy();
    });
  });

  describe('Online status', () => {
    it('should show online badge when online is true', () => {
      (component.online as any).set(true);
      fixture.detectChanges();

      const badge = fixture.debugElement.query(By.css('.avatar-online-badge'));
      expect(badge).toBeTruthy();
    });

    it('should not show online badge when online is false', () => {
      (component.online as any).set(false);
      fixture.detectChanges();

      const badge = fixture.debugElement.query(By.css('.avatar-online-badge'));
      expect(badge).toBeFalsy();
    });
  });

  describe('Background color', () => {
    it('should return transparent when src is provided', () => {
      (component.src as any).set('test-image.jpg');
      (component.color as any).set('#ff0000');
      expect(component.getBackgroundColor()).toBe('transparent');
    });

    it('should return custom color when provided and no src', () => {
      (component.color as any).set('#ff0000');
      expect(component.getBackgroundColor()).toBe('#ff0000');
    });

    it('should return default color when no src and no custom color', () => {
      expect(component.getBackgroundColor()).toBe('var(--tgui--secondary_fill)');
    });
  });
}); 