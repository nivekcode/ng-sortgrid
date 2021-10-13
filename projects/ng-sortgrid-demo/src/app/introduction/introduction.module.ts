import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {NgsgModule} from '../../../../ng-sortgrid/src/lib/ngsg.module';
import {SharedModule} from '../shared/shared.module';

import {AsyncPipeMemoryComponent} from './examples/async-pipe/async-pipe-memory.component';
import { DragHandleComponent } from './examples/drag-handle/drag-handle.component';
import {GettingStartedMemoryComponent} from './examples/getting-started/getting-started-memory.component';
import {GroupsMemoryComponent} from './examples/groups/groups-memory.component';
import {ReactOnChangesMemoryComponent} from './examples/react-on-changes/react-on-changes-memory.component';
import {IntroductionComponent} from './introduction.component';
import {IntroductionRoutingModule} from './introduction.routing.module';

@NgModule({
  declarations: [
    IntroductionComponent,
    GettingStartedMemoryComponent,
    ReactOnChangesMemoryComponent,
    GroupsMemoryComponent,
    AsyncPipeMemoryComponent,
    DragHandleComponent
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
