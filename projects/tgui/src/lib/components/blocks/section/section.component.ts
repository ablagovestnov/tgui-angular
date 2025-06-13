import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  Input, 
  ContentChild,
  TemplateRef,
  ViewChild,
  ElementRef,
  inject,
  AfterContentInit,
  ContentChildren,
  QueryList
} from '@angular/core';
import { CommonModule, NgClass, NgTemplateOutlet } from '@angular/common';
import { PlatformService } from '../../../services/platform.service';
import { DividerComponent } from '../../misc/divider/divider.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { SectionFooterComponent } from './components/section-footer/section-footer.component';

/**
 * The Section component organizes content into separate sections with optional
 * headers and footers. It automatically wraps strings and numbers in appropriate
 * SectionHeader and SectionFooter components, and inserts dividers between
 * child elements.
 */
@Component({
  selector: 'tgui-section',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet, DividerComponent, SectionHeaderComponent, SectionFooterComponent],
  template: `
    <section class="tgui-section">
      <div class="tgui-section-body-with-header">
        <!-- Header with wrapper -->
        <ng-container *ngIf="headerContent || headerTemplate">
          <tgui-section-header *ngIf="headerContent && isPrimitiveContent(headerContent)">
            {{headerContent}}
          </tgui-section-header>
          <ng-container *ngIf="headerTemplate">
            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
          </ng-container>
        </ng-container>

        <!-- Custom header content projection -->
        <ng-content select="tgui-section-header"></ng-content>

        <!-- Body content -->
        <div class="tgui-section-body">
          <ng-container *ngFor="let content of contentProjections; let last = last; let i = index">
            <ng-container *ngTemplateOutlet="content"></ng-container>
            <tgui-divider *ngIf="!last" class="tgui-section-divider"></tgui-divider>
          </ng-container>
          
          <!-- Default content projection -->
          <ng-content></ng-content>
        </div>
      </div>

      <!-- Footer with wrapper -->
      <ng-container *ngIf="footerContent || footerTemplate">
        <tgui-section-footer *ngIf="footerContent && isPrimitiveContent(footerContent)">
          {{footerContent}}
        </tgui-section-footer>
        <ng-container *ngIf="footerTemplate">
          <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
        </ng-container>
      </ng-container>

      <!-- Custom footer content projection -->
      <ng-content select="tgui-section-footer"></ng-content>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .tgui-section {
      display: block;
      width: 100%;
    }

    /* Platform specific styles */
    .tgui-section-body-with-header {
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
      background: var(--tgui--section_bg_color);
    }

    :host-context(.tgui-platform-ios) .tgui-section-body-with-header {
      border-radius: 12px;
      background: var(--tgui--section_bg_color);
    }

    :host-context(.tgui-platform-ios) .tgui-section-body {
      border-radius: 12px;
      background: var(--tgui--section_bg_color);
    }

    :host-context(.tgui-platform-ios) .tgui-section-body > :first-child {
      border-radius: 12px 12px 0 0;
    }

    :host-context(.tgui-platform-ios) .tgui-section-body > :last-child {
      border-radius: 0 0 12px 12px;
    }

    :host-context(.tgui-platform-ios) .tgui-section-body > :only-child {
      border-radius: 12px;
    }

    .tgui-section-divider {
      display: block;
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'attr.data-refresh-platform': 'true'
  }
})
export class SectionComponent implements AfterContentInit {
  /**
   * Content for the section header. If a string is passed, SectionHeader is automatically used.
   * For more control or a large header, use <tgui-section-header large>...</tgui-section-header>.
   */
  @Input() header?: string | number | TemplateRef<any>;

  /**
   * Content for the section footer. If a string is passed, SectionFooter is automatically used.
   * For centered footer, use <tgui-section-footer centered>...</tgui-section-footer>.
   */
  @Input() footer?: string | number | TemplateRef<any>;

  // Templates from content projection
  @ContentChild('headerContent') headerTemplate?: TemplateRef<any>;
  @ContentChild('footerContent') footerTemplate?: TemplateRef<any>;

  // For storing content between elements
  @ContentChildren(TemplateRef) contentNodes!: QueryList<TemplateRef<any>>;
  contentProjections: TemplateRef<any>[] = [];

  // Get content for header and footer
  get headerContent(): string | number | null {
    return this.isPrimitive(this.header) ? this.header as string | number : null;
  }

  get footerContent(): string | number | null {
    return this.isPrimitive(this.footer) ? this.footer as string | number : null;
  }

  ngAfterContentInit(): void {
    // Get all template projections between dividers
    if (this.contentNodes) {
      this.contentProjections = this.contentNodes.toArray();
    }
  }

  /**
   * Checks if the value is a primitive (string or number)
   */
  isPrimitive(value: any): boolean {
    return typeof value === 'string' || typeof value === 'number';
  }

  /**
   * Checks if the content is a primitive
   */
  isPrimitiveContent(content: any): boolean {
    return this.isPrimitive(content);
  }
} 