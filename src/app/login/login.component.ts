import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { LoginParam } from '../dto/LoginParam';
import { Login } from '../dto/Login';
import { RestService } from '../service/rest.service';
import { NavigationExtras, Router } from '@angular/router';
// import { AutoLogoutService } from '../service/auto-logout.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule,
    FormsModule,MatFormFieldModule],
  providers: [RestService, //[중요]HttpClient 사용 위해 추가
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginParam: LoginParam = {email:"", password:""};
  login!:Login;

  constructor(private authService: AuthService,private restService : RestService,private router: Router,
    // public autoLogout: AutoLogoutService
    ){}
  onSubmit(form: NgForm) { 
    this.loginParam.email = form.value.email;
    this.loginParam.password = form.value.password;
    this.restService.loginCheck(this.loginParam).subscribe(data => {
      this.login = data;

      this.authService.loginUser = this.login.user;
      this.authService.token = this.login.token;
      if ((this.login.success)) {
        this.authService.login().subscribe(() => {
          if (this.authService.isLoggedIn) {
            let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';
            let navigationExtras: NavigationExtras = {
              queryParamsHandling: 'preserve',
              preserveFragment: true
            };
            this.router.navigate([redirect], navigationExtras);
          }
        });
      }
      // form.reset();
    });
    // console.log(this.login);
  }
}
