import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminInscripcionesComponent } from './admin-inscripciones.component';
import { AdminInscripcionesRoutingModule } from './admin-inscripciones-routing.module';


@NgModule({
  declarations: [
    AdminInscripcionesComponent
  ],
  imports: [
    CommonModule,
    AdminInscripcionesRoutingModule
  ]
})
export class AdminInscripcionesModule { }
