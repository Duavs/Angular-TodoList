import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): boolean {
    const user = localStorage.getItem('user');

    if (user) {
      return true; // Allow access if token exists
    } else {
      this.router.navigate(['/home']); // Redirect to login if no token
      return false;
    }
  }
}
