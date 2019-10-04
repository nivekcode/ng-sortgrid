import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', loadChildren: './introduction/introduction.module#IntroductionModule'},
    {path: 'scrolling', loadChildren: './scrolling/scrolling.module#ScrollingModule'}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
