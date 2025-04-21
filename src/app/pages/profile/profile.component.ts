import {Component} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
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


  constructor(private profileService: ProfileService,) {
  }

  get userEmail(): string | null {
    return this.profileService.getUserEmail();
  }

  userName() {
    this.profileService.getUsername().subscribe({
      next: (userName: string) => this.username = userName,
      error: (err) => console.error('Failed to fetch user name:', err)
    });
    console.log(this.username);
  }

  editProfile() {
    this.isEditing = true;
    // this.username = this.profileService.getUsername() ?? '';
    this.profileService.getUsername().subscribe({
      next: (userName: string) => this.username = userName,
      error: (err) => console.error('Failed to fetch user name:', err)
    });
    this.email = this.profileService.getUserEmail() ?? '';
    this.profileService.getUserFirstName().subscribe({
      next: (firstName) => this.firstname = firstName,
      error: (err) => console.error('Failed to fetch first name:', err)
    });
    this.profileService.getUserLastName().subscribe({
      next: (lastName) => this.lastname = lastName,
      error: (err) => console.error('Failed to fetch last name:', err)
    });
    this.profileService.getUserAddress().subscribe({
      next: (address) => this.Address = address,
      error: (err) => console.error('Failed to fetch address:', err)
    });
  }

  cancelEditProfile() {
    this.isEditing = false;
  }

  updateProfile() {
    const updatedData = {
      // id: Number(this.authService.getUserId()), // Convert string ID to number
      userName: this.username,
      email: this.email,
      firstName: this.firstname,
      lastName: this.lastname,
      address: this.Address
    };

    this.profileService.updateUserProfile(Number(this.profileService.getUserId()), updatedData).subscribe({
      next: () => {
        // this.toast.success('Profile updated successfully!');
        console.log('Updated profile  ' + updatedData);
        console.log(updatedData);
        this.isEditing = false;
      },
      error: (err) => {
        console.error('❌ Error updating profile:', err);
        console.log(updatedData);
        //  this.toast.error('Failed to update profile');
      }
    });
  }
}
