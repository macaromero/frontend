import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminClasesRoutingModule } from './admin-clases-routing.module';
import { AdminClasesComponent } from './admin-clases.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UpdateClassComponent } from './update-class/update-class.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminClasesComponent,
    UpdateClassComponent
  ],
  imports: [
    CommonModule,
    AdminClasesRoutingModule,
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
export class AdminClasesModule { }
