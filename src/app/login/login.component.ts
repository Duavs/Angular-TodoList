import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../services/auth.services';
import {Title} from '@angular/platform-browser';
import {Init} from 'node:v8';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = '';
  title = 'Login';
  constructor(private loginService: AuthService,
              private router: Router,
              private titleService: Title) {
  }
  ngOnInit() {
    this.titleService.setTitle(this.title);
  }
  login() {
    const loginData = {email: this.email, password: this.password};

    this.loginService.loginUser(loginData).subscribe({
      next: (response) => {
        // Check if the response contains a token
        if (response.token) {
          localStorage.setItem('token', response.token);
          // Navigate to `/home` after storing the token
          this.router.navigate(['/home']).then(success => {
          }).catch(err => {
            console.error("🚨 Navigation error:", err);
          });
        } else {
          console.warn("⚠️ No token received, login might have failed!");
          this.errorMessage = "Login failed. Please try again.";
        }
      },
      error: (err) => {
        console.error('❌ Login failed:', err.status);
        this.errorMessage = 'Invalid email or password.';
      }
    });
  }
}


