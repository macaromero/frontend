import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user:any = {
    nombre: "",
    apellido: "",
    tipo_documento: "",
    num_documento: 0,
    fecha_nacimiento: 0,
    celular: 0,
    email:""
  };

  avatar:any;

  constructor(private service: BaseService, private router: Router) { 
    this.service.get(`${environment.url}/user`).subscribe((res:any) => {
      this.user = res.mensaje[0]
    })
  }

  editProfile() {
    this.router.navigate([`../user-update/${this.user.id_usuario}`])
  }

  ngOnInit(): void {
  }

}
