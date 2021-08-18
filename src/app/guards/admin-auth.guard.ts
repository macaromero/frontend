import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthAdminService } from '../services/auth-admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor (private authService: AuthAdminService){}
  
  canActivate() {
    return this.authService.isAdminAuthenticated();
  }
  
}
