import {Component, OnInit, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../services/auth.services';
import {Title} from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = signal('');
  password = signal('');
  errorMessage = signal('');
  title = 'Login';
  constructor(private loginService: AuthService,
              private router: Router,
              private titleService: Title) {
  }
  ngOnInit() {
    this.titleService.setTitle(this.title);
  }
  async login() {
    const loginData = { email: this.email(), password: this.password() };
    try {
      const response = await firstValueFrom(this.loginService.loginUser(loginData));
      if (response.token) {
        localStorage.setItem('token', response.token);

        await this.router.navigate(['/home']);
      } else {

        this.errorMessage.set("Login failed. Please try again.");
      }
    } catch (err: any) {
      const errorMessage: Record<number, string> ={
        400: 'Bad Request: Please check your input.',
        401: 'Unauthorized: Invalid email or password.',
        403: 'Forbidden: You do not have permission to access this resource.',
        404: 'Not Found: The requested resource could not be found.',
        500: 'Internal Server Error: Please try again later.'
      };
      const message = errorMessage[err.status] || 'Something went wrong. Please try again later.'
      this.errorMessage.set(message);
      setTimeout(() => {
        this.errorMessage.set('');
      }, 3000);
    }
  }
}
