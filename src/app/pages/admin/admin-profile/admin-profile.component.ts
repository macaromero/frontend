import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  admin:any = {
    nombre: "",
    apellido: "",
    email:""
  };

  trigger = false;

  constructor(private service: BaseService, private router: Router) { 
    this.service.get(`${environment.url}/admin`).subscribe((res:any) => {
      this.admin = res.mensaje[0]
    })
  }

  editProfile() {
    this.trigger = true
    this.router.navigate([`admin-profile/update/${this.admin.id_administrador}`])
  }

  ngOnInit(): void {
  }

}

