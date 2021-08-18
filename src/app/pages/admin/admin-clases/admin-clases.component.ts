import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-clases',
  templateUrl: './admin-clases.component.html',
  styleUrls: ['./admin-clases.component.css']
})
export class AdminClasesComponent implements OnInit {

  constructor(private service:BaseService, private router:Router) { }
  clases: any = []
  single: boolean = false
  clase: any;

  create() {
    this.router.navigate([`/admin-create-class`])
  }

  editClass(clase:any) {
    this.single = true
    this.clase = clase
    const id = clase.id_clase
    this.router.navigate([`/admin-clases/${id}`])
  }

  deleteClass(clase:any) {
    const id = clase.id_clase
    this.service.get(`${environment.url}/admin-clases/delete/${id}`).subscribe((res:any) => {
      if (res.mensaje.affectedRows == 1) {
        for (let i = 0; i < this.clases.length; i++) {
          if (this.clases[i].id_clase == clase.id_clase) {
            this.clases.splice(i, 1)
          }
        }
      }
    })
  }

  getClases() {
    this.service.get(`${environment.url}/admin-clases`).subscribe((res:any) => {
      this.clases = res.mensaje
    })
  }

  ngOnInit(): void {
    this.getClases()
  }

}
