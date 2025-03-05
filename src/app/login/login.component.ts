import {Component} from '@angular/core';
import {Router} from '@angular/router'; // ✅ No need to import RouterModule here
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LoginService} from '../services/login.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], // ✅ Removed RouterModule (not needed)
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
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          console.log('Login successful:', response);
          this.router.navigate(['/home']); // ✅ Navigate to home
        } else {
          this.errorMessage = response?.message || 'Login failed. Please try again.';
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Invalid email or password.';
      }
    });
  }
}
