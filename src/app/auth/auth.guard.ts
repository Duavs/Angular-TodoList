import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): boolean {
    if (localStorage.getItem('authToken')) {
      return true; // ✅ Allow access if token exists
    } else {
      this.router.navigate(['/login']); // ✅ Redirect to login if not authenticated
      return false;
    }
  }
}
