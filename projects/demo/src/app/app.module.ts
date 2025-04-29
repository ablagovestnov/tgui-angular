import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Импортируем необходимые компоненты из TGUI
import { RootComponent } from '../../../tgui/src/lib/components/utils/tgui-root/tgui-root.component';
import { ButtonComponent } from '../../../tgui/src/lib/components/blocks/button/button.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    // TGUI компоненты
    RootComponent,
    ButtonComponent
  ],
  declarations: [],
  providers: [],
  bootstrap: []
})
export class AppModule { } 