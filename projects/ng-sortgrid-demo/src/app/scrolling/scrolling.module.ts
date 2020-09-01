import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {NgsgModule} from '../../../../ng-sortgrid/src/lib/ngsg.module';
import {SharedModule} from '../shared/shared.module';

import { ScrollingComponent } from './scrolling.component';
import {ScrollingRoutingModule} from './scrolling.routing.module';

@NgModule({
  declarations: [ScrollingComponent],
  imports: [
    CommonModule,
    SharedModule,
    ScrollingRoutingModule,
    NgsgModule
  ]
})
export class ScrollingModule { }
