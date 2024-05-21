import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, delay, of, tap } from 'rxjs';
import { User } from '../dto/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string = '';
  loginUser: User = new User;
  token: string = '';
  constructor(private router: Router) { }
  login(): Observable<boolean> {
    return of(true).pipe(
      delay(100),
      tap(val => this.isLoggedIn = true)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
 
    this.loginUser = {
      name: '',
      email: '',
      password: '',
      created_date: '',
      activation: false,
      id: 0
    };
    this.token='';
    this.router.navigate(['/login']);

  }

}

