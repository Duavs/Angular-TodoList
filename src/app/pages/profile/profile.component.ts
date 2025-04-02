import {Component} from '@angular/core';
import {AuthService} from '../../auth/auth.services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private authService: AuthService,) {
  }

  get useremail(): string | null {
    return this.authService.getUserEmail();
  }

  get username(): string | null {
    return this.authService.getUsername();
  }
}
