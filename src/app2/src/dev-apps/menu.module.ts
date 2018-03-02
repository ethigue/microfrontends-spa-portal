import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [
    MenuComponent
  ],
  bootstrap: [
    MenuComponent
  ],
  imports: [
    BrowserModule
  ]
})
export class MenuModule {}