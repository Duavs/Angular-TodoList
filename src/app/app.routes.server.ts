import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {HomeComponent} from './home/app.component';

export const serverRoutes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'}, // Redirects to login
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent}  // Ensure correct import
];
