import { Injectable, inject, TemplateRef, createComponent, ApplicationRef, EnvironmentInjector } from '@angular/core';
import { SnackbarComponent } from './snackbar.component';

export interface SnackbarOptions {
  beforeTemplate?: TemplateRef<any>;
  afterTemplate?: TemplateRef<any>;
  description?: string;
  linkTemplate?: TemplateRef<any>;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private activeSnackbars: any[] = [];
  
  show(message: string, options: SnackbarOptions = {}): void {
    // Создаем компонент программно
    const snackbarRef = createComponent(SnackbarComponent, {
      environmentInjector: this.injector,
      projectableNodes: [[document.createTextNode(message)]]
    });
    
    // Настраиваем свойства
    const instance = snackbarRef.instance;
    instance.beforeTemplate = options.beforeTemplate;
    instance.afterTemplate = options.afterTemplate;
    instance.description = options.description;
    instance.linkTemplate = options.linkTemplate;
    instance.duration = options.duration ?? 4000;
    instance.onClose = () => this.close(snackbarRef);
    
    // Добавляем в DOM и в отслеживаемые
    this.appRef.attachView(snackbarRef.hostView);
    this.activeSnackbars.push(snackbarRef);
  }
  
  private close(snackbarRef: any): void {
    const index = this.activeSnackbars.indexOf(snackbarRef);
    if (index !== -1) {
      this.activeSnackbars.splice(index, 1);
      this.appRef.detachView(snackbarRef.hostView);
      snackbarRef.destroy();
    }
  }
  
  closeAll(): void {
    for (const snackbar of this.activeSnackbars) {
      snackbar.instance.close();
    }
  }
} 