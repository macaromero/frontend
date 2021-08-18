import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-precio',
  templateUrl: './update-precio.component.html',
  styleUrls: ['./update-precio.component.css']
})
export class UpdatePrecioComponent implements OnInit {

  @Input()
  precio: any;

  constructor(private service:BaseService, public fb:FormBuilder) { }

  id:any;
  precios:any = [];
  frecuencias: string [] = ["Diaria", "Mensual"]
  modalidades: any [] = [{id_modalidad: 1, modalidad: "Presencial"}, {id_modalidad: 2, modalidad: "Virtual"}]
  selectedFreq = this.frecuencias[0]
  selectedType = this.modalidades[0];
  trigger: boolean = false;
  deleteTrigger: boolean = false;
  

  priceForm = this.fb.group({
    precio: []
  });

  modifyType (event: Event) {
    this.selectedType = (event.target as HTMLSelectElement).value;   
    for (let index = 0; index < this.modalidades.length; index++) {
      if (this.modalidades[index].modalidad == this.selectedType) {
        this.precio.modalidad = this.selectedType
        this.precio.id_modalidad = this.modalidades[index].id_modalidad
      }
    }
  }
  
  modifyFreq (event: Event) {
    this.selectedFreq = (event.target as HTMLSelectElement).value;
    for (let i = 0; i < this.frecuencias.length; i++) {
      if (this.frecuencias[i] == this.selectedFreq) {
        this.precio.frecuencia = this.frecuencias[i]
      }
    }
  }

  deletePrice(precio:any) {
    this.service.get(`${environment.url}/admin-precios/delete/${this.id}`).subscribe((res:any) => {
      if (res.mensaje.affectedRows == 1) {
        for (let i = 0; i < this.precios.length; i++) {
          if (this.precios[i].id_precio == precio.id_precio) {
            this.precios.splice(i, 1)
            this.trigger = true
          }
        }
      }
    })
  }

  update() {
    const obj = {
      id_modalidad : this.precio.id_modalidad,
      frecuencia: this.precio.frecuencia,
      precio: this.priceForm.get('precio')?.value
    }
    this.service.put(`${environment.url}/admin-precios/modify`, obj, this.id).subscribe((res:any) => {
      if (res.mensaje.affectedRows != 0) {
        this.trigger = true
      }
    })
  }

  getPrecios() {
    this.priceForm.get('precio')?.setValue(this.precio.precio)
    this.service.get(`${environment.url}/admin-precios`).subscribe((res:any) => {
      this.precios = res.mensaje
    })
  }

  getFrecuencias() {
    for (let i = 0; i < this.modalidades.length; i++) {
      if (this.precio.id_modalidad == this.modalidades[i].id_modalidad) {
        const actual = this.modalidades[i]
        this.modalidades.splice(i, 1)
        this.modalidades.unshift(actual)
      }
    }
  }

  getModalidades() {
    for (let i = 0; i < this.frecuencias.length; i++) {
      if (this.precio.frecuencia == this.frecuencias[i]) {
        const actual = this.frecuencias[i]
        this.frecuencias.splice(i, 1)
        this.frecuencias.unshift(actual)
      }
    }  
  }

  ngOnInit(): void {
    this.id = this.precio.id_precio
    this.getPrecios()
    this.getFrecuencias()
    this.getModalidades()
  }

}