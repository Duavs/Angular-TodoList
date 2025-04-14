import {Component} from '@angular/core';
import {AuthService} from '../../auth/auth.services';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    RouterLink,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  isEditing = false;
  username: string = '';
  email: string = '';
  firstname: string = '';
  lastname: string = '';
  address: string = '';

  constructor(private authService: AuthService,) {
  }

  get userEmail(): string | null {
    return this.authService.getUserEmail();
  }

  get userName(): string | null {
    return this.authService.getUsername();
  }

  editProfile() {
    this.isEditing = true;
    this.username = this.authService.getUsername() ?? '';
    this.email = this.authService.getUserEmail() ?? '';
    // this.firstname = this.
  }

  cancelEditProfile() {
    this.isEditing = false;
  }
}
