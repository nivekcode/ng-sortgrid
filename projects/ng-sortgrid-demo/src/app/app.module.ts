import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgsgModule } from '../../../ng-sortgrid/src/lib/ngsg.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgsgModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
