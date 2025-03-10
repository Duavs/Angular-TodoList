import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true, // ✅ Required for standalone components
  templateUrl: './signup.component.html',
  imports: [
    RouterLink
  ],
  styleUrl: './signup.component.css'
})

export class SignupComponent {

}
