import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})
export class CreateClassComponent implements OnInit {

  constructor(private service:BaseService, private router:Router, public fb:FormBuilder) { }

  clase = {
    id_horario: 0,
    dia: "",
    id_hora: 0,
    hora_inicio: null,
    hora_fin: null,
    id_modalidad: 0,
    modalidad: "",
    link: ""
  };

  horarioNuevo = {
    id_hora: 0,
    hora_inicio: null,
    hora_fin: null,
    dia: ""
  }

  horarios: any = [];
  modalidades: any [] = [{id_modalidad: 1, modalidad: "Presencial"}, {id_modalidad: 2, modalidad: "Virtual"}]
  selectedType = this.modalidades[0];
  trigger: boolean = false;
  panelOpenState = false;
  dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]
  selectedDay = this.dias[0]
  horas: any = [];
  selectedTime = this.horas[0]
  errorTime: boolean = false
  createdTime: boolean = false
  

  linkForm = this.fb.group({
    link: []
  });

  timeForm = this.fb.group({
    hora_inicio: [],
    hora_fin: []
  });

  createTime() {
    this.service.post(`${environment.url}/admin-horarios/horas/new`, this.timeForm.value).subscribe((res:any) => {
      console.log(res)
      if (res.mensaje.index == 0) {
        this.errorTime = true
      } else if (res.mensaje.affectedRows != 0) {
        this.getHoras()
        this.createdTime = true
        this.errorTime = false
      }
    })
  }
  
  selectTime (event: Event) {
    this.selectedTime = (event.target as HTMLSelectElement).value;
    this.clase.id_hora = this.selectedTime
    for (let i = 0; i < this.horas.length; i++) {
      if (this.horas[i].id_hora == this.clase.id_hora) {
        this.clase.hora_inicio = this.horas[i].hora_inicio
        this.clase.hora_fin = this.horas[i].hora_fin
      }
    }
  }

  selectDay(event:Event) {
    this.selectedDay = (event.target as HTMLSelectElement).value
    this.clase.dia = this.selectedDay
  }

  selectType (event: Event) {
    this.selectedType = (event.target as HTMLSelectElement).value;
    this.clase.id_modalidad = this.selectedType   
  }

  create() {
    const horarioObj = {
      id_hora: this.clase.id_hora,
      hora_inicio: this.clase.hora_inicio,
      hora_fin: this.clase.hora_fin,
      dia: this.clase.dia
    }
    let id_horario;
    this.service.post(`${environment.url}/admin-horarios/new`, horarioObj).subscribe((res:any) => {
      if (res.mensaje.affectedRows != 0) {
        id_horario = res.mensaje.insertId

        const obj = {
          id_modalidad : this.clase.id_modalidad,
          id_horario: id_horario,
          link: this.linkForm.get('link')?.value
        }
    
        this.service.post(`${environment.url}/admin-clases/new`, obj).subscribe((resp:any) => {
          console.log(resp)
          if (resp.mensaje.affectedRows != 0) {
            this.trigger = true
          }
        })
      }
    })
    
  }

  viewClasses () {
    this.router.navigate([`/admin-clases`])
  }

  getHorarios() {
    this.service.get(`${environment.url}/admin-horarios`).subscribe((res:any) => {
      this.horarios = res.mensaje;
      this.clase.id_horario = this.horarios[0].id_horario
      this.clase.dia = this.horarios[0].dia
      this.clase.id_modalidad = this.modalidades[0].id_modalidad
    })
  }

  getHoras() {
    this.service.get(`${environment.url}/admin-horarios/horas`).subscribe((res:any) => {
      this.horas = res.mensaje
      this.horas.sort()
      this.clase.id_hora = this.horas[0].id_hora
      this.clase.hora_inicio = this.horas[0].hora_inicio
      this.clase.hora_fin = this.horas[0].hora_fin
    })
  }

  ngOnInit(): void {
    this.getHorarios() 
    this.getHoras()
  }

}
