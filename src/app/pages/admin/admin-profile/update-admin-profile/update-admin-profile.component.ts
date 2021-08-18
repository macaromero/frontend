import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-admin-profile',
  templateUrl: './update-admin-profile.component.html',
  styleUrls: ['./update-admin-profile.component.css']
})
export class UpdateAdminProfileComponent implements OnInit {

  @Input()
  admin!: any;

  modify: boolean = true;
  hide = true;


  updateAdminForm = this.fb.group ({
    nombre: new FormControl("", Validators.pattern(/(^[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+){2,})(\s[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+){2,})?$/)),
    apellido: new FormControl("", Validators.pattern(/(^[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+){2,})(\s[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+){2,})?$/)),
    password: new FormControl()
  });

  constructor(private service: BaseService, public fb: FormBuilder){
    
  }

  getAdmin() {
    this.updateAdminForm.get('nombre')?.setValue(this.admin.nombre)
    this.updateAdminForm.get('apellido')?.setValue(this.admin.apellido)
  }


  submit() {
    let {nombre, apellido, password} = this.updateAdminForm.value
    const value: any = {nombre, apellido, password}
    if (this.updateAdminForm.get('nombre')?.value == null) {
      delete value.nombre
    } 
    if (this.updateAdminForm.get('apellido')?.value == null) {
      delete value.apellido
    }  
    if (this.updateAdminForm.get('password')?.value == null) {
      delete value.password
    }

    this.service.put(`${environment.url}/admin/modify`, value, this.admin.id_administrador).subscribe((res:any) => {
      console.log(res)
      if (res.mensaje.affectedRows == 1) {
              this.modify = false;
      };
    });
  };
  
  ngOnInit(): void {
    this.getAdmin()
  }

}