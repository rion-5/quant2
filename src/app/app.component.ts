import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, RouterLink, MatIconModule]
})
export class AppComponent {
  title = 'quant2';
  mobileMenuIsHidden = true;
  isOpenButton = false;
  isLoggedIn = false;
  @Output() mobileMenu = new EventEmitter<Boolean>();

  constructor(public authService: AuthService, private router: Router) { }

  mobileMenuToggle() {
    this.mobileMenuIsHidden = this.mobileMenuIsHidden ? false : true;
    this.isOpenButton = this.isOpenButton ? false : true;
    this.mobileMenu.emit(this.isOpenButton);
  }

  mobileMenuClose() {
    this.mobileMenuIsHidden = true;
    this.isOpenButton = false;
    this.mobileMenu.emit(false);
  }
  logout() {
    this.authService.logout();
  }
}
