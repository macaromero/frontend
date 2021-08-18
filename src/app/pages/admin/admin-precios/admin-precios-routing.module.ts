import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPreciosComponent } from './admin-precios.component';
import { UpdatePrecioComponent } from './update-precio/update-precio.component';

const routes: Routes = [
  {path:"", component:AdminPreciosComponent, children: [{path:":id", component:UpdatePrecioComponent}]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPreciosRoutingModule { }
