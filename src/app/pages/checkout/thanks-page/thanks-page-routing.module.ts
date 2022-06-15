import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThanksPageComponent } from './thanks-page.component';

const routes: Routes = [{ path: '', component: ThanksPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThanksPageRoutingModule { }
