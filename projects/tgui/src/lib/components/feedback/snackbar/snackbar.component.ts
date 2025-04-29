import { Component, Input, signal, OnInit, OnDestroy, inject, ChangeDetectionStrategy, TemplateRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootPortalComponent } from '../../utils/portal/root-portal.component';
import { CaptionComponent } from '../../typography/caption/caption.component';
import { PlatformService } from '../../../services';

@Component({
  selector: 'tgui-snackbar',
  standalone: true,
  imports: [CommonModule, RootPortalComponent, CaptionComponent],
  template: `
    <tgui-root-portal>
      <div 
        class="tgui-snackbar-wrapper"
        [class.tgui-snackbar-wrapper--ios]="isIOS()"
        [class.tgui-snackbar-wrapper--closing]="closing()">
        <div class="tgui-snackbar-body">
          <div *ngIf="beforeTemplate" class="tgui-snackbar-before">
            <ng-container *ngTemplateOutlet="beforeTemplate"></ng-container>
          </div>
          <div class="tgui-snackbar-middle">
            <tgui-caption weight="2" *ngIf="hasMainContent">
              <ng-content></ng-content>
            </tgui-caption>
            <tgui-caption *ngIf="description">
                {{ description }}
            </tgui-caption>
            <tgui-caption *ngIf="linkTemplate">
              <ng-container *ngTemplateOutlet="linkTemplate"></ng-container>
            </tgui-caption>
          </div>
          <div *ngIf="afterTemplate" class="tgui-snackbar-after">
            <ng-container *ngTemplateOutlet="afterTemplate"></ng-container>
          </div>
        </div>
      </div>
    </tgui-root-portal>
  `,
  styleUrls: ['./snackbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnackbarComponent implements OnInit, OnDestroy {

  @ContentChild('before') beforeTemplate?: TemplateRef<any>;
  @ContentChild('after') afterTemplate?: TemplateRef<any>;
  @ContentChild('link') linkTemplate?: TemplateRef<any>;

  @Input() description?: string;
  @Input() duration = 4000;
  @Input() onClose!: () => void;
  
  private readonly TRANSITION_FINISH_DURATION = 320;
  private closeTimeout?: any;
  
  closing = signal(false);
  hasMainContent = true;
  
  private platformService = inject(PlatformService);
  
  isIOS = this.platformService.isIOS;
  
  ngOnInit(): void {
    console.log('ngOnInit',this.beforeTemplate, this.afterTemplate, this.description, this.linkTemplate);
    this.startCloseTimer();
  }
  
  startCloseTimer(): void {
    if (this.duration > 0) {
      this.closeTimeout = setTimeout(() => {
        this.close();
      }, this.duration);
    }
  }
  
  close(): void {
    this.closing.set(true);
    setTimeout(() => {
      if (this.onClose) {
        this.onClose();
      }
    }, this.TRANSITION_FINISH_DURATION);
  }
  
  ngOnDestroy(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }
  }
} 