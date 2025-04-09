import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule, NgClass} from '@angular/common';
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

  usernameTouched = false;
  emailTouched = false;
  passwordTouched = false;
  firstnameTouched = false;
  lastnameTouched = false;
  addressTouched = false;
  protected readonly NgClass = NgClass;

  constructor(private authService: AuthService, private router: Router) {
  }

  signUp() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      firstname: this.firstname,
      lastname: this.lastname,
      address: this.address,
    };

    this.usernameTouched = !this.username;
    this.emailTouched = !this.email;
    this.passwordTouched = !this.password;
    this.firstnameTouched = !this.firstname;
    this.lastnameTouched = !this.lastname;
    this.addressTouched = !this.address;

    if (this.usernameTouched || this.emailTouched || this.passwordTouched || this.firstnameTouched || this.lastnameTouched ||
      this.addressTouched) {
      this.errorMessage = "Please fill all the fields";
      alert(this.errorMessage);
      console.log(this.errorMessage, userData);
      return;
    }
    console.log(
      "Sign Up Data:",
      userData
    )
    this.authService.signupUser(userData).subscribe({
      next: (response) => {
        console.log('Sign Up response:', response);
        if (response) {
          console.log("✅ User registered successfully!");

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
