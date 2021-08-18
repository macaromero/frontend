import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-class',
  templateUrl: './update-class.component.html',
  styleUrls: ['./update-class.component.css']
})
export class UpdateClassComponent implements OnInit {

  constructor(private service:BaseService, public fb:FormBuilder) { }

  @Input()
  clase:any = null;

  id:any;
  clases:any = [];
  horarios: any = [];
  modalidades: any [] = [{id_modalidad: 1, modalidad: "Presencial"}, {id_modalidad: 2, modalidad: "Virtual"}]
  selectedDate = this.horarios[0]
  selectedType = this.modalidades[0];
  trigger: boolean = false;
  

  linkForm = this.fb.group({
    link: []
  });
  
  modifyDate (event: Event) {
    this.selectedDate = (event.target as HTMLSelectElement).value;
    for (let i = 0; i < this.horarios.length; i++) {
      if (this.horarios[i].id_horario == this.selectedDate) {
        for (let index = 0; index < this.clases.length; index++) {
          this.clases[index].id_horario = this.horarios[i].id_horario
          this.clases[index].id_hora = this.horarios[i].id_hora
          this.clases[index].dia = this.horarios[i].dia
          this.clases[index].hora_inicio = this.horarios[i].hora_inicio
          this.clases[index].hora_fin = this.horarios[i].hora_fin
          this.clase = this.clases[index]
        }
      }
    }
  }

  modifyType (event: Event) {
    this.selectedType = (event.target as HTMLSelectElement).value;   
    for (let index = 0; index < this.modalidades.length; index++) {
      if (this.modalidades[index].modalidad == this.selectedType) {
        this.clase.modalidad = this.selectedType
        this.clase.id_modalidad = this.modalidades[index].id_modalidad
      }
    }
    for (let i = 0; i < this.clases.length; i++) {
      if (this.clases[i].id_clase == this.clase.id_clase) {
        this.clases[i].modalidad = this.clase.modalidad
        this.clases[i].id_modalidad = this.clase.id_modalidad
      }
    }
  }

  deleteClass(clase:any) {
    const id = clase.id_clase
    this.service.get(`${environment.url}/admin-clases/delete/${id}`).subscribe((res:any) => {
      console.log(res)
      if (res.mensaje.affectedRows == 1) {
        for (let i = 0; i < this.clases.length; i++) {
          if (this.clases[i].id_clase == clase.id_clase) {
            this.clases.splice(i, 1)
            this.trigger = true
          }
        }
      }
    })
  }

  update() {
    const obj = {
      id_modalidad : this.clase.id_modalidad,
      id_horario: this.clase.id_horario,
      link: this.linkForm.get('link')?.value
    }
    this.service.put(`${environment.url}/admin-clases/modify`, obj, this.id).subscribe((res:any) => {
      if (res.mensaje.affectedRows != 0) {
        this.trigger = true
      }
    })
  }

  getClases() {
    this.linkForm.get('link')?.setValue(this.clase.link)
    this.service.get(`${environment.url}/admin-clases`).subscribe((res:any) => {
      this.clases = res.mensaje
    })
  }

  getHorarios() {
    this.service.get(`${environment.url}/admin-horarios`).subscribe((res:any) => {
      this.horarios = res.mensaje;
      for (let index = 0; index < this.horarios.length; index++) {
        if (this.horarios[index].id_horario == this.clase.id_horario) {
          const actual = this.horarios[index]
          this.horarios.splice(index, 1)
          this.horarios.unshift(actual) 
        }
      }     
    })
  }

  getModalidades() {
    for (let i = 0; i < this.modalidades.length; i++) {
      if (this.clase.id_modalidad == this.modalidades[i].id_modalidad) {
        const actual = this.modalidades[i]
        this.modalidades.splice(i, 1)
        this.modalidades.unshift(actual)
      }
    } 
  }

  ngOnInit(): void {
    this.id = this.clase.id_clase
    this.getClases()
    this.getHorarios()
    this.getModalidades()
  }

}
