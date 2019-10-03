import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StepComponent} from './step/step.component';
import {HeaderComponent} from './header/header.component';
import {NavComponent} from './nav/nav.component';
import {CardComponent} from './card/card.component';

@NgModule({
  declarations: [StepComponent, HeaderComponent, NavComponent, CardComponent],
  exports: [StepComponent, HeaderComponent, NavComponent, CardComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
