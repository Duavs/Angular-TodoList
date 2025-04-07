import {Component} from '@angular/core';
import {AuthService} from '../../auth/auth.services';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    RouterLink,
    NgIf
  ],
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {
  isEditing = false;

  constructor(private authService: AuthService,) {
  }

  get useremail(): string | null {
    return this.authService.getUserEmail();
  }

  get username(): string | null {
    return this.authService.getUsername();
  }

  editProfile() {
    this.isEditing = true;

  }

  cancelEditProfile() {
    this.isEditing = false;
  }
}
