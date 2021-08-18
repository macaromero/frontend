import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css']
})
export class PreciosComponent implements OnInit {

  constructor(private service:BaseService) {}
  precios: any = [];
  precios_presencial: any = [];
  precios_virtual: any = [];

  getPrices() {
    this.service.get(`${environment.url}/precios`).subscribe(res=>{
      this.precios = res;
      this.precios = this.precios.mensaje;
      for (let i = 0; i < this.precios.length; i++) {
        if (this.precios[i].id_modalidad == 1) {
          this.precios_presencial.push(this.precios[i])
        } else if (this.precios[i].id_modalidad == 2) {
          this.precios_virtual.push(this.precios[i])
        }
      };
    });
  }

  ngOnInit(): void {
    this.getPrices()
  }

}
