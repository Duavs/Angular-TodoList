// import {Routes} from '@angular/router';
// import {LoginComponent} from './login/login.component';
// import {SignupComponent} from './signup/signup.component';
// import {HomeComponent} from './home/app.component';
//
// export const serverRoutes: Routes = [
//   {path: '', component: HomeComponent},
//   {path: 'login', component: LoginComponent},
//   {path: 'signup', component: SignupComponent},
// ];
// import {Routes} from '@angular/router';
// import {AuthGuard} from './auth/auth.guard';
//
// export const serverRoutes: Routes = [
//   {path: '', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)},
//   {path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)},
//   {
//     path: 'home',
//     loadComponent: () => import('./home/app.component').then(m => m.HomeComponent),
//     canActivate: [AuthGuard]
//   },
//   {path: 'signup', loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent)},
// ];
import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';

export const serverRoutes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'}, // Redirects to login
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', loadComponent: () => import('./home/app.component').then(m => m.HomeComponent)}
];
