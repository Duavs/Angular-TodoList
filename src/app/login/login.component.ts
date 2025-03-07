import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LoginService} from '../services/login.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
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

          // 🔹 Ensure navigation to `/home`
          this.router.navigate(['/home']).then(() => {
            console.log(this.router.url);
          }).catch(err => {
            console.error("Navigation error:", err);
          });
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Invalid email or password.';
      }
    });
  }
}
