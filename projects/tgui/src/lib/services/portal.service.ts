import { Injectable, ElementRef, signal, computed } from '@angular/core';

/**
 * Service for managing portal container references
 * Provides functionality for components to render content outside of their DOM hierarchy
 */
@Injectable({
  providedIn: 'root'
})
export class PortalService {
  // Signal to store the portal container reference
  private readonly portalContainerRef = signal<ElementRef<HTMLElement> | null>(null);

  // Public readonly signal for accessing the portal container
  public readonly portalContainer = this.portalContainerRef.asReadonly();
  
  // Computed signal to check if portal container is available
  public readonly hasPortalContainer = computed(() => !!this.portalContainer());
  
  constructor() {
    console.log('PortalService initialized');
  }
  
  /**
   * Set the portal container reference
   * This is typically called by the TGUIRootComponent
   */
  public setPortalContainer(elementRef: ElementRef<HTMLElement>): void {
    if (!elementRef || !elementRef.nativeElement) {
      console.error('Invalid portal container provided to PortalService');
      return;
    }
    
    console.log('Setting portal container:', elementRef.nativeElement);
    this.portalContainerRef.set(elementRef);
  }
  
  /**
   * Clear the portal container reference
   * This should be called when the container is destroyed
   */
  public clearPortalContainer(): void {
    console.log('Clearing portal container reference');
    this.portalContainerRef.set(null);
  }
  
  /**
   * Get the current portal container element
   * Returns the native DOM element or null if not set
   */
  public getPortalContainerElement(): HTMLElement | null {
    const container = this.portalContainer()?.nativeElement || null;
    if (!container) {
      console.warn('Portal container not available - make sure tgui-root component is properly set up');
    }
    return container;
  }
  
  /**
   * Check if portal container is ready for use
   */
  public isPortalReady(): boolean {
    const isReady = !!this.getPortalContainerElement();
    console.log('Portal ready status:', isReady);
    return isReady;
  }
} 