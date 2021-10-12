import { NgModule } from '@angular/core';

import { NgsgItemDirective } from './ngsg-item.directive';
import { NgsgDragHandleDirective } from './ngsg-drag-handle.directive';

@NgModule({
  declarations: [NgsgItemDirective, NgsgDragHandleDirective],
  exports: [NgsgItemDirective, NgsgDragHandleDirective]
})
export class NgsgModule {}
