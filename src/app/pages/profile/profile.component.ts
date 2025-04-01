import {Component} from '@angular/core';
import {AuthService} from '../../auth/auth.services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  username: string = 'John Doe';
  userEmail: string = 'johndoe@example.com';

  constructor(private authService: AuthService,) {
  }

  fetchEmail(): void {
    const userId = Number(this.authService.getUserId());


  }
}
