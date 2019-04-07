import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NgSortgridModule} from '../../../ng-sortgrid/src/lib/ng-sortgrid.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgSortgridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
