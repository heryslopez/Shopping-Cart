import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThanksPageRoutingModule } from './thanks-page-routing.module';
import { ThanksPageComponent } from './thanks-page.component';


@NgModule({
  declarations: [
    ThanksPageComponent
  ],
  imports: [
    CommonModule,
    ThanksPageRoutingModule
  ]
})
export class ThanksPageModule { }
