import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { CartQuantityService } from 'src/app/services/cart-quantity.service';
import { CompCommunicationService } from 'src/app/services/comp-communication.service';
import { PricesService } from 'src/app/services/prices.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  cart: any;
  precioTotal: number = 0;
  id_orden: any;
  id_orden_detalle: any [] = [];
  triggerError: boolean = false;
  triggerErrorBis: boolean = false;
  completed: boolean = false;
  completedA: boolean = false;
  disabled: boolean = false;
  disabledA: boolean = false;
  id_clase: any = [];
  precioPresencial: any = [];
  precioVirtual: any = [];
  freq: string [] = ["Diaria", "Mensual"];

  constructor(private communicationService:CompCommunicationService, private service: BaseService, private router:Router, private pricesService:PricesService, private cartQuantityService: CartQuantityService) { 
  }

  selectedFreq = this.freq[0]

  modifyFrequency (event: Event, item:any) {
    this.selectedFreq = (event.target as HTMLSelectElement).value;
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].id_clase == item.id_clase) {
        this.cartItems[i].frecuencia = this.selectedFreq
        if (this.selectedFreq == "Mensual" && this.cartItems[i].modalidad == "Presencial") {
          this.cartItems[i].precio = this.precioPresencial[1].precio
          this.cartItems[i].id_precio = this.precioPresencial[1].id_precio
          this.precioTotal += this.cartItems[i].precio - this.precioPresencial[0].precio;
        } else if (this.selectedFreq == "Mensual" && this.cartItems[i].modalidad == "Virtual") {
          this.cartItems[i].precio = this.precioVirtual[1].precio
          this.cartItems[i].id_precio = this.precioVirtual[1].id_precio
          this.precioTotal += this.cartItems[i].precio - this.precioVirtual[0].precio;
        } else if (this.selectedFreq == "Diaria" && this.cartItems[i].modalidad == "Presencial") {
          this.cartItems[i].precio = this.precioPresencial[0].precio
          this.cartItems[i].id_precio = this.precioPresencial[0].id_precio
          this.precioTotal += this.cartItems[i].precio - this.precioPresencial[1].precio;
        } else if (this.selectedFreq == "Diaria" && this.cartItems[i].modalidad == "Virtual") {
          this.cartItems[i].precio = this.precioVirtual[0].precio
          this.cartItems[i].id_precio = this.precioVirtual[0].id_precio
          this.precioTotal += this.cartItems[i].precio - this.precioVirtual[1].precio;
        }
      }
    }
  }

  removeItem (item: any) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].id_clase == item.id_clase) {
        this.precioTotal = this.precioTotal - this.cartItems[i].precio
        this.cartItems.splice(i, 1)
        break
      }
    }

    if (this.precioTotal == 0) {
      this.cartItems = [];
      this.cart = {carrito:this.cartItems, cantidadItems: this.cartItems.length}
      this.communicationService.setData(this.cart);
      this.router.navigate([`/horarios`])
    }
  }

  emptyCart () {
    this.cartItems = []
    this.precioTotal = 0
    this.cart = {carrito:this.cartItems, cantidadItems: this.cartItems.length}
    this.communicationService.setData(this.cart);
    this.router.navigate([`/horarios`])
  }

  checkout () {
    this.service.post(`${environment.url}/user-ordenes/new`, this.cartItems).subscribe((res:any) => {
      if (res.mensaje.affectedRows == 1) {
        this.completed = true
        this.disabled = true
        this.id_orden = res.id_orden
        this.id_orden_detalle = res.orden_detalle
        localStorage.setItem("id_orden", this.id_orden);
        localStorage.setItem("id_orden_detalle", JSON.stringify(this.id_orden_detalle))
        this.router.navigate([`/user-cart/${this.id_orden}`])
      } else {
        this.triggerError = true;
        this.emptyCart ();
      }
    })
    
  }

  creationError () {
    this.router.navigate([`/horarios`])
  }

  payment () {
    this.service.get(`${environment.url}/user-ordenes/enable/${this.id_orden}`).subscribe((res:any) => {
      console.log(res)
      if (res.mensaje.changedRows == 1) {
        this.disabledA = true;
        this.completedA = true;
        this.cartItems = []
        this.precioTotal = 0
        this.cart = {carrito:this.cartItems, cantidadItems: this.cartItems.length}
        this.communicationService.setData(this.cart);
      } else {
        this.triggerErrorBis = true
      }
    })
};

getCart() {
  this.communicationService.dataPreview.subscribe(res => {
    const local: any = localStorage.getItem("cart")
    if (res != null) {
      this.cartItems = res.carrito;
      this.cart = {carrito: this.cartItems, cantidadItems: this.cartItems.length}
      this.cartQuantityService.setQuantity(this.cartItems.length)
    } else if (JSON.parse(local) != null) {
      this.cartItems = JSON.parse(local)
      this.cart = {carrito: this.cartItems, cantidadItems: this.cartItems.length}
      this.cartQuantityService.setQuantity(this.cartItems.length)
    }
    this.cartItems.map((a:any) => {
      this.precioTotal += a.precio
    })      
  })
}

getPrices() {
  this.pricesService.pricesPreview.subscribe(prices => {
    this.precioPresencial = prices[0]
    this.precioVirtual = prices[1];
  })
}


  ngOnInit(): void {
    this.getCart()
    this.getPrices()
  }

}
