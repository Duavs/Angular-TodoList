import {inject, Injectable, PLATFORM_ID} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private platformId = inject(PLATFORM_ID);

  constructor(private router: Router) {
  }

  canActivate(): boolean {
    // 🔹 Ensure localStorage is accessed only in the browser
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');

      if (token) {
        return true; // ✅ Allow access to `/home`
      }
    }

    this.router.navigate(['/login']).then(r => ""); // ❌ Redirect back to login if no token
    return false;
  }
}
