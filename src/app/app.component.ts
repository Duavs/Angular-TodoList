// import {Component} from '@angular/core';
//
// @Component({
//   selector: 'app-root',
//   imports: [],
//   standalone: true,
//   templateUrl: './login.component.html',  // ✅ Fixed
//   styleUrls: ['./login.component.css'],  // ✅ Fixed
// })
// export class LoginComponent {  // ✅ Fixed class name
//   title = 'aij-f';
// }


import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth.services';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet]  // ✅ Required for routing
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.logoutIfExpired();
  }
}
