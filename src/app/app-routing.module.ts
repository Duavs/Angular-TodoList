// import {NgModule} from '@angular/core';
// import {RouterModule, Routes} from '@angular/router';
// import {LoginComponent} from './login/login.component';
// import {SignupComponent} from './signup/signup.component';
// import {HomeComponent} from './home/app.component';
//
// const routes: Routes = [
//   {path: '', component: LoginComponent}, // Set LoginComponent as default
//   {path: 'login', component: LoginComponent},
//   {path: 'signup', component: SignupComponent},
//   {path: 'home', component: HomeComponent}, // Allow users to navigate to home after login
// ];
//
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {
// }
//
//
import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {HomeComponent} from './home/app.component';
import {AuthGuard} from './auth/auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]} // ✅ Protect home route
];


