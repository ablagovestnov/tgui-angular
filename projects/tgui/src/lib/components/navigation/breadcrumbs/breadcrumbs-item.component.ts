import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input,
  HostBinding,
  ElementRef,
  inject,
  TemplateRef,
  ContentChild,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SubheadlineComponent } from '../../typography/subheadline/subheadline.component';

/**
 * A component that represents a single item within a breadcrumb navigation.
 * It can be used standalone or as part of a BreadCrumbs collection.
 */
@Component({
  selector: 'tgui-breadcrumbs-item',
  standalone: true,
  imports: [CommonModule, RouterModule, SubheadlineComponent],
  template: `
    <!-- Content template -->
    <ng-template #content>
      <tgui-subheadline level="2" weight="2">
        <ng-content></ng-content>
      </tgui-subheadline>
    </ng-template>
    
    <!-- Non-clickable item -->
    <ng-container *ngIf="!isLink()">
      <ng-container [ngTemplateOutlet]="content"></ng-container>
    </ng-container>
    
    <!-- External link (href) -->
    <a *ngIf="isExternalLink()" [href]="href()" [target]="target()">
      <ng-container [ngTemplateOutlet]="content"></ng-container>
    </a>
    
    <!-- Internal link (routerLink) -->
    <a *ngIf="isInternalLink()" [routerLink]="routerLink()">
      <ng-container [ngTemplateOutlet]="content"></ng-container>
    </a>
  `,
  styles: [`
    :host {
      cursor: pointer;
      padding: 8px 10px;
      border-radius: 8px;
      display: block;
      text-decoration: none;
      transition: opacity .15s ease-out;
      color: var(--tgui--hint_color);
    }

    a {
      text-decoration: none;
      color: inherit;
      display: block;
    }

    :host:active {
      opacity: .5;
    }

    @media (hover: hover) and (pointer: fine) {
      :host:hover {
        background: var(--tgui--tertiary_bg_color);
      }
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsItemComponent {
  /**
   * URL for the breadcrumb item
   * @deprecated Use href or routerLink instead
   */
  url = input<string | undefined>(undefined);

  /**
   * External URL for the breadcrumb item (href attribute)
   */
  href = input<string | undefined>(undefined);
  
  /**
   * Target attribute for external links
   */
  target = input<string | undefined>('_self');
  
  /**
   * URL for internal navigation (routerLink)
   */
  routerLink = input<string | any[] | undefined>(undefined);

  /**
   * Computed property to determine if the item is a link (either external or internal)
   */
  isLink = computed(() => {
    return this.isExternalLink() || this.isInternalLink() || !!this.url();
  });

  /**
   * Check if this item is an external link (has href)
   */
  isExternalLink = computed(() => {
    return !!this.href() && !this.routerLink();
  });

  /**
   * Check if this item is an internal link (has routerLink)
   */
  isInternalLink = computed(() => {
    return !!this.routerLink() || (!!this.url() && !this.href());
  });

  /**
   * Reference to the element template
   */
  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;

  /** Element reference */
  private elementRef = inject(ElementRef);

  /**
   * Allows the host element to be an HTML anchor tag for navigation purposes
   */
  @HostBinding('attr.role') get role(): string | null {
    const isA = this.elementRef.nativeElement.tagName === 'A';
    const isLink = this.isLink();
    
    return (isA || isLink) ? 'button' : null;
  }
}