import { ActivatedRouteSnapshot,CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route :ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const authService: AuthService = inject(AuthService);
  
  let url: string = state.url;
  
  if(authService.isLoggedIn){
    return true;
  }
  authService.redirectUrl = url;
  // router.navigate(['/login']);
  return false;
};


