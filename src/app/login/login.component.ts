import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../services/auth.services';

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

  constructor(private loginService: AuthService, private router: Router) {
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


