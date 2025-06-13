import { 
    Component, 
    ViewEncapsulation, 
    ChangeDetectionStrategy, 
    Input, 
    HostBinding, 
    OnInit,
    ElementRef, 
    ContentChild, 
    TemplateRef,
    HostListener,
    inject,
    input
  } from '@angular/core';
  import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../feedback';
import { TappableComponent } from '../../utils';
import { PlatformService } from '../../../services/platform.service';
import { TguiDynamicIconComponent } from '../../../icons/dynamic-icon.component';
import { TextComponent, SubheadlineComponent } from '../../typography';
  // import { PlatformService } from '@services/platform.service';
  // import { SpinnerComponent } from '@feedback/spinner/spinner.component';
  // import { TappableComponent } from '@utils/tappable/tappable.component';
  
  /**
   * The Button component provides a customizable button with various styles and states.
   * Supports different sizes, display modes, loading state, etc.
   */
  @Component({
    selector: 'tgui-button',
    standalone: true,
    imports: [
      CommonModule,
      SpinnerComponent,
      TappableComponent,
      TguiDynamicIconComponent,
      TextComponent,
      SubheadlineComponent,
    ],
    template: `
      <tgui-tappable 
        [interactiveAnimation]="interactiveAnimation()" 
        [readonly]="loading()"
        [disabled]="disabled()"
        class="button-tappable"
      >
        <!-- Spinner is absolutely positioned over the content -->
        <div *ngIf="loading()" class="spinner">
          <tgui-spinner style="color: var(--tgui--button--spinner-color)" size="s"></tgui-spinner>
        </div>
  
        <!-- Button content in wrapper for correct positioning -->
        <div class="button-content-wrapper">
          <ng-content select="[tguiButtonBefore]"></ng-content>
          <div *ngIf="beforeTemplate" class="before">
            <ng-container *ngTemplateOutlet="beforeTemplate"></ng-container>
          </div>
          <div class="before" *ngIf="icon() as icon">
            <tgui-dynamic-icon [icon]="icon"></tgui-dynamic-icon>
          </div>
  
          <!-- Template for button content -->
          <ng-template #buttonContent>
            <ng-content></ng-content>
          </ng-template>

          <div class="content">
              <tgui-text *ngIf="size() === 'l'"  weight="2">
                <ng-container *ngTemplateOutlet="buttonContent"></ng-container>
              </tgui-text>
              <tgui-subheadline *ngIf="size() === 'm' || size() === 's'" level="2" weight="2">
                <ng-container *ngTemplateOutlet="buttonContent"></ng-container>
              </tgui-subheadline>
          </div>
  
          <ng-content select="[tguiButtonAfter]"></ng-content>
          <div *ngIf="afterTemplate" class="after">
            <ng-container *ngTemplateOutlet="afterTemplate"></ng-container>
          </div>
        </div>
      </tgui-tappable>
    `,
    host: {
      'attr.data-refresh-platform': 'true'
    },
    styles: [`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 8px;
        text-decoration: none;
        box-sizing: border-box;
        max-inline-size: 100%;
        min-inline-size: 80px;
        position: relative;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation; /* Optimization for mobile devices */
      }
  
      :host.stretched {
        inline-size: 100%;
        flex-grow: 1;
      }
  
      :host::after {
        content: '';
        position: absolute;
        inset: 0;
        opacity: 0;
        transition: opacity .15s ease-out;
        background: var(--tgui--bg_color);
        border-radius: inherit;
        pointer-events: none;

      }
  
      .button-tappable {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: inherit;
      }
  
      /* Wrapper for all button content */
      .button-content-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--tgui--button--gap);
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        padding: var(--tgui--button--padding, 0);
        box-sizing: border-box;
        user-select: none;
        -webkit-user-select: none;
      }
  
      .before,
      .after {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 1;
        user-select: none;
        -webkit-user-select: none;
      }
  
      .content {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        z-index: var(--tgui--z-index--simple);
        position: relative; /* To be above ripple */
        user-select: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none; /* Prevents context menu on iOS with long press */
      }
  
      .spinner {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: auto;
        background: inherit;
        border-radius: inherit;
        color: var(--tgui--button--spinner-color);
        z-index: 2; /* Raised above content */
        --tgui--spinner-color: var(--tgui--button--spinner-color);
      }
  
      /* Size Variants */
      :host.size-s {
        height: 36px;
        min-width: 34px;
        border-radius: 20px;
        --tgui--button--padding: 8px 12px;
        --tgui--button--gap: 6px;
      }
  
      :host.size-m {
        height: 42px;
        min-width: 42px;
        border-radius: 8px;
        --tgui--button--padding: 8px 14px;
        --tgui--button--gap: 8px;
      }
  
      :host.size-l {
        height: 50px;
        --tgui--button--padding: 10px 20px;
        --tgui--button--gap: 10px;
      }
  
      /* Mode Variants */
      :host.mode-filled {
        --tgui--button--hovered-opacity: .15;
        --tgui--button--spinner-color: var(--tgui--button_text_color);
        --tgui--ripple-color: rgba(255, 255, 255, 0.5);
        color: var(--tgui--button_text_color);
        background: var(--tgui--button_color);
      }
  
      :host.mode-bezeled {
        --tgui--button--hovered-opacity: .07;
        --tgui--button--spinner-color: var(--tgui--link_color);
        --tgui--ripple-color: rgba(0, 120, 255, 0.5);
        color: var(--tgui--link_color);
        background: var(--tgui--secondary_fill);
      }
  
      :host.mode-plain {
        --tgui--button--hovered-opacity: .03;
        --tgui--button--spinner-color: var(--tgui--plain_foreground);
        --tgui--ripple-color: rgba(0, 120, 255, 0.5);
        color: var(--tgui--link_color);
        background: transparent;
      }
  
      :host.mode-gray {
        --tgui--button--hovered-opacity: .5;
        --tgui--button--spinner-color: var(--tgui--plain_foreground);
        --tgui--ripple-color: rgba(0, 0, 0, 0.4);
        color: var(--tgui--plain_foreground);
        background: var(--tgui--plain_background);
      }
  
      :host.mode-outline {
        --tgui--button--hovered-opacity: .5;
        --tgui--button--spinner-color: var(--tgui--plain_foreground);
        --tgui--ripple-color: rgba(0, 0, 0, 0.3);
        color: var(--tgui--plain_foreground);
        background: inherit;
        box-shadow: 0 0 0 1px var(--tgui--outline);
      }
  
      :host.mode-white {
        --tgui--button--hovered-opacity: .5;
        --tgui--button--spinner-color: var(--tgui--surface_dark);
        --tgui--ripple-color: rgba(0, 0, 0, 0.3);
        background: var(--tgui--white);
        color: var(--tgui--black);
      }
  
      /* Platform Specific */
      :host-context(.tgui-platform-ios) :host.size-m {
        border-radius: 12px;
      }
  
      :host-context(.tgui-platform-ios) :host::after {
        content: unset;
      }
  
      /* Loading State */
      :host.loading .before,
      :host.loading .after,
      :host.loading .content {
        opacity: 0;
      }
  
      /* Disabled State */
      :host.disabled {
        opacity: 0.6;
        cursor: default;
        pointer-events: none;
      }
  
      /* Hover Effects */
      @media (hover: hover) and (pointer: fine) {
        :host:hover::after {
          opacity: var(--tgui--button--hovered-opacity);
        }
      }
  
      /* Button Typography Sizing */
      :host.size-l .content {
        font-size: var(--tgui--text--font_size);
        line-height: var(--tgui--text--line_height);
        font-weight: var(--tgui--font_weight--accent2);
      }
  
      :host.size-m .content,
      :host.size-s .content {
        font-size: var(--tgui--subheadline2--font_size);
        line-height: var(--tgui--subheadline2--line_height);
        font-weight: var(--tgui--font_weight--accent2);
      }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class ButtonComponent implements OnInit {
    /**
     * Button size ('s', 'm', 'l')
     */
    size = input<'s' | 'm' | 'l'>('m');
  
    /**
     * Visual style of the button
     */
    mode = input<'filled' | 'bezeled' | 'plain' | 'gray' | 'outline' | 'white'>('filled');
  
    /**
     * If true, the button will stretch to the width of its container
     */
    stretched = input<boolean>(false);
  
    /**
     * If true, shows a loading indicator instead of button content
     */
    loading = input<boolean>(false);
  
    /**
     * If true, the button will be disabled
     */
    disabled = input<boolean>(false);
  
    /**
     * Button type (for HTML type attribute)
     */
    type = input<'button' | 'submit' | 'reset'>('button');
  
    /**
     * Type of interactive animation ('opacity' | 'background')
     */
    interactiveAnimation = input<'opacity' | 'background'>('background');

    /**
     * Icon name to be displayed before the content
     */
    icon = input<string | undefined>(undefined);
  
    /**
     * Template for content before the main button text
     */
    @ContentChild('beforeContent') beforeTemplate?: TemplateRef<any>;
  
    /**
     * Template for content after the main button text
     */
    @ContentChild('afterContent') afterTemplate?: TemplateRef<any>;
  
    @HostBinding('class.size-s') get isSizeS() { return this.size() === 's'; }
    @HostBinding('class.size-m') get isSizeM() { return this.size() === 'm'; }
    @HostBinding('class.size-l') get isSizeL() { return this.size() === 'l'; }
  
    @HostBinding('class.mode-filled') get isModeFilled() { return this.mode() === 'filled'; }
    @HostBinding('class.mode-bezeled') get isModeBezeled() { return this.mode() === 'bezeled'; }
    @HostBinding('class.mode-plain') get isModePlain() { return this.mode() === 'plain'; }
    @HostBinding('class.mode-gray') get isModeGray() { return this.mode() === 'gray'; }
    @HostBinding('class.mode-outline') get isModeOutline() { return this.mode() === 'outline'; }
    @HostBinding('class.mode-white') get isModeWhite() { return this.mode() === 'white'; }
  
    @HostBinding('class.stretched') get isStretched() { return this.stretched(); }
    @HostBinding('class.loading') get isLoading() { return this.loading(); }
    @HostBinding('class.disabled') get isDisabled() { return this.disabled(); }
  
    @HostBinding('attr.type') get buttonType() { return this.type(); }
    @HostBinding('attr.disabled') get buttonDisabled() { return this.disabled() ? true : null; }
    
    private platformService = inject(PlatformService);
    private elementRef = inject(ElementRef);
  
    @HostListener('selectstart', ['$event'])
    onSelectStart(event: Event): boolean {
      // Prevent text selection
      event.preventDefault();
      return false;
    }
  
    ngOnInit(): void {      
      // Transform component into a real button for better accessibility
      this.transformToButton();
    }
    
    /**
     * Transforms the host element into a real HTML button for better accessibility and semantics
     */
    private transformToButton(): void {
      const element = this.elementRef.nativeElement;
      
      // Add attributes to improve accessibility
      if (!element.hasAttribute('role')) {
        element.setAttribute('role', 'button');
      }
      
      if (!element.hasAttribute('tabindex') && !this.disabled()) {
        element.setAttribute('tabindex', '0');
      }
      
      // Add CSS to prevent text selection (for older browsers)
      element.style.webkitUserSelect = 'none';
      element.style.userSelect = 'none';
      
      // Add keyboard event handlers for accessibility
      element.addEventListener('keydown', (event: KeyboardEvent) => {
        if ((event.key === 'Enter' || event.key === ' ') && !this.disabled()) {
          event.preventDefault();
          element.click();
        }
      });
      
      // Additional listener to prevent text selection
      element.addEventListener('selectstart', (event: Event) => {
        event.preventDefault();
        return false;
      });
    }
  } 