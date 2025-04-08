import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AuthService} from '../services/auth.services';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  firstname: string = '';
  lastname: string = '';
  address: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  signUp() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      address: this.address
    };

    this.authService.signupUser(userData).subscribe({
      next: (response) => {
        console.log('Sign Up response:', response);

        if (response) {
          console.log("✅ User registered successfully!");

          // ✅ Navigate to login page after successful sign-up
          this.router.navigate(['/login']).then(success => {
            if (success) {
              console.log("✅ Successfully navigated to Login Page");
            } else {
              console.log("⚠️ Navigation to Login Page failed!");
            }
          }).catch(err => {
            console.error("🚨 Navigation error:", err);
          });
        }
      },
      error: (err) => {
        console.error('❌ Sign Up failed:', err);
        this.errorMessage = err.error || 'Registration failed. Please try again.';
      }
    });
  }
}
