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
import {AuthGuard} from './auth/auth.guard';
import {HomeComponent} from './home/app.component';

export const serverRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Login'}
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {title: 'Signup'}
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {title: 'Home'},
    canActivate: [AuthGuard] // ✅ Ensures only authenticated users can access home
  }
];
