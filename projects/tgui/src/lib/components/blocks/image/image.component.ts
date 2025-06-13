import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy, 
  HostBinding,
  ElementRef,
  ContentChild,
  TemplateRef,
  signal,
  computed,
  inject,
  OnInit,
  input
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ImageSize = 20 | 24 | 28 | 40 | 48 | 96;

/**
 * Renders an image with optional fallback content. It supports custom sizing and will automatically
 * handle loading states and errors by optionally displaying a fallback icon. This component can also
 * include additional content, such as badges or overlays, as children.
 */

// [decoding]="decoding"
// [loading]="loading"
// [referrerPolicy]="referrerPolicy"
// [sizes]="sizes"
// [srcset]="srcSet"
// [useMap]="useMap"
@Component({
  selector: 'tgui-image',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="image-container">
      <img
        *ngIf="hasSrc()"
        [src]="srcUrl()"
        [attr.alt]="altText()"
        class="image"
        [attr.crossOrigin]="crossOrigin()"
        [attr.decoding]="decoding()"
        [attr.loading]="loading()"
        [attr.referrerPolicy]="referrerPolicy()"
        [attr.sizes]="sizes()"
        [attr.srcset]="srcSet()"
        [class.loaded]="loaded()"
        (load)="handleImageLoad($event)"
        (error)="handleImageError($event)"
      />
      <div *ngIf="shouldShowFallbackIcon()" class="fallback">
        <ng-container *ngTemplateOutlet="fallbackIconTemplate || null"></ng-container>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      position: relative;
      display: inline-flex;
      background-color: var(--tgui--tertiary_bg_color);
      box-shadow: 0 0 0 1px var(--tgui--outline);
    }

    .image-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border-radius: inherit;
    }

    .image {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.5;
      transition: opacity 0.2s ease-in-out;
      border-radius: inherit;
    }

    .image.loaded {
      opacity: 1;
    }

    .fallback {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent implements OnInit {
  /** Specifies the size of the image, with a default of 40. Sizes are defined in pixels. */
  size = input<ImageSize>(40);
  
  /** An element (often an icon) displayed when the image fails to load or the `src` attribute is not provided. */
  @ContentChild('fallbackIcon') fallbackIconTemplate?: TemplateRef<any>;
  
  /** Image source URL */
  src = input<string | undefined>(undefined);
  
  /** Alternative text for the image */
  alt = input<string | undefined>(undefined);
  
  /** Cross-origin setting */
  crossOrigin = input<string | undefined>(undefined);
  
  /** Image decoding hint */
  decoding = input<'sync' | 'async' | 'auto' | undefined>(undefined);
  
  /** Loading strategy */
  loading = input<'eager' | 'lazy' | undefined>(undefined);
  
  /** Referrer policy */
  referrerPolicy = input<string | undefined>(undefined);
  
  /** Sizes attribute */
  sizes = input<string | undefined>(undefined);
  
  /** Source set attribute */
  srcSet = input<string | undefined>(undefined);
  
  /** Image map reference */
  useMap = input<string | undefined>(undefined);

  /** State to track if image has loaded */
  loaded = signal(false);
  
  /** State to track if image failed to load */
  failed = signal(false);

  /** Computed source URL that always returns a string */
  srcUrl = computed(() => this.src() || '');

  /** Computed alt text that always returns a string */
  altText = computed(() => this.alt() || '');

  /** Check if source is provided */
  hasSrc = computed(() => !!this.src() || !!this.srcSet());

  /** Determine if fallback icon should be shown */
  shouldShowFallbackIcon = computed(() => (this.failed() || !this.hasSrc()) && !!this.fallbackIconTemplate);

  /** Handle image load event */
  handleImageLoad(event: Event): void {
    if (this.loaded()) {
      return;
    }

    this.loaded.set(true);
    this.failed.set(false);
  }

  /** Handle image error event */
  handleImageError(event: Event): void {
    this.loaded.set(false);
    this.failed.set(true);
  }

  /** Apply size and border radius to host element */
  ngOnInit(): void {
    this.width = this.size();
    this.minWidth = this.size();
    this.height = this.size();
    this.borderRadius = this.getBorderRadius(this.size());
  }

  @HostBinding('style.width.px') width!: number;
  @HostBinding('style.minWidth.px') minWidth!: number;
  @HostBinding('style.height.px') height!: number;
  @HostBinding('style.borderRadius.px') borderRadius!: number;

  /** Calculate border radius based on image size */
  public getBorderRadius(size: number): number {
    if (size < 40) {
      return 4;
    }

    if (size < 96) {
      return 8;
    }

    return 12;
  }
} 