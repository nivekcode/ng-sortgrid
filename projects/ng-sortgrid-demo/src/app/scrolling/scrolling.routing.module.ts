import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ScrollingComponent} from './scrolling.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: ScrollingComponent}
  ])]
})
export class ScrollingRoutingModule {
}
