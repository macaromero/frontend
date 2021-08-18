import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginAdminRoutingModule } from './login-admin-routing.module';
import { LoginAdminComponent } from './login-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    LoginAdminComponent
  ],
  imports: [
    CommonModule,
    LoginAdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class LoginAdminModule { }
