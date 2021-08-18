import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { PreciosModule } from './pages/precios/precios.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavModule } from './layout/sidenav/sidenav.module';
import { HorariosModule } from './pages/horarios/horarios.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroModule } from './pages/registro/registro.module';
import { LoginModule } from './pages/login/login.module';
import { TokenInterceptor } from './services/token.interceptor';
import { InicioModule } from './pages/user/inicio/inicio.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { CreateClassModule } from './pages/admin/create-class/create-class.module';
import { CreatePrecioModule } from './pages/admin/create-precio/create-precio.module';
import { FooterModule } from './layout/footer/footer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PreciosModule,
    BrowserAnimationsModule,
    SidenavModule,
    HorariosModule,
    FormsModule,
    ReactiveFormsModule,
    RegistroModule,
    LoginModule,
    InicioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    CreateClassModule,
    CreatePrecioModule,
    FooterModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
