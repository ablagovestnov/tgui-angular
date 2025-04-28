import { Component, Input, TemplateRef, ViewChild, ViewContainerRef, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ViewEncapsulation, effect, inject, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { PortalService } from '@services/portal.service';

/**
 * Component for rendering content in the portal container
 * Similar to RootRenderer in React version
 */
@Component({
  selector: 'tgui-root-portal',
  template: `
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host {
      font-family: var(--tgui--font-family);
    }
    
    :host::ng-deep * {
      font-family: var(--tgui--font-family);
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RootPortalComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contentTemplate', {static: true}) contentTemplate!: TemplateRef<any>;
  
  private destroy$ = new Subject<void>();
  private viewRef: any = null;
  private templateReady = false;
  
  private portalService = inject(PortalService);
  private viewContainerRef = inject(ViewContainerRef);
  private cdr = inject(ChangeDetectorRef);
  
  constructor() {
    // Use effect to react to portal container changes
    effect(() => {
      const container = this.portalService.portalContainer();
      console.log('Portal container changed:', container?.nativeElement);
      
      if (!this.templateReady || !this.contentTemplate) {
        console.log('Template not ready yet, waiting...');
        return;
      }
      
      console.log('Template is ready, proceeding with portal rendering');
      
      // Clear previous view if it exists
      if (this.viewRef) {
        try {
          this.viewContainerRef.remove(
            this.viewContainerRef.indexOf(this.viewRef)
          );
        } catch (e) {
          console.error('Error removing portal view:', e);
        }
        this.viewRef = null;
      }
      
      if (container && container.nativeElement) {
        console.log('Creating and inserting view into portal container');
        
        try {
          // Create and insert view
          this.viewRef = this.viewContainerRef.createEmbeddedView(this.contentTemplate);
          this.cdr.detectChanges();
          
          // Move nodes to portal container
          this.viewRef.rootNodes.forEach((node: Node) => {
            // Apply font-family to top-level nodes if they're HTML elements
            if (node instanceof HTMLElement) {
              node.style.fontFamily = 'var(--tgui--font-family)';
            }
            container.nativeElement.appendChild(node);
          });
          
          console.log('Portal content successfully rendered');
        } catch (e) {
          console.error('Error creating portal view:', e);
        }
      } else {
        console.warn('No portal container available');
      }
    });
  }
  
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit triggered, marking template as ready');
    
    // Force immediate check to ensure template detection
    this.cdr.detectChanges();
    
    // Mark template as ready to use in the effect
    this.templateReady = true;
    
    // Force the effect to run again now that template is ready
    setTimeout(() => {
      console.log('Forcing container check');
      const container = this.portalService.portalContainer();
      // Even if container is the same object, this change
      // will trigger the effect to run again
      if (container) {
        this.portalService.clearPortalContainer();
        setTimeout(() => {
          this.portalService.setPortalContainer(container);
        }, 0);
      }
    }, 0);
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    
    // Clean up view
    if (this.viewRef) {
      try {
        this.viewContainerRef.remove(
          this.viewContainerRef.indexOf(this.viewRef)
        );
      } catch (e) {
        console.error('Error cleaning up portal view:', e);
      }
    }
  }
} 