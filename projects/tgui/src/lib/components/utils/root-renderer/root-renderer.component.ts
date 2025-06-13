import { 
  Component, 
  ChangeDetectionStrategy, 
  ViewEncapsulation, 
  inject, 
  AfterViewInit, 
  OnDestroy, 
  TemplateRef, 
  ViewChild, 
  ViewContainerRef 
} from '@angular/core';
import { PortalService } from '../../../services';

/**
 * Component for rendering content in the portal container
 * Equivalent to RootRenderer in React version
 * Used for rendering content outside of normal DOM hierarchy (modals, popups, etc.)
 */
@Component({
  selector: 'tgui-root-renderer',
  template: `
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class RootRendererComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contentTemplate', { static: true }) contentTemplate!: TemplateRef<any>;
  
  // Inject services
  private portalService = inject(PortalService);
  private viewContainerRef = inject(ViewContainerRef);
  
  // Track rendered view
  private viewRef: any = null;
  
  constructor() {
    // Portal container changes are handled in ngAfterViewInit
  }
  
  ngAfterViewInit(): void {
    // Get portal container
    const portalContainer = this.portalService.getPortalContainerElement();
    
    // If no portal container, don't render
    if (!portalContainer) {
      return;
    }
    
    // Create view from template
    this.viewRef = this.viewContainerRef.createEmbeddedView(this.contentTemplate);
    
    // Move nodes to portal container
    this.viewRef.rootNodes.forEach((node: Node) => {
      portalContainer.appendChild(node);
    });
  }
  
  ngOnDestroy(): void {
    // Clean up view on destroy
    if (this.viewRef) {
      try {
        this.viewContainerRef.remove(
          this.viewContainerRef.indexOf(this.viewRef)
        );
      } catch (e) {
        console.error('Error cleaning up root renderer view:', e);
      }
    }
  }
} 