import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  constructor(private router: Router) { }

  authState = new BehaviorSubject(false);

  authenticateAdmin (token: string, nombre: string, id_admin: any) {
    this.authState.next(true);
    localStorage.setItem("token", token);
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("id_admin", id_admin);
  };

  isAdminAuthenticated () {
    return this.authState.value
  };

  logOutAdmin () {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    localStorage.removeItem("id_admin");
    this.authState.next(false)
  }
}

