import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LoginService} from '../services/login.services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private loginService: LoginService, private router: Router) {
  }

  login() {
    const loginData = {email: this.email, password: this.password};

    this.loginService.loginUser(loginData).subscribe({
      next: (response) => {
        console.log('Login response:', response);

        if (response.token) {
          localStorage.setItem('token', response.token);
          console.log("Token stored:", response.token);

          // ✅ Navigate to `/home` after storing the token
          this.router.navigate(['/home']).then(success => {
            if (success) {
              console.log("✅ Successfully navigated to Home Page");
            } else {
              console.log("⚠️ Navigation to Home Page failed!");
            }
          }).catch(err => {
            console.error("🚨 Navigation error:", err);
          });
        } else {
          console.warn("⚠️ No token received, login might have failed!");
          this.errorMessage = "Login failed. Please try again.";
        }
      },
      error: (err) => {
        console.error('❌ Login failed:', err);
        this.errorMessage = 'Invalid email or password.';
      }
    });
  }
}

// import {Component} from '@angular/core';
// import {Router} from '@angular/router';
// import {AuthService} from '../auth/auth.services';
//
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   constructor(private router: Router, private authService: AuthService) {
//   }
//
//   login() {
//     if (this.authService.login()) { // Ensure login logic is correct
//       this.router.navigate(['/home']); // ✅ Redirect to home after login
//     } else {
//       alert('Login failed!');
//     }
//   }
// }
// import {Injectable} from '@angular/core';
// import {CanActivate, Router} from '@angular/router';
// import {AuthService} from '../auth/auth.services';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {
//   }
//
//   canActivate(): boolean {
//     if (this.authService.isAuthenticated()) {
//       return true; // Allow access if authenticated
//     } else {
//       this.router.navigate(['/login']); // Redirect to login if not authenticated
//       return false;
//     }
//   }
// }
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth/auth.services';
//
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   email: string = '';  // ✅ Define email
//   password: string = '';  // ✅ Define password
//
//   constructor(private router: Router, private authService: AuthService) {}
//
//   login() {
//     if (this.authService.login(this.email, this.password)) {  // ✅ Pass credentials
//       this.router.navigate(['/home']); // ✅ Redirect to home
//     } else {
//       alert('Login failed!'); // ❌ Use `errorMessage` instead of alert
//     }
//   }
// }
