import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  nombre: any;
  id_admin: any;
  constructor(private service:BaseService, private router:Router) {
    this.nombre = localStorage.getItem('nombre')
    this.id_admin = localStorage.getItem('id_admin')
   }
  

  clases() {
    this.router.navigate(["/admin-clases"])
  };
  
  inscriptos() {
    this.router.navigate(["/admin-inscripciones"])
  };

  precios() {
    this.router.navigate(["/admin-precios"])
  };

  profile() {
    this.router.navigate([`/admin-profile`])
  };

  ngOnInit(): void {
  }

}
