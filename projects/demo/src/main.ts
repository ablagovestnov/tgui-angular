import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

// Запускаем standalone-компонент
bootstrapApplication(AppComponent)
  .catch(err => console.error(err)); 