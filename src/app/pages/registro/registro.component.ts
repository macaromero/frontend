import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {

  form!: FormGroup;
  previewUrl:any;
  selectedFile!:File;
  registro: boolean = true;
  hide = true;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  formObject = {
    nombre: new FormControl("", [Validators.required, Validators.pattern(/(^[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+){2,})(\s[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+){2,})?$/)]),
    apellido: new FormControl("", [Validators.required, Validators.pattern(/(^[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+){2,})(\s[A-ZÁÉÍÓÚ]{1}([a-zñáéíóú]+){2,})?$/)]),
    tipo_documento: new FormControl(),
    num_documento: new FormControl("", [Validators.minLength(6), Validators.maxLength(9)]),
    fecha_nacimiento: new FormControl("", Validators.required),
    celular: new FormControl("", [Validators.required, Validators.pattern(/((\+54)?[ -]*(9))?[ -]*([0-9]){10}/)]),
    avatar: new FormControl(),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  };

  selectedValue!: string;
  tipos: string[] = [ "DNI", "Pasaporte"];
  message: string = "El archivo que intenta subir no es válido";
  action: string = "Cerrar";

  constructor(private service: BaseService, private _snackBar: MatSnackBar){}

  openSnackBar(message: string, action:string) {
    this._snackBar.open(message, action)
  };

  onFileSelected(event:any) {
    const reader = new FileReader();
    const files = event.target.files;
    if (files[0].type.startsWith("image") == false) {
      this.openSnackBar(this.message, this.action)
    } else {
      if (files && files.length) {
        this.selectedFile = files[0];
        reader.onload = () => {
          this.previewUrl = reader.result;
        };
        reader.readAsDataURL(this.selectedFile);
      };
    };
  };

  submit() {
    const fd = new FormData();
    const {nombre, apellido, tipo_documento, num_documento, fecha_nacimiento, celular, email, password} = this.form.value;
    fd.append("nombre", nombre);
    fd.append("apellido", apellido);
    fd.append("tipo_documento", tipo_documento);
    fd.append("num_documento", num_documento);
    fd.append("fecha_nacimiento", fecha_nacimiento);
    fd.append("celular", celular);
    fd.append("email", email);
    fd.append("password", password);
    fd.append("avatar", this.selectedFile, this.selectedFile.name);
    this.service.post(`${environment.url}/registro`, fd).subscribe((res:any) => {
      if (res.mensaje.affectedRows == 1) {
              this.registro = false;
      };
    });
  };

  ngOnInit(): void {
    this.form = new FormGroup(this.formObject);
  }
};
