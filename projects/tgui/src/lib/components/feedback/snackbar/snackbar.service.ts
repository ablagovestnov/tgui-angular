import { Injectable, inject, TemplateRef, createComponent, ApplicationRef, EnvironmentInjector } from '@angular/core';
import { SnackbarComponent } from './snackbar.component';
import { PortalService } from '../../../services/portal.service';

export interface SnackbarOptions {
  beforeTemplate?: TemplateRef<any>;
  afterTemplate?: TemplateRef<any>;
  description?: string;
  linkTemplate?: TemplateRef<any>;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private portalService = inject(PortalService);
  private activeSnackbars: any[] = [];
  private styleInjected = false;
  
  private injectSnackbarStyles() {
    if (this.styleInjected) return;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes verticalIntro {
        from {
          transform: translate3d(0, 140%, 0);
        }
        to {
          transform: translate3d(0, 0, 0);
        }
      }
    `;
    document.head.appendChild(style);
    this.styleInjected = true;
  }
  
  show(message: string, options: SnackbarOptions = {}): void {
    console.log('SnackbarService.show called with message:', message);
    
    // Ensure styles are injected
    this.injectSnackbarStyles();
    
    // Check if portal container is available
    const portalContainer = this.portalService.getPortalContainerElement();
    console.log('PortalContainer element:', portalContainer);
    
    if (!portalContainer) {
      console.error('SnackbarService: Portal container not available. Make sure tgui-root component is properly set up.');
      return;
    }
    
    try {
      // Create a direct snackbar (avoiding RootPortalComponent recursive issue)
      // Create the wrapper div
      const wrapperEl = document.createElement('div');
      wrapperEl.className = 'tgui-snackbar-wrapper';
      wrapperEl.style.position = 'fixed';
      wrapperEl.style.left = '10px';
      wrapperEl.style.right = '10px';
      wrapperEl.style.bottom = '10px';
      wrapperEl.style.boxSizing = 'border-box';
      wrapperEl.style.maxInlineSize = '460px';
      wrapperEl.style.animation = 'verticalIntro 340ms cubic-bezier(.3, .3, .5, 1)';
      wrapperEl.style.transition = 'transform 320ms cubic-bezier(.3, .3, .5, 1)';
      wrapperEl.style.zIndex = '9999';
      wrapperEl.style.margin = '0 auto';
      
      // Create the body div
      const bodyEl = document.createElement('div');
      bodyEl.className = 'tgui-snackbar-body';
      bodyEl.style.position = 'sticky';
      bodyEl.style.inset = '0';
      bodyEl.style.display = 'flex';
      bodyEl.style.alignItems = 'center';
      bodyEl.style.gap = '12px';
      bodyEl.style.width = '100%';
      bodyEl.style.boxSizing = 'border-box';
      bodyEl.style.padding = '10px 16px 10px 10px';
      bodyEl.style.borderRadius = '10px';
      bodyEl.style.backdropFilter = 'blur(28px)';
      bodyEl.style.background = 'var(--tgui--surface_dark)';
      
      // Create the message div
      const middleEl = document.createElement('div');
      middleEl.className = 'tgui-snackbar-middle';
      middleEl.style.flex = '1 1 0';
      middleEl.style.display = 'flex';
      middleEl.style.flexDirection = 'column';
      middleEl.style.gap = '1px';
      middleEl.style.color = 'var(--tgui--white)';
      
      // Add message
      const messageEl = document.createElement('div');
      messageEl.style.fontFamily = 'var(--tgui--font-family)';
      messageEl.style.fontSize = '14px';
      messageEl.style.fontWeight = '500';
      messageEl.textContent = message;
      middleEl.appendChild(messageEl);
      
      // Add description if provided
      if (options.description) {
        const descEl = document.createElement('div');
        descEl.style.fontFamily = 'var(--tgui--font-family)';
        descEl.style.fontSize = '14px';
        descEl.textContent = options.description;
        middleEl.appendChild(descEl);
      }
      
      // Add elements to the DOM
      bodyEl.appendChild(middleEl);
      wrapperEl.appendChild(bodyEl);
      
      // Add to DOM
      portalContainer.appendChild(wrapperEl);
      
      console.log('Manual snackbar element added to portal container:', wrapperEl);
      
      // Set up auto-close timer
      const duration = options.duration ?? 4000;
      
      // Store reference for cleanup
      const snackbarRef = { 
        element: wrapperEl, 
        timeoutId: null as any
      };
      
      // Add to active snackbars
      this.activeSnackbars.push(snackbarRef);
      
      // Auto close after duration
      if (duration > 0) {
        snackbarRef.timeoutId = setTimeout(() => {
          this.closeManualSnackbar(snackbarRef);
        }, duration);
      }
      
      console.log('SnackbarService: Manual snackbar added successfully');
    } catch (error) {
      console.error('Error creating snackbar component:', error);
    }
  }
  
  private closeManualSnackbar(snackbarRef: any): void {
    // Add closing animation class
    if (snackbarRef.element) {
      snackbarRef.element.style.transform = 'translate3d(0, 140%, 0)';
      
      // Remove after animation completes
      setTimeout(() => {
        const index = this.activeSnackbars.indexOf(snackbarRef);
        if (index !== -1) {
          this.activeSnackbars.splice(index, 1);
        }
        
        // Remove from DOM
        if (snackbarRef.element && snackbarRef.element.parentNode) {
          snackbarRef.element.parentNode.removeChild(snackbarRef.element);
        }
        
        // Clear timeout if it exists
        if (snackbarRef.timeoutId) {
          clearTimeout(snackbarRef.timeoutId);
        }
      }, 320); // Match the CSS transition duration
    }
  }
  
  private close(snackbarRef: any): void {
    const index = this.activeSnackbars.indexOf(snackbarRef);
    if (index !== -1) {
      this.activeSnackbars.splice(index, 1);
      
      // Remove from DOM
      const element = snackbarRef.location.nativeElement;
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
      
      this.appRef.detachView(snackbarRef.hostView);
      snackbarRef.destroy();
    }
  }
  
  closeAll(): void {
    // Close all snackbars
    const snackbars = [...this.activeSnackbars]; // Create a copy to avoid mutation issues
    for (const snackbar of snackbars) {
      if (snackbar.element) {
        this.closeManualSnackbar(snackbar);
      } else {
        snackbar.instance.close();
      }
    }
  }
} 