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
  username1: string = this.authService.getUsername() ?? '';

  constructor(private authService: AuthService,) {
  }

  get Getuseremail(): string | null {
    return this.authService.getUserEmail();
  }

  editProfile() {
    this.username1 = this.authService.getUsername() ?? '';
    this.isEditing = true;
  }

  cancelEditProfile() {
    this.isEditing = false;
  }
}
