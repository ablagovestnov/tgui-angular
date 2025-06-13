import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CellComponent } from './cell.component';
import { PlatformService } from '../../../services/platform.service';
import { TypographyCellService } from './services/typography-cell.service';

@Component({
  template: `
    <tgui-cell 
      [title]="title"
      [subtitle]="subtitle"
      [description]="description"
      [beforeTemplate]="beforeTemplate"
      [afterTemplate]="afterTemplate"
      [titleBadge]="titleBadgeTemplate">
      Main content
    </tgui-cell>

    <ng-template #beforeRef>
      <div class="before-content">Before Content</div>
    </ng-template>

    <ng-template #afterRef>
      <div class="after-content">After Content</div>
    </ng-template>

    <ng-template #badgeRef>
      <div class="badge-content">Badge</div>
    </ng-template>
  `
})
class TestHostComponent {
  @ViewChild('beforeRef') beforeRef!: TemplateRef<any>;
  @ViewChild('afterRef') afterRef!: TemplateRef<any>;
  @ViewChild('badgeRef') badgeRef!: TemplateRef<any>;

  title = 'Test Title';
  subtitle = 'Test Subtitle';
  description = 'Test Description';
  beforeTemplate: TemplateRef<any> | null = null;
  afterTemplate: TemplateRef<any> | null = null;
  titleBadgeTemplate: TemplateRef<any> | null = null;
}

describe('CellComponent', () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let platformServiceMock: jasmine.SpyObj<PlatformService>;
  let typographyServiceMock: jasmine.SpyObj<TypographyCellService>;

  beforeEach(async () => {
    platformServiceMock = jasmine.createSpyObj('PlatformService', ['isIOS']);
    typographyServiceMock = jasmine.createSpyObj('TypographyCellService', ['getComponent']);
    
    platformServiceMock.isIOS.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [CellComponent],
      declarations: [TestHostComponent],
      providers: [
        { provide: PlatformService, useValue: platformServiceMock },
        { provide: TypographyCellService, useValue: typographyServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Basic rendering', () => {
    it('should render title when provided', () => {
      fixture.componentRef.setInput('title', 'Test Title');
      fixture.detectChanges();

      const titleElement = fixture.debugElement.query(By.css('.title'));
      expect(titleElement?.nativeElement.textContent.trim()).toBe('Test Title');
    });

    it('should render subtitle when provided', () => {
      fixture.componentRef.setInput('subtitle', 'Test Subtitle');
      fixture.detectChanges();

      const subtitleElement = fixture.debugElement.query(By.css('.subtitle'));
      expect(subtitleElement?.nativeElement.textContent.trim()).toBe('Test Subtitle');
    });

    it('should render description when provided', () => {
      fixture.componentRef.setInput('description', 'Test Description');
      fixture.detectChanges();

      const descriptionElement = fixture.debugElement.query(By.css('.description'));
      expect(descriptionElement?.nativeElement.textContent.trim()).toBe('Test Description');
    });

    it('should not render title section when no title, hint, or titleBadge provided', () => {
      fixture.detectChanges();

      const headElement = fixture.debugElement.query(By.css('.head'));
      expect(headElement).toBeFalsy();
    });
  });

  describe('Template rendering', () => {
    beforeEach(() => {
      hostFixture.detectChanges();
    });

    it('should not render before template container when beforeTemplate is null', () => {
      hostComponent.beforeTemplate = null;
      hostFixture.detectChanges();

      const beforeContainer = hostFixture.debugElement.query(By.css('.before'));
      expect(beforeContainer).toBeFalsy();
    });

    it('should render before template when provided', () => {
      hostComponent.beforeTemplate = hostComponent.beforeRef;
      hostFixture.detectChanges();

      const beforeContainer = hostFixture.debugElement.query(By.css('.before'));
      const beforeContent = hostFixture.debugElement.query(By.css('.before-content'));
      
      expect(beforeContainer).toBeTruthy();
      expect(beforeContent?.nativeElement.textContent.trim()).toBe('Before Content');
    });

    it('should not render after template container when afterTemplate is null', () => {
      hostComponent.afterTemplate = null;
      hostFixture.detectChanges();

      const afterContainer = hostFixture.debugElement.query(By.css('.after'));
      expect(afterContainer).toBeFalsy();
    });

    it('should render after template when provided', () => {
      hostComponent.afterTemplate = hostComponent.afterRef;
      hostFixture.detectChanges();

      const afterContainer = hostFixture.debugElement.query(By.css('.after'));
      const afterContent = hostFixture.debugElement.query(By.css('.after-content'));
      
      expect(afterContainer).toBeTruthy();
      expect(afterContent?.nativeElement.textContent.trim()).toBe('After Content');
    });

    it('should render title badge template when provided', () => {
      hostComponent.title = 'Title';
      hostComponent.titleBadgeTemplate = hostComponent.badgeRef;
      hostFixture.detectChanges();

      const badgeContent = hostFixture.debugElement.query(By.css('.badge-content'));
      expect(badgeContent?.nativeElement.textContent.trim()).toBe('Badge');
    });
  });

  describe('Platform-specific behavior', () => {
    it('should add iOS class when platform is iOS', () => {
      platformServiceMock.isIOS.and.returnValue(true);
      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement).toHaveClass('ios');
    });

    it('should not add iOS class when platform is not iOS', () => {
      platformServiceMock.isIOS.and.returnValue(false);
      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement).not.toHaveClass('ios');
    });

    it('should use TextComponent for titles on iOS', () => {
      platformServiceMock.isIOS.and.returnValue(true);
      fixture.componentRef.setInput('title', 'Test Title');
      fixture.detectChanges();

      const textComponent = fixture.debugElement.query(By.css('tgui-text'));
      const subheadlineComponent = fixture.debugElement.query(By.css('tgui-subheadline.head'));
      
      expect(textComponent).toBeTruthy();
      expect(subheadlineComponent).toBeFalsy();
    });

    it('should use SubheadlineComponent for titles on non-iOS platforms', () => {
      platformServiceMock.isIOS.and.returnValue(false);
      fixture.componentRef.setInput('title', 'Test Title');
      fixture.detectChanges();

      const textComponent = fixture.debugElement.query(By.css('tgui-text'));
      const subheadlineComponent = fixture.debugElement.query(By.css('tgui-subheadline.head'));
      
      expect(textComponent).toBeFalsy();
      expect(subheadlineComponent).toBeTruthy();
    });
  });

  describe('Input properties', () => {
    it('should apply hovered class when hovered is true', () => {
      fixture.componentRef.setInput('hovered', true);
      fixture.detectChanges();

      const wrapper = fixture.debugElement.query(By.css('.wrapper'));
      expect(wrapper.nativeElement).toHaveClass('wrapper--hovered');
    });

    it('should apply multiline class when multiline is true', () => {
      fixture.componentRef.setInput('multiline', true);
      fixture.detectChanges();

      const wrapper = fixture.debugElement.query(By.css('.wrapper'));
      expect(wrapper.nativeElement).toHaveClass('wrapper--multiline');
    });

    it('should apply iOS class when platform is iOS', () => {
      platformServiceMock.isIOS.and.returnValue(true);
      fixture.detectChanges();

      const wrapper = fixture.debugElement.query(By.css('.wrapper'));
      expect(wrapper.nativeElement).toHaveClass('wrapper--ios');
    });

    it('should pass through tappable properties', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.componentRef.setInput('readonly', true);
      fixture.componentRef.setInput('interactiveAnimation', 'opacity');
      fixture.detectChanges();

      const tappable = fixture.debugElement.query(By.css('tgui-tappable'));
      expect(tappable.componentInstance.disabled()).toBe(true);
      expect(tappable.componentInstance.readonly()).toBe(true);
      expect(tappable.componentInstance.interactiveAnimation()).toBe('opacity');
    });
  });

  describe('Content projection', () => {
    it('should project main content into middle section', () => {
      hostFixture.detectChanges();

      const middleSection = hostFixture.debugElement.query(By.css('.middle'));
      expect(middleSection.nativeElement.textContent).toContain('Main content');
    });
  });
}); 