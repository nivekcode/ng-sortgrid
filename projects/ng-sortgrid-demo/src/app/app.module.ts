import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgsgModule} from '../../../ng-sortgrid/src/lib/ngsg.module';
import {NavComponent} from './nav/nav.component';
import {HeaderComponent} from './header/header.component';
import {StepComponent} from './examples/step.component';
import {GettingStartedMemoryComponent} from './examples/getting-started-memory.component';

@NgModule({
  declarations: [AppComponent, NavComponent, HeaderComponent, GettingStartedMemoryComponent, StepComponent],
  imports: [BrowserModule, NgsgModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
