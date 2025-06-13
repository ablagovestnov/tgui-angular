import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RootComponent } from './tgui-root.component';
import { ThemeService } from '../../../services/theme.service';
import { PlatformService } from '../../../services/platform.service';
import { PortalService } from '../../../services/portal.service';

describe('RootComponent', () => {
  let component: RootComponent;
  let fixture: ComponentFixture<RootComponent>;
  let themeService: ThemeService;
  let platformService: PlatformService;
  let portalService: PortalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootComponent],
      providers: [ThemeService, PlatformService, PortalService]
    }).compileComponents();

    fixture = TestBed.createComponent(RootComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    platformService = TestBed.inject(PlatformService);
    portalService = TestBed.inject(PortalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update appearance', () => {
    (component.appearance as any).set('dark');
    fixture.detectChanges();
    expect(component.appearance()).toBe('dark');
  });
}); 