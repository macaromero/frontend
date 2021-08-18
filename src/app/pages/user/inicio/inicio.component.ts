import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  nombre: any;
  id_user: any;
  constructor(private router:Router) {
    this.nombre = localStorage.getItem('nombre')
    this.id_user = localStorage.getItem('id_user')
   }
  

  clases() {
    this.router.navigate(["/user-inscripciones"])
  };

  horarios() {
    this.router.navigate(["/horarios"])
  };

  precios() {
    this.router.navigate(["/precios"])
  };

  profile() {
    this.router.navigate([`../user/${this.id_user}`])
  };

  ngOnInit(): void {
  }

}
