// import { Injectable } from '@angular/core';
// const store = require('store');
// import { AuthService } from './auth.service';
// const MINUTES_UNITL_AUTO_LOGOUT = 60 // in mins
// const CHECK_INTERVAL = 1000 // in ms
// @Injectable({
//   providedIn: 'root'
// })
// export class AutoLogoutService {

//   STORE_KEY = Date.now();

//   getlastAction() {
//     return parseInt(store.get(this.STORE_KEY));
//   }
//   setlastAction(value: number) {
//     store.set(this.STORE_KEY, value);
//   }

//   constructor(private authService: AuthService) {
//     this.check();
//     this.initListener();
//     this.initInterval();
//   }

//   initListener() {
//     document.body.addEventListener('click', () => this.reset());
//     // console.log(this.STORE_KEY);
//   }

//   reset() {
//     this.setlastAction(Date.now()) ;
//   }

//   initInterval() {
//     setInterval(() => {
//       this.check();
//     }, CHECK_INTERVAL);
//   }
//   check() {
//     let now = Date.now();
//     let timeleft = this.getlastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000; //100분
//     // let timeleft = this.getlastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 5; //18초
//     let diff = timeleft - now;
//     let isTimeout = diff < 0;

//     // console.log('timeleft=' + timeleft);

//     if (isTimeout && this.authService.isLoggedIn) {
//       this.authService.logout();
//     }
//   }
// }
