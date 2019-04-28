import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgsgModule} from '../../../ng-sortgrid/src/lib/ngsg.module';
import {NavComponent} from './nav/nav.component';
import {HeaderComponent} from './header/header.component';
import {GettingStartedMemoryComponent} from './examples/getting-started/getting-started-memory.component';
import {StepComponent} from './examples/step/step.component';
import {ReactOnChangesMemoryComponent} from './examples/react-on-changes/react-on-changes-memory.component';
import {GroupsMemoryComponent} from './examples/groups/groups-memory.component';
import {CardComponent} from './examples/card/card.component';
import {AsyncPipeMemoryComponent} from './examples/async-pipe/async-pipe-memory.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    GettingStartedMemoryComponent,
    StepComponent,
    ReactOnChangesMemoryComponent,
    GroupsMemoryComponent,
    CardComponent,
    AsyncPipeMemoryComponent
  ],
  imports: [BrowserModule, NgsgModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
