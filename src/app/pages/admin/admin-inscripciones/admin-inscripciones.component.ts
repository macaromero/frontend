import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-inscripciones',
  templateUrl: './admin-inscripciones.component.html',
  styleUrls: ['./admin-inscripciones.component.css']
})
export class AdminInscripcionesComponent implements OnInit {

  constructor(private service:BaseService) { }
  inscripciones: any = [];
  usuarios: any = []
  clases: any = []

  findDuplicate() {
    let hashTableInsc: any = []
    let duplicatesInsc: any = []
    let inscFinal: any = []

    for (let index = 0; index < this.inscripciones.length; index++) {
      if (hashTableInsc[this.inscripciones[index].id_clase] === undefined) {
        hashTableInsc[this.inscripciones[index].id_clase.toString()] = true
        inscFinal.push({id_clase: this.inscripciones[index].id_clase, dia: this.inscripciones[index].dia, hora_inicio: this.inscripciones[index].hora_inicio, hora_fin:  this.inscripciones[index].hora_fin, modalidad: this.inscripciones[index].modalidad})
      } else {
        duplicatesInsc.push(this.inscripciones[index].id_clase)
      }
    }
    inscFinal.sort((a:any, b:any) => {
      let ca = a.dia
      let cb = b.dia

      if (ca < cb) {
        return -1
      }
      if (ca > cb) {
        return 1
      }
      return 0
    })
    this.clases = inscFinal
  }

  getInscripciones() {
    this.service.get(`${environment.url}/admin-ordenes`).subscribe((res:any) => {
      this.inscripciones = res.mensaje
      for (let i = 0; i < this.inscripciones.length; i++) {
        this.usuarios.push({nombre:this.inscripciones[i].nombre, apellido: this.inscripciones[i].apellido, id: this.inscripciones[i].id_usuario, id_clase: this.inscripciones[i].id_clase})
      }   
      this.findDuplicate()
    })
  }

  ngOnInit(): void {
    this.getInscripciones()
  }

}