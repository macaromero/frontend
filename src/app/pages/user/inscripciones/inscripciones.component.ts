import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {

  constructor(private service:BaseService, public authService:AuthService) { }
  clases: any = []
  lunes: any = [];
  martes: any = [];
  miercoles: any = [];
  jueves: any = [];
  viernes: any = [];
  dias: any = {lunes:[], martes:[], miercoles:[], jueves:[], viernes:[]};

  getInscripciones() {
    this.service.get(`${environment.url}/user-ordenes`).subscribe((res:any) => {
      this.clases = res.mensaje;
      for (let i = 0; i < this.clases.length; i++) {
          if (this.clases[i].dia == 'Lunes') {
            this.lunes.push(this.clases[i])
            for (let index = 1; index < this.lunes.length; index++) {
              if (this.lunes[index].id_clase == this.lunes[index-1].id_clase) {
                this.lunes.splice(index, 1)
              }
            }
          } else if (this.clases[i].dia == 'Martes') {
            this.martes.push(this.clases[i])
            for (let index = 1; index < this.martes.length; index++) {
              if (this.martes[index].id_clase == this.martes[index-1].id_clase) {
                this.martes.splice(index, 1)
              }
            }
          } else if (this.clases[i].dia == 'Miércoles') {
            this.miercoles.push(this.clases[i])
            for (let index = 1; index < this.miercoles.length; index++) {
              if (this.miercoles[index].id_clase == this.miercoles[index-1].id_clase) {
                this.miercoles.splice(index, 1)
              }
            }
          } else if (this.clases[i].dia == 'Jueves') {
            this.jueves.push(this.clases[i])
            for (let index = 1; index < this.jueves.length; index++) {
              if (this.jueves[index].id_clase == this.jueves[index-1].id_clase) {
                this.jueves.splice(index, 1)
              }
            }
          } else if (this.clases[i].dia == 'Viernes') {
            this.viernes.push(this.clases[i])
            for (let index = 1; index < this.viernes.length; index++) {
              if (this.viernes[index].id_clase == this.viernes[index-1].id_clase) {
                this.viernes.splice(index, 1)
              }
            }
          };
      };

      this.lunes.sort((a:any, b:any) => {
        let ha = a.hora_inicio.toString()
        let hb = b.hora_inicio.toString()

        if (ha < hb) {
          return -1
        }
        if (ha > hb) {
          return 1
        }
        return 0
      })
      this.martes.sort((a:any, b:any) => {
        let ha = a.hora_inicio.toString()
        let hb = b.hora_inicio.toString()

        if (ha < hb) {
          return -1
        }
        if (ha > hb) {
          return 1
        }
        return 0
      })
      this.miercoles.sort((a:any, b:any) => {
        let ha = a.hora_inicio.toString()
        let hb = b.hora_inicio.toString()

        if (ha < hb) {
          return -1
        }
        if (ha > hb) {
          return 1
        }
        return 0
      })
      this.jueves.sort((a:any, b:any) => {
        let ha = a.hora_inicio.toString()
        let hb = b.hora_inicio.toString()

        if (ha < hb) {
          return -1
        }
        if (ha > hb) {
          return 1
        }
        return 0
      })
      this.viernes.sort((a:any, b:any) => {
        let ha = a.hora_inicio.toString()
        let hb = b.hora_inicio.toString()

        if (ha < hb) {
          return -1
        }
        if (ha > hb) {
          return 1
        }
        return 0
      })
      
      this.dias.lunes = this.lunes;
      this.dias.martes = this.martes;
      this.dias.miercoles = this.miercoles;
      this.dias.jueves = this.jueves;
      this.dias.viernes = this.viernes; 
    });
  }

  ngOnInit(): void {
    this.getInscripciones()
  }

}
