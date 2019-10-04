import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingComponent } from './scrolling.component';
import {ScrollingRoutingModule} from './scrolling.routing.module';
import {SharedModule} from '../shared/shared.module';
import {NgsgModule} from '../../../../ng-sortgrid/src/lib/ngsg.module';

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
