import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgsgModule } from '../../../ng-sortgrid/src/lib/ngsg.module';
import {NavComponent} from './nav/nav.component';
import {HeaderComponent} from './header/header.component';
import {MemoryComponent} from './examples/memory.component';

@NgModule({
  declarations: [AppComponent, NavComponent, HeaderComponent, MemoryComponent],
  imports: [BrowserModule, NgsgModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
