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
import {Router, RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth.services';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet]  // ✅ Required for routing
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private titleService: Title, private router: Router) {
  }

  ngOnInit() {
    this.authService.logoutIfExpired();
  }

  updateTitle() {
    const currentRoute = this.router.url;
    let pageTitle = 'Todo App'; // Default title

    if (currentRoute.includes('login')) {
      pageTitle = 'Login - Todo App';
    } else if (currentRoute.includes('home')) {
      pageTitle = 'Home - Todo App';
    } else if (currentRoute.includes('signup')) {
      pageTitle = 'Sign Up - Todo App';
    }

    this.titleService.setTitle(pageTitle);
  }
}
