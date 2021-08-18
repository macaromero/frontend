import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminInscripcionesModule } from 'src/app/pages/admin/admin-inscripciones/admin-inscripciones.module';
import { AdminProfileModule } from 'src/app/pages/admin/admin-profile/admin-profile.module';
import { AppComponent } from './app.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdminClasesModule } from './pages/admin/admin-clases/admin-clases.module';
import { AdminHomeModule } from './pages/admin/admin-home/admin-home.module';
import { AdminPreciosModule } from './pages/admin/admin-precios/admin-precios.module';
import { CreateClassComponent } from './pages/admin/create-class/create-class.component';
import { CreatePrecioComponent } from './pages/admin/create-precio/create-precio.component';
import { HomeModule } from './pages/home/home.module';
import { HorariosModule } from './pages/horarios/horarios.module';
import { LoginAdminModule } from './pages/login-admin/login-admin.module';
import { LoginModule } from './pages/login/login.module';
import { PreciosModule } from './pages/precios/precios.module';
import { RegistroModule } from './pages/registro/registro.module';
import { CartModule } from './pages/user/cart/cart.module';
import { InicioModule } from './pages/user/inicio/inicio.module';
import { InscripcionesModule } from './pages/user/inscripciones/inscripciones.module';
import { UpdateUserModule } from './pages/user/update-user/update-user.module';
import { UserProfileModule } from './pages/user/user-profile/user-profile.module';

const routes: Routes = [
  {path: "", loadChildren: ()=> import ('src/app/pages/home/home.module').then(m=>HomeModule)},
  {path:"home", redirectTo:"/"},
  {path:"precios", loadChildren: ()=> import ('src/app/pages/precios/precios.module').then(m=>PreciosModule)},
  {path:"horarios", loadChildren: ()=> import ('src/app/pages/horarios/horarios.module').then(m=>HorariosModule)},
  {path:"registro", loadChildren: ()=> import ('src/app/pages/registro/registro.module').then(m=>RegistroModule)},
  {path:"login", loadChildren: ()=> import ('src/app/pages/login/login.module').then(m=>LoginModule)},
  {path:"user-home", loadChildren: ()=> import ('src/app/pages/user/inicio/inicio.module').then(m=>InicioModule), canActivate:[AuthGuard]},
  {path:"user-inscripciones", loadChildren: ()=> import ('src/app/pages/user/inscripciones/inscripciones.module').then(m=>InscripcionesModule), canActivate:[AuthGuard]},
  {path:"user-cart", loadChildren: ()=> import ('src/app/pages/user/cart/cart.module').then(m=>CartModule), canActivate:[AuthGuard]},
  {path:"user-update/:id", loadChildren: ()=> import ('src/app/pages/user/update-user/update-user.module').then(m=>UpdateUserModule), canActivate:[AuthGuard]},
  {path:"user/:id", loadChildren: ()=> import ('src/app/pages/user/user-profile/user-profile.module').then(m=>UserProfileModule), canActivate:[AuthGuard]},
  {path:"admin-login", loadChildren: ()=> import ('src/app/pages/login-admin/login-admin.module').then(m=>LoginAdminModule)},
  {path:"admin-home", loadChildren: ()=> import ('src/app/pages/admin/admin-home/admin-home.module').then(m=>AdminHomeModule), canActivate:[AdminAuthGuard]},
  {path:"admin-clases", loadChildren: ()=> import ('src/app/pages/admin/admin-clases/admin-clases.module').then(m=>AdminClasesModule),
   canActivate:[AdminAuthGuard]
  },
  {path:"admin-create-class", component: CreateClassComponent,
 canActivate:[AdminAuthGuard]
  },
  {path:"admin-precios", loadChildren: ()=> import ('src/app/pages/admin/admin-precios/admin-precios.module').then(m=>AdminPreciosModule
  ),
   canActivate:[AdminAuthGuard]
  },
  {path:"admin-create-price", component: CreatePrecioComponent,
   canActivate:[AdminAuthGuard]
    },
  {path:"admin-inscripciones", loadChildren: ()=> import ('src/app/pages/admin/admin-inscripciones/admin-inscripciones.module').then(m=>AdminInscripcionesModule
    ),
     canActivate:[AdminAuthGuard]
    },
  {path:"admin-profile", loadChildren: ()=> import ('src/app/pages/admin/admin-profile/admin-profile.module').then(m=>AdminProfileModule
    ),
     canActivate:[AdminAuthGuard]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
