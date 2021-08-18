import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private service: BaseService, public fb:FormBuilder, private authService: AuthAdminService, private router:Router) { }
  hide = true;
  logError: boolean = false
  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required]
  });

  ejecutarLogin(){
    if (this.loginForm.valid) {
      this.service.post(`${environment.url}/loginAdmin`, this.loginForm.value).subscribe((res:any) => {
        if (res['JWT'] != null) {
          this.authService.authenticateAdmin(res['JWT'], res['nombre'], res['id_administrador']);
          this.router.navigate(["/admin-home"])
        } else {
          this.logError = true
        }
      })
    }
  };

  back() {
    this.logError = false;
    this.router.navigate(['/admin-login'])
  }

  ngOnInit(): void {
  }

}
