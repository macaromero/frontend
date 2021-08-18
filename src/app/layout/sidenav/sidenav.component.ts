import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CompCommunicationService } from 'src/app/services/comp-communication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  showFiller = false;
  nombre: any;
  number: any;
  numberCart: number = 0;
  cartItems: any [] = [];
  id_user: any;
  id_admin: any;
  

  constructor(private router:Router, public authService:AuthService, private communicationService:CompCommunicationService, public adminAuthService:AuthAdminService) { 
    this.nombre = localStorage.getItem('nombre');
    this.id_user = localStorage.getItem('id_user')
    this.id_admin = localStorage.getItem('id_admin')
  }

  cart() {
    if(this.number >= 1) {
      this.router.navigate([`/user-cart`])
      this.number = null;
    } else {
      this.router.navigate([`/horarios`])
    }
  }

  userUpdate(){
    this.router.navigate([`/user-update/${this.id_user}`])
  }

  userProfile() {
    this.router.navigate([`/user/${this.id_user}`])
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['/'])
  };

  adminProfile() {
    this.router.navigate([`/admin-profile`])
  }

  adminLogOut() {
    this.adminAuthService.logOutAdmin();
    this.router.navigate(['/'])
  }

  getCart() {
    this.communicationService.dataPreview.subscribe(res => {
      this.number = res.cantidadItems
      this.cartItems = res.carrito
    })
  }

  ngOnInit(): void {
    this.getCart()
  }
}
