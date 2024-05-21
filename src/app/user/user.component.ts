import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { User } from '../dto/User';
import { AuthService } from '../service/auth.service';
import { RestService } from '../service/rest.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, HttpClientModule,
    FormsModule,MatFormFieldModule],
  providers: [RestService, //[중요]HttpClient 사용 위해 추가
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  user: User = new User;
  returnedId: number = 0;
  constructor(private restService: RestService, public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.loginUser;
    // console.log(this.user.email);

  }

  onSubmit(form: NgForm): void {
    // // console.log(form.value);
    // // console.log(form.value.fullname);

    this.user.email = form.value.email;
    this.user.name = form.value.fullname;
    this.user.password = form.value.password;


    this.restService.updateUser(this.user).subscribe(data => {
      this.returnedId = data;
      // console.log(this.returnedId);
      // form.reset();
      this.router.navigate(['']);
    });
  }
  deleteUser(): void {
    this.restService.deleteUser(this.user.id).subscribe(data => {
      this.authService.logout();
    });
  }
}
