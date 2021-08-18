import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-precio',
  templateUrl: './create-precio.component.html',
  styleUrls: ['./create-precio.component.css']
})
export class CreatePrecioComponent implements OnInit {

  constructor(private service:BaseService, private router:Router, public fb:FormBuilder) { }

  precio = {
    id_modalidad: 0,
    frecuencia: "",
    precio: 0
  };

  frecuencias: string [] = ["Diaria", "Mensual"];
  modalidades: any [] = [{id_modalidad: 1, modalidad: "Presencial"}, {id_modalidad: 2, modalidad: "Virtual"}]
  selectedFreq = this.frecuencias[0]
  selectedType = this.modalidades[0];
  trigger: boolean = false;
  panelOpenState = false;
  

  priceForm = this.fb.group({
    precio: []
  });

  selectType (event: Event) {
    this.selectedType = (event.target as HTMLSelectElement).value;
    this.precio.id_modalidad = this.selectedType   
  }

  selectFreq(event:Event) {
    this.selectedFreq = (event.target as HTMLSelectElement).value
    this.precio.frecuencia = this.selectedFreq
  }

  create() {
    const obj = {
      id_modalidad : this.precio.id_modalidad,
      frecuencia: this.precio.frecuencia,
      precio: this.priceForm.get('precio')?.value
    }
    this.service.post(`${environment.url}/admin-precios/new`, obj).subscribe((res:any) => {
      if (res.mensaje.affectedRows != 0) {
        this.trigger = true
      }
    })
  }

  viewPrices () {
    this.router.navigate([`/admin-precios`])
  }

  ngOnInit(): void {
  }

}
