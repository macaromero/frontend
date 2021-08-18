import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreciosComponent } from './precios.component';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { PreciosRoutingModule } from './precios-routing.module';



@NgModule({
  declarations: [
    PreciosComponent
  ],
  imports: [
    CommonModule,
    PreciosRoutingModule,
    RouterModule,
    MatTableModule
  ]
})
export class PreciosModule { }
