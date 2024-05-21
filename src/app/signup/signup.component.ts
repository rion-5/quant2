import { Component } from '@angular/core';
import { User } from '../dto/User';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../service/rest.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, HttpClientModule,
    FormsModule, MatFormFieldModule],
  providers: [RestService, //[중요]HttpClient 사용 위해 추가
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUp: User = {
    name: '',
    email: '',
    password: '',
    created_date: '',
    activation: false,
    id: 0
  };
  emailCheck: boolean = false;

  constructor(private restService: RestService,private router: Router) { }

  saveSignUp(): void {
    this.restService.newSignUp(this.signUp).subscribe(data => {

    })
  }
  onSubmit(form: NgForm): void {
    // console.log(form.value);
    // console.log(form.value.fullname);
    const now = new Date();
    this.signUp = {
      id: 0,
      name: form.value.fullname,
      email: form.value.email,
      password: form.value.password,
      created_date: now.toISOString(),
      activation: true
    }
    this.restService.newSignUp(this.signUp).subscribe(data=>{
      this.signUp = data;
      // form.reset();
      this.router.navigate(['/']);
    })
  }

  emailDuplicateCheck(form: NgForm){
    // console.log("emailDuplicateCheck:" + form.value.email);
    this.restService.emailDuplicateCheck( form.value.email).subscribe(data=>{
      this.emailCheck = data;
      // console.log("return value:" + this.emailCheck);
      // form.reset();
    })
  }}
