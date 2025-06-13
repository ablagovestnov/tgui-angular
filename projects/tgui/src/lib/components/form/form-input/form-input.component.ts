import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  input,
  inject,
  signal,
  computed,
  HostListener,
  ElementRef,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformService } from '../../../services/platform.service';
import { FormInputTitleComponent } from './components/form-input-title.component';

/**
 * FormInput is a base wrapper component for form elements.
 * It provides common styling, layout, and behavior for form inputs.
 * 
 * Features:
 * - Platform-specific styling (iOS vs base)
 * - Status handling (default, error, focused)
 * - Support for content before and after the input (as string or TemplateRef)
 * - Optional header display
 * - Focus and blur handling
 */
@Component({
  selector: 'tgui-form-input',
  standalone: true,
  imports: [CommonModule, FormInputTitleComponent],
  template: `
    <div 
      class="wrapper"
      [class.platform-base]="platformService.platform() === 'base'"
      [class.platform-ios]="platformService.platform() === 'ios'"
      [class.status-default]="effectiveStatus() === 'default'"
      [class.status-error]="effectiveStatus() === 'error'"
      [class.status-focused]="effectiveStatus() === 'focused'"
      [class.disabled]="disabled()"
      [attr.aria-disabled]="disabled()"
    >
      <label
        class="body"
        [class.disabled]="disabled()"
        [attr.aria-disabled]="disabled()"
      >
        <!-- Before content -->
        <div *ngIf="hasBefore()" class="before">
          <!-- If it's a string -->
          <ng-container *ngIf="isBeforeString(); else beforeTemplateContent">
            {{ inputBefore() }}
          </ng-container>
          
          <!-- If it's a template -->
          <ng-template #beforeTemplateContent>
            <ng-container *ngIf="beforeTemplate()" [ngTemplateOutlet]="beforeTemplate()!"></ng-container>
          </ng-template>
          
          <!-- Legacy support for content projection -->
          <ng-content select="[tguiFormInputBefore]"></ng-content>
        </div>
        
        <ng-content></ng-content>
        
        <!-- After content -->
        <div *ngIf="hasAfter()" class="after">
          <!-- If it's a string -->
          <ng-container *ngIf="isAfterString(); else afterTemplateContent">
            {{ inputAfter() }}
          </ng-container>
          
          <!-- If it's a template -->
          <ng-template #afterTemplateContent>
            <ng-container *ngIf="afterTemplate()" [ngTemplateOutlet]="afterTemplate()!"></ng-container>
          </ng-template>
          
          <!-- Legacy support for content projection -->
          <ng-content select="[tguiFormInputAfter]"></ng-content>
        </div>
      </label>
      
      <tgui-form-input-title 
        *ngIf="header() && platformService.platform() === 'base'"
        class="title"
      >
        {{ header() }}
      </tgui-form-input-title>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .wrapper {
      position: relative;
      width: 100%;
    }

    .wrapper.platform-base {
      padding: 20px 22px 16px 22px;
      background: var(--tgui--bg_color);
    }

    .wrapper.platform-base .title {
      position: absolute;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      top: 6px;
      left: 32px;
      max-width: calc(100% - 32px * 2 - 22px);
      border-radius: 5px;
      padding: 0 6px;
      color: var(--tgui--secondary_hint_color);
      background: var(--tgui--bg_color);
    }

    .wrapper.disabled {
      pointer-events: none;
    }

    .wrapper.platform-ios.disabled {
      opacity: .35;
    }

    .wrapper.platform-base.disabled::after {
      content: '';
      position: absolute;
      inset: 0;
      opacity: .5;
      background: var(--tgui--bg_color);
    }

    .body {
      padding: 12px 16px;
      gap: 12px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      width: 100%;
    }

    .before,
    .after {
      display: flex;
    }

    .wrapper.platform-base .body {
      border-radius: 14px;
      box-shadow: 0 0 0 2px var(--tgui--outline);
    }

    .wrapper.platform-base.status-error .title {
      color: var(--tgui--destructive_text_color);
    }

    .wrapper.platform-base.status-error .body {
      box-shadow: 0 0 0 2px var(--tgui--destructive_text_color);
    }

    .wrapper.platform-base.status-focused .title {
      color: var(--tgui--link_color);
    }

    .wrapper.platform-base.status-focused .body {
      box-shadow: 0 0 0 2px var(--tgui--link_color);
    }

    .wrapper.platform-ios .body {
      border-radius: 12px;
      min-height: 48px;
      background: var(--tgui--bg_color);
    }

    .wrapper.platform-ios.status-error .body {
      box-shadow: 0 0 0 1.5px var(--tgui--destructive_text_color);
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInputComponent {
  // Dependency injection
  protected platformService = inject(PlatformService);
  private elementRef = inject(ElementRef);

  // Input signals
  /** Defines the visual state of the form input */
  status = input<'default' | 'error' | 'focused'>('default');
  
  /** Optional header content, displayed above the form input on base platform */
  header = input<string | null>(null);
  
  /** Content to be displayed before the form input (can be string or TemplateRef) */
  inputBefore = input<string | TemplateRef<any> | null>(null);
  
  /** Content to be displayed after the form input (can be string or TemplateRef) */
  inputAfter = input<string | TemplateRef<any> | null>(null);
  
  /** Indicates if there's content to be displayed before the form input (legacy support) */
  before = input<boolean>(false);
  
  /** Indicates if there's content to be displayed after the form input (legacy support) */
  after = input<boolean>(false);
  
  /** Indicates if the form input is disabled */
  disabled = input<boolean>(false);

  // Internal state
  private isFocused = signal(false);

  // Computed values
  /** Combines explicitly set status with internal focus state */
  effectiveStatus = computed(() => {
    // If status is explicitly set, use it
    if (this.status() !== 'default') {
      return this.status();
    }
    
    // Otherwise derive from focus state
    return this.isFocused() ? 'focused' : 'default';
  });

  /** Checks if there's content to display before the input */
  hasBefore = computed(() => this.before() || this.inputBefore() !== null);

  /** Checks if there's content to display after the input */
  hasAfter = computed(() => this.after() || this.inputAfter() !== null);

  /** Checks if the before content is a string */
  isBeforeString = computed(() => typeof this.inputBefore() === 'string');

  /** Checks if the after content is a string */
  isAfterString = computed(() => typeof this.inputAfter() === 'string');
  
  /** Returns the before content as a TemplateRef if it is one */
  beforeTemplate = computed(() => {
    const content = this.inputBefore();
    return content instanceof TemplateRef ? content : null;
  });
  
  /** Returns the after content as a TemplateRef if it is one */
  afterTemplate = computed(() => {
    const content = this.inputAfter();
    return content instanceof TemplateRef ? content : null;
  });

  // Focus event handlers
  @HostListener('focusin')
  onFocusIn(): void {
    if (!this.disabled()) {
      this.isFocused.set(true);
    }
  }

  @HostListener('focusout')
  onFocusOut(): void {
    this.isFocused.set(false);
  }
} 