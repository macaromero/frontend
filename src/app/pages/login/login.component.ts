import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { FormBuilder, Validators} from "@angular/forms";
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: BaseService, public fb:FormBuilder, private authService: AuthService, private router:Router) { }
  hide = true;
  logError: boolean = false
  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required]
  });

  ejecutarLogin(){
    if (this.loginForm.valid) {
      this.service.post(`${environment.url}/login`, this.loginForm.value).subscribe((res:any) => {
        if (res['JWT'] != null) {
          this.authService.authenticate(res['JWT'], res['nombre'], res['id_usuario']);
          this.router.navigate(["/user-home"])
        } else {
          this.logError = true 
        }

      })
    }
  };

  back() {
    this.logError = false;
    this.router.navigate(['/login'])
  }


  ngOnInit(): void {
    
  }

}
