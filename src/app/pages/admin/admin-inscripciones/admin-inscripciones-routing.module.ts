import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminInscripcionesComponent } from './admin-inscripciones.component';

const routes: Routes = [
  {path:"", component:AdminInscripcionesComponent,
//    children: [{path:":id", component:UpdatePrecioComponent}]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminInscripcionesRoutingModule { }