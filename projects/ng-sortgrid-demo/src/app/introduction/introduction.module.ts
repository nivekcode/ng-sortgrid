import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IntroductionComponent} from './introduction.component';
import {GettingStartedMemoryComponent} from './examples/getting-started/getting-started-memory.component';
import {ReactOnChangesMemoryComponent} from './examples/react-on-changes/react-on-changes-memory.component';
import {GroupsMemoryComponent} from './examples/groups/groups-memory.component';
import {AsyncPipeMemoryComponent} from './examples/async-pipe/async-pipe-memory.component';
import {IntroductionRoutingModule} from './introduction.routing.module';
import {NgsgModule} from '../../../../ng-sortgrid/src/lib/ngsg.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    IntroductionComponent,
    GettingStartedMemoryComponent,
    ReactOnChangesMemoryComponent,
    GroupsMemoryComponent,
    AsyncPipeMemoryComponent
  ],
  imports: [
    CommonModule,
    IntroductionRoutingModule,
    NgsgModule,
    SharedModule
  ]
})
export class IntroductionModule {
}
