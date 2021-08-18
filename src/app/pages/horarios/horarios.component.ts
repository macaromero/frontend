import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BaseService } from 'src/app/services/base.service';
import { CompCommunicationService } from 'src/app/services/comp-communication.service';
import { PricesService } from 'src/app/services/prices.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  number: number = 0;
  cartItems: any[] = [];
  id_orden: number = 0;
  precioPresencial: any = [];
  precioVirtual: any = [];
  cart: any;

  constructor(private service:BaseService, public authService:AuthService, private router:Router, private communicationService:CompCommunicationService, private pricesService:PricesService) { }
  clases: any = []
  lunes: any = [];
  martes: any = [];
  miercoles: any = [];
  jueves: any = [];
  viernes: any = [];

  inscribir(item:any) {
    if (this.authService.isAuthenticated() === false) {
      this.router.navigate(["/login"])
    } else {
      
      let classExists = false;

      for (let i in this.cartItems) {
        if (this.cartItems[i].id_clase === item.id_clase) {
          // this.cartItems[i].cantidad++
          classExists = true
          break
        }
      }

      if (!classExists) {
        this.cartItems.push({id_clase: item.id_clase, dia: item.dia, hora_inicio: item.hora_inicio, hora_fin: item.hora_fin, modalidad: item.modalidad, frecuencia: "Diaria", precio: 1, id_precio:1})
      }
      
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].modalidad == 'Presencial') {
          this.cartItems[i].precio = this.precioPresencial[0].precio;
          this.cartItems[i].id_precio = this.precioPresencial[0].id_precio
        } else if (this.cartItems[i].modalidad == 'Virtual') {
          this.cartItems[i].precio = this.precioVirtual[0].precio;
          this.cartItems[i].id_precio = this.precioVirtual[0].id_precio
        }
      }
      this.cart = {carrito:this.cartItems, cantidadItems: this.cartItems.length}
      localStorage.setItem("cart", JSON.stringify(this.cartItems))
      this.communicationService.setData(this.cart);      
    }
   
  }

  getClases() {
    this.service.get(`${environment.url}/clases`).subscribe(res => {
      this.clases = res;
      this.clases = this.clases.mensaje;
      for (let i = 0; i < this.clases.length; i++) {
          if (this.clases[i].dia == 'Lunes') {
            this.lunes.push(this.clases[i])
          } else if (this.clases[i].dia == 'Martes') {
            this.martes.push(this.clases[i])
          } else if (this.clases[i].dia == 'Miércoles') {
            this.miercoles.push(this.clases[i])
          } else if (this.clases[i].dia == 'Jueves') {
            this.jueves.push(this.clases[i])
          } else if (this.clases[i].dia == 'Viernes'){
            this.viernes.push(this.clases[i])
          }
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
 
    });
  }

  getPrecios() {
    this.service.get(`${environment.url}/precios`).subscribe((prices:any)=>{
      for (let i = 0; i < prices.mensaje.length; i++) {
        if (prices.mensaje[i].id_modalidad == 1) {
          this.precioPresencial.push({id_precio:prices.mensaje[i].id_precio, precio:prices.mensaje[i].precio})
        } else if (prices.mensaje[i].id_modalidad == 2) {
          this.precioVirtual.push({id_precio:prices.mensaje[i].id_precio, precio:prices.mensaje[i].precio})
        }
      }
      this.pricesService.setPrices([this.precioPresencial, this.precioVirtual])
    });
  }
  ngOnInit(): void {
    this.getClases()
    this.getPrecios()

    this.communicationService.dataPreview.subscribe(res => {
    });

    this.pricesService.pricesPreview.subscribe(prices => {
    })

  }
}
