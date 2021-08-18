import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProfileComponent } from './admin-profile.component';
import { UpdateAdminProfileComponent } from './update-admin-profile/update-admin-profile.component';

const routes: Routes = [
  {path:"", component:AdminProfileComponent, children: [{path:"update/:id", component:UpdateAdminProfileComponent}]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProfileRoutingModule { }
