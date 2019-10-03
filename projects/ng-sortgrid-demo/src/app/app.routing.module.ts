import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', loadChildren: './introduction/introduction.module#IntroductionModule'}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
