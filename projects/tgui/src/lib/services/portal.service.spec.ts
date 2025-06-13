import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { PortalService } from './portal.service';

describe('PortalService', () => {
  let service: PortalService;
  let mockElement: HTMLDivElement;
  let mockElementRef: ElementRef;
  let consoleSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortalService]
    });

    // Create mock element and ElementRef
    mockElement = document.createElement('div');
    mockElement.className = 'mock-portal-container';
    mockElementRef = { nativeElement: mockElement } as ElementRef;

    // Spy on console methods
    consoleSpy = spyOn(console, 'debug').and.callThrough();
    spyOn(console, 'warn').and.callThrough();
    spyOn(console, 'error').and.callThrough();

    service = TestBed.inject(PortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(consoleSpy).toHaveBeenCalledWith('PortalService: initialized');
  });

  it('should set portal container element', () => {
    service.setPortalContainer(mockElementRef);
    
    expect(service.isPortalReady()).toBeTrue();
    expect(service.getPortalContainerElement()).toBe(mockElement);
    expect(console.debug).toHaveBeenCalledWith('PortalService: portal container set');
  });

  it('should handle null ElementRef when setting portal container', () => {
    service.setPortalContainer(null as unknown as ElementRef);
    
    expect(service.isPortalReady()).toBeFalse();
    expect(console.error).toHaveBeenCalledWith('PortalService: Cannot set portal container with null or invalid ElementRef');
  });

  it('should handle ElementRef with null nativeElement when setting portal container', () => {
    const invalidRef = { nativeElement: null } as unknown as ElementRef;
    service.setPortalContainer(invalidRef);
    
    expect(service.isPortalReady()).toBeFalse();
    expect(console.error).toHaveBeenCalledWith('PortalService: Cannot set portal container with null or invalid ElementRef');
  });

  it('should clear portal container', () => {
    // First set container
    service.setPortalContainer(mockElementRef);
    expect(service.isPortalReady()).toBeTrue();
    
    // Then clear it
    service.clearPortalContainer();
    
    expect(service.isPortalReady()).toBeFalse();
    expect(console.debug).toHaveBeenCalledWith('PortalService: portal container cleared');
  });

  it('should warn when getting portal container element that is not set', () => {
    const element = service.getPortalContainerElement();
    
    expect(element).toBeNull();
    expect(console.warn).toHaveBeenCalledWith('PortalService: Attempted to get portal container element, but it\'s not available');
  });

  it('should correctly report portal ready state', () => {
    // Initially not ready
    expect(service.isPortalReady()).toBeFalse();
    expect(console.debug).toHaveBeenCalledWith('PortalService: portal ready check, result: false');
    
    // Set container
    service.setPortalContainer(mockElementRef);
    
    // Now should be ready
    expect(service.isPortalReady()).toBeTrue();
    expect(console.debug).toHaveBeenCalledWith('PortalService: portal ready check, result: true');
  });
}); 