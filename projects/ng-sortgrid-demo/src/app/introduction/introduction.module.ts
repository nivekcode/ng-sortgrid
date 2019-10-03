import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IntroductionComponent} from './introduction.component';
import {NavComponent} from '../shared/nav/nav.component';
import {HeaderComponent} from '../shared/header/header.component';
import {GettingStartedMemoryComponent} from './examples/getting-started/getting-started-memory.component';
import {StepComponent} from '../shared/step/step.component';
import {ReactOnChangesMemoryComponent} from './examples/react-on-changes/react-on-changes-memory.component';
import {GroupsMemoryComponent} from './examples/groups/groups-memory.component';
import {CardComponent} from './examples/card/card.component';
import {AsyncPipeMemoryComponent} from './examples/async-pipe/async-pipe-memory.component';
import {IntroductionRoutingModule} from './introduction.routing.module';
import {NgsgModule} from '../../../../ng-sortgrid/src/lib/ngsg.module';

@NgModule({
  declarations: [
    IntroductionComponent,
    NavComponent,
    HeaderComponent,
    GettingStartedMemoryComponent,
    StepComponent,
    ReactOnChangesMemoryComponent,
    GroupsMemoryComponent,
    CardComponent,
    AsyncPipeMemoryComponent
  ],
  imports: [
    CommonModule,
    IntroductionRoutingModule,
    NgsgModule
  ]
})
export class IntroductionModule {
}
