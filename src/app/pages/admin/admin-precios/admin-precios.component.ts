import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-precios',
  templateUrl: './admin-precios.component.html',
  styleUrls: ['./admin-precios.component.css']
})
export class AdminPreciosComponent implements OnInit {

  constructor(private service:BaseService, private router:Router) { }
  precios: any = []
  single: boolean = false
  precio: any;

  create() {
    this.router.navigate([`/admin-create-price`])
  }

  editPrice(precio:any) {
    this.single = true
    this.precio = precio
    const id = precio.id_precio
    this.router.navigate([`/admin-precios/${id}`])
  }

  deletePrice(precio:any) {
    const id = precio.id_precio
    this.service.get(`${environment.url}/admin-precios/delete/${id}`).subscribe((res:any) => {
      if (res.mensaje.affectedRows == 1) {
        for (let i = 0; i < this.precios.length; i++) {
          if (this.precios[i].id_precio == id) {
            this.precios.splice(i, 1)
          }
        }
      }
    })
  }

  getPrecios() {
    this.service.get(`${environment.url}/admin-precios`).subscribe((res:any) => {
      this.precios = res.mensaje
    })
  }

  ngOnInit(): void {
    this.getPrecios()
  }
}