import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      console.log('true');
      return true; // ✅ Allow access if authenticated
    } else {
      console.warn('false');
      this.router.navigate(['/login']); // ❌ Redirect to login if not authenticated
      return false;
    }
  }
}
