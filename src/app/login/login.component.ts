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
        console.log("✅ Login successful, token stored:", response.token);
        await this.router.navigate(['/home']);
      } else {
        console.warn("⚠️ No token received, login might have failed!");
        this.errorMessage.set("Login failed. Please try again.");
      }
    } catch (err: any) {
      console.error('❌ Login failed:', err?.status ?? 'unknown', err?.message ?? 'Unknown error');
      const message = err?.status === 400 || err.status === 401
        ? 'Invalid email or password.'
        : 'Too many login attempts. Please try again after 1 minute.';
      this.errorMessage.set(message);
    }
  }
}
