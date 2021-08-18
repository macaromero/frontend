import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  user: any;
  form!: FormGroup;
  previewUrl:any;
  selectedFile!:File;
  isLoaded!: boolean;
  modify: boolean = true;
  hide = true;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  formUpdateUser = this.fb.group ({
    nombre: new FormControl("", Validators.pattern(/(^[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+){2,})(\s[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+){2,})?$/)),
    apellido: new FormControl("", Validators.pattern(/(^[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+){2,})(\s[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+){2,})?$/)),
    tipo_documento: new FormControl(),
    num_documento: new FormControl("", [Validators.minLength(6), Validators.maxLength(9)]),
    fecha_nacimiento: new FormControl(),
    celular: new FormControl("", Validators.pattern(/((\+54)?[ -]*(9))?[ -]*([0-9]){10}/)),
    password: new FormControl()
  });

  selectedValue!: string;
  tipos: string[] = [ "DNI", "Pasaporte"];

  constructor(private service: BaseService, public fb: FormBuilder, private router:Router){
    this.service.get(`${environment.url}/user`).subscribe((res:any) => {
      this.user = res.mensaje[0]
      this.getUser()
    })
  }

  getUser() {
    this.formUpdateUser.get('nombre')?.setValue(this.user.nombre)
    this.formUpdateUser.get('apellido')?.setValue(this.user.apellido)
    this.formUpdateUser.get('tipo_documento')?.setValue(this.user.tipo_documento)
    this.formUpdateUser.get('num_documento')?.setValue(this.user.num_documento)
    this.formUpdateUser.get('fecha_nacimiento')?.setValue(this.user.fecha_nacimiento)
    this.formUpdateUser.get('celular')?.setValue(this.user.celular)
  }


  submit() {
    let {nombre, apellido, tipo_documento, num_documento, fecha_nacimiento, celular, password} = this.formUpdateUser.value
    const value: any = {nombre, apellido, tipo_documento, num_documento, fecha_nacimiento, celular, password}
    if (this.formUpdateUser.get('nombre')?.value == null) {
      delete value.nombre
    } 
    if (this.formUpdateUser.get('apellido')?.value == null) {
      delete value.apellido
    } 
    if (this.formUpdateUser.get('tipo_documento')?.value == null) {
      delete value.tipo_documento
    } 
    if (this.formUpdateUser.get('num_documento')?.value == null) {
      delete value.num_documento
    } 
    if (this.formUpdateUser.get('fecha_nacimiento')?.value == null) {
      delete value.fecha_nacimiento
    } 
    if (this.formUpdateUser.get('celular')?.value == null) {
      delete value.celular
    } 
    if (this.formUpdateUser.get('password')?.value == null) {
      delete value.password
    }

    this.service.put(`${environment.url}/user/modify`, value, this.user.id_usuario).subscribe((res:any) => {
      console.log(res)
      if (res.mensaje.affectedRows == 1) {
              this.modify = false;
      };
    });
  };

  viewProfile() {
    this.router.navigate([`../user/${this.user.id_usuario}`])
  }

  ngOnInit(): void {
    
  }

}
