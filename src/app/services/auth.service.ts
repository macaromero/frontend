import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  authState = new BehaviorSubject(false);

  authenticate (token: string, nombre: string, id_user: any) {
    this.authState.next(true);
    localStorage.setItem("token", token);
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("id_user", id_user);
  };

  isAuthenticated () {
    return this.authState.value
  };

  logOut () {
    localStorage.removeItem("token");
    localStorage.removeItem("nombre");
    localStorage.removeItem("id_user");
    this.authState.next(false)
  }
}
