import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsItemComponent } from './breadcrumbs-item.component';
import { BreadcrumbsDotIconComponent } from './icons/dot-icon.component';
import { BreadcrumbsSlashIconComponent } from './icons/slash-icon.component';
import { TguiIcon16Chevron } from '../../../icons/icon16/tgui-icon16-chevron';

/**
 * Interface for a breadcrumb item
 */
export interface BreadcrumbItem {
  /**
   * Display text for the breadcrumb item
   */
  label: string;
  
  /**
   * Optional URL for external links (href attribute)
   */
  href?: string;
  
  /**
   * Optional target attribute for external links
   */
  target?: string;
  
  /**
   * Optional URL for internal navigation (routerLink)
   */
  routerLink?: string | any[];
}

/**
 * Type of divider to use between breadcrumb items.
 */
export type BreadcrumbsDividerType = 'dot' | 'slash' | 'chevron';

/**
 * The Breadcrumbs component displays a navigation trail for users to follow back to the starting or entry point.
 * It supports customizable dividers to fit different design needs.
 * 
 * Usage:
 * ```html
 * <tgui-breadcrumbs
 *   [items]="[
 *     { label: 'Home', url: '/' },
 *     { label: 'Catalog', url: '/catalog' },
 *     { label: 'Product' }
 *   ]"
 *   divider="slash"
 * ></tgui-breadcrumbs>
 * ```
 */
@Component({
  selector: 'tgui-breadcrumbs',
  standalone: true,
  imports: [
    CommonModule, 
    BreadcrumbsItemComponent, 
    BreadcrumbsDotIconComponent,
    BreadcrumbsSlashIconComponent,
    TguiIcon16Chevron
  ],
  template: `
    <div class="tgui-breadcrumbs-wrapper">
        @for (item of items(); track $index) {
        <!-- Breadcrumb item -->
        <ng-container *ngIf="$index > 0">
          <!-- Divider -->
          <div class="tgui-breadcrumbs-divider">
            <tgui-breadcrumbs-dot-icon *ngIf="divider() === 'dot'"></tgui-breadcrumbs-dot-icon>
            <tgui-breadcrumbs-slash-icon *ngIf="divider() === 'slash'"></tgui-breadcrumbs-slash-icon>
            <tgui-icon16-chevron style="stroke-width: 2; display: flex; align-items: center; justify-content: center;" class="tgui-breadcrumbs-chevron" *ngIf="divider() === 'chevron'"></tgui-icon16-chevron>
          </div>
        </ng-container>
        
        <!-- Render item through breadcrumbs-item component -->
        <tgui-breadcrumbs-item 
          [href]="item.href" 
          [routerLink]="item.routerLink"
          [target]="item.target"
        >{{ item.label }}</tgui-breadcrumbs-item>
        }
    </div>
  `,
  styles: [`
    .tgui-breadcrumbs-wrapper {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 4px;
    }

    .tgui-breadcrumbs-divider {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 20px;
      margin: 0 -6px;
      color: var(--tgui--divider);
    }

    .tgui-breadcrumbs-chevron {
      color: var(--tgui--link_color);
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  /**
   * Array of breadcrumb items to display
   */
  items = input<BreadcrumbItem[]>([]);

  /**
   * Type of divider to use between breadcrumb items.
   */
  divider = input<BreadcrumbsDividerType>('dot');
} 