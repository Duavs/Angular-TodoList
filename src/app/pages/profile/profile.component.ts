import {Component} from '@angular/core';
import {AuthService} from '../../auth/auth.services';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';


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
  Address: string = '';

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
    this.authService.getUserFirstName().subscribe({
      next: (firstName) => this.firstname = firstName,
      error: (err) => console.error('Failed to fetch first name:', err)
    });
    this.authService.getUserLastName().subscribe({
      next: (lastName) => this.lastname = lastName,
      error: (err) => console.error('Failed to fetch last name:', err)
    });
    this.authService.getUserAddress().subscribe({
      next: (address) => this.Address = address,
      error: (err) => console.error('Failed to fetch address:', err)
    });
  }

  cancelEditProfile() {
    this.isEditing = false;
  }

  updateProfile() {
    const updatedData = {
      username: this.username,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      address: this.Address
    };

    this.authService.updateUserProfile(updatedData).subscribe({
      ...this.authService,
      next: (response) => {
        console.log('✅ Profile updated successfully:', response);
        alert('Profile has been updated!');
        this.isEditing = false;
      },
      error: (err) => {
        console.error('❌ Failed to update profile:', err);
        alert('Failed to update profile. Please try again later.');
      }
    });
  }
}
