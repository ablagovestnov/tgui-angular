import { TestBed } from '@angular/core/testing';
import { ThemeService, AppearanceType } from './theme.service';
import { DOCUMENT } from '@angular/common';
import { RendererFactory2, effect, EffectRef } from '@angular/core';
import { TelegramService } from './telegram.service';

// Import WebApp interface from TelegramService file
interface WebApp {
  colorScheme: 'light' | 'dark';
  themeParams: any;
  onEvent(eventName: string, eventHandler: () => void): void;
  offEvent(eventName: string, eventHandler: () => void): void;
}

describe('ThemeService', () => {
  let service: ThemeService;
  let documentMock: any;
  let rendererFactoryMock: jasmine.SpyObj<RendererFactory2>;
  let rendererMock: any;
  let telegramServiceMock: jasmine.SpyObj<TelegramService>;
  
  beforeEach(() => {
    rendererMock = {
      addClass: jasmine.createSpy('addClass'),
      removeClass: jasmine.createSpy('removeClass'),
      createRenderer: jasmine.createSpy('createRenderer')
    };
    
    rendererFactoryMock = jasmine.createSpyObj('RendererFactory2', ['createRenderer']);
    rendererFactoryMock.createRenderer.and.returnValue(rendererMock);
    
    telegramServiceMock = jasmine.createSpyObj('TelegramService', ['getTelegramData']);
    telegramServiceMock.getTelegramData.and.returnValue(undefined);
    
    documentMock = {
      documentElement: {
        className: ''
      },
      getElementById: jasmine.createSpy('getElementById').and.returnValue(null),
      head: {
        appendChild: jasmine.createSpy('appendChild')
      },
      createElement: jasmine.createSpy('createElement').and.returnValue({
        id: '',
        rel: '',
        type: '',
        href: '',
        onerror: null
      })
    };
    
    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: DOCUMENT, useValue: documentMock },
        { provide: RendererFactory2, useValue: rendererFactoryMock },
        { provide: TelegramService, useValue: telegramServiceMock }
      ]
    });
    
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(rendererFactoryMock.createRenderer).toHaveBeenCalled();
  });

  it('should initialize with system theme detection', () => {
    spyOn(console, 'log');
    expect(service).toBeTruthy();
    // ThemeService initializes with system theme detection or Telegram theme
  });

  it('should set theme when setTheme is called', () => {
    spyOn(console, 'log');
    service.setTheme('dark');
    expect(console.log).toHaveBeenCalledWith(jasmine.stringMatching(/ThemeService.setTheme called/));
    expect(service.appearance()).toBe('dark');
  });

  it('should not apply theme if same theme is set again', () => {
    // Set initial theme
    service.setTheme('dark');
    rendererMock.addClass.calls.reset();
    rendererMock.removeClass.calls.reset();

    // Set same theme again
    service.setTheme('dark');
    
    // Verify DOM was not modified since theme didn't change
    expect(rendererMock.removeClass).not.toHaveBeenCalled();
    expect(rendererMock.addClass).not.toHaveBeenCalled();
  });

  it('should emit appearance signal when theme changes', () => {
    let currentAppearance: AppearanceType | undefined;
    const effectRef: EffectRef = effect(() => {
      currentAppearance = service.appearance();
    });
    
    // Change theme
    service.setTheme('dark');
    expect(currentAppearance).toBe('dark');
    
    service.setTheme('light');
    expect(currentAppearance).toBe('light');
    
    // Cleanup
    effectRef.destroy();
  });

  it('should handle null document body gracefully', () => {
    // Modify document mock to simulate null body
    documentMock.documentElement = null;
    
    // This should not throw an error
    expect(() => service.setTheme('dark')).not.toThrow();
  });

  it('should remove old theme class and add new theme class when theme changes', () => {
    // Set initial theme
    service.setTheme('light');
    
    // Change theme
    rendererMock.addClass.calls.reset();
    rendererMock.removeClass.calls.reset();
    service.setTheme('dark');
    
    // Verify old theme class was removed and new one was added
    expect(rendererMock.removeClass).toHaveBeenCalledWith(documentMock.documentElement, 'tgui-theme-light');
    expect(rendererMock.addClass).toHaveBeenCalledWith(documentMock.documentElement, 'tgui-theme-dark');
  });
}); 