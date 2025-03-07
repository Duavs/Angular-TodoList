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


import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',  // Changed from 'app-login' (assuming this is the root)
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterOutlet,
    CommonModule  // Importing CommonModule for basic Angular directives
  ]
})
export class AppComponent {
  title = 'aij-f';
}
