import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router'; // ✅ Import RouterModule
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {LoginService} from '../services/login.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule], // ✅ Add RouterModule
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
        console.log('Login successful:', response);
        localStorage.setItem('user', JSON.stringify(response)); // Store user details
        console.log(localStorage.getItem('user'));
        this.router.navigate(['home']); // Redirect to home
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Invalid email or password.';
      }
    });
  }
}
