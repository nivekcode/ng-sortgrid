import {NgModule} from '@angular/core';
import {NgSortgridComponent} from './ng-sortgrid.component';
import {NgSortgridItemDirective} from './ng-sortgrid-item.directive';

@NgModule({
  declarations: [NgSortgridComponent, NgSortgridItemDirective],
  imports: [],
  exports: [NgSortgridComponent, NgSortgridItemDirective]
})
export class NgSortgridModule {
}
