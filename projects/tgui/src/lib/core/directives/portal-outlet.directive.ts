import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy, ElementRef, EmbeddedViewRef, inject, effect } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PortalService } from '@services/portal.service';

/**
 * Directive that renders content into a portal container
 * Use it to project content outside of its normal DOM hierarchy
 */
@Directive({
  selector: '[tguiPortalOutlet]',
  standalone: true
})
export class PortalOutletDirective implements OnInit, OnDestroy {
  @Input() tguiPortalOutlet: TemplateRef<any> | null = null;
  
  private destroy$ = new Subject<void>();
  
  private viewContainerRef = inject(ViewContainerRef);
  private portalService = inject(PortalService);
  
  constructor() {
    effect(() => {
      const container = this.portalService.portalContainer();
      
      // Skip rendering if we're not initialized yet
      if (!this.tguiPortalOutlet) return;
      
      // Clear existing content
      this.viewContainerRef.clear();
      
      // Only render if we have both a container and a template
      if (container && this.tguiPortalOutlet) {
        const embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.tguiPortalOutlet) as EmbeddedViewRef<any>;
        
        // Move the generated content to the portal container
        const viewRootNodes = embeddedViewRef.rootNodes || [];
        viewRootNodes.forEach((node: Node) => {
          container.nativeElement.appendChild(node);
        });
      }
    });
  }
  
  ngOnInit(): void {
    // Initialization is now handled in the effect
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
} 