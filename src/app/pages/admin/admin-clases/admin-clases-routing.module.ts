import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminClasesComponent } from './admin-clases.component';
import { UpdateClassComponent } from './update-class/update-class.component';

const routes: Routes = [
  {path:"", component:AdminClasesComponent, children: [{path:":id", component:UpdateClassComponent}]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminClasesRoutingModule { }
