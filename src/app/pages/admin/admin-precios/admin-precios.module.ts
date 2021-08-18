import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPreciosRoutingModule } from './admin-precios-routing.module';
import { AdminPreciosComponent } from './admin-precios.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdatePrecioComponent } from './update-precio/update-precio.component';


@NgModule({
  declarations: [
    AdminPreciosComponent,
    UpdatePrecioComponent
  ],
  imports: [
    CommonModule,
    AdminPreciosRoutingModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminPreciosModule { }
