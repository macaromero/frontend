import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreciosComponent } from './precios.component';

const routes: Routes = [
  {path:"", component: PreciosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreciosRoutingModule { }