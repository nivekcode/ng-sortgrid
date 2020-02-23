import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', loadChildren: () => import('./introduction/introduction.module').then(m => m.IntroductionModule)},
    {path: 'scrolling', loadChildren: () => import('./scrolling/scrolling.module').then(m => m.ScrollingModule)}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
