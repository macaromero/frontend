import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorariosComponent } from './horarios.component';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { HorarioRoutingModule } from './horarios-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';




@NgModule({
  declarations: [
    HorariosComponent
  ],
  imports: [
    CommonModule,
    HorarioRoutingModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class HorariosModule { }
