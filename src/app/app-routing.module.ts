// // import {NgModule} from '@angular/core';
// // import {RouterModule, Routes} from '@angular/router';
// // import {LoginComponent} from './login/login.component';
// // import {SignupComponent} from './signup/signup.component';
// // import {HomeComponent} from './home/app.component';
// // import {AuthGuard} from './auth/auth.guard';
// //
// // const routes: Routes = [
// //   {path: '', component: LoginComponent}, // Set LoginComponent as default
// //   {path: 'login', component: LoginComponent},
// //   {path: 'signup', component: SignupComponent},
// //   {path: 'home', component: HomeComponent, canActivate: [AuthGuard]}, // Allow users to navigate to home after login
// // ];
// //
// // @NgModule({
// //   imports: [RouterModule.forRoot(routes)],
// //   exports: [RouterModule],
// // })
// // export class AppRoutingModule {
// // }
// //
// //
// // // import {NgModule} from '@angular/core';
// // // import {RouterModule, Routes} from '@angular/router';
// // // import {LoginComponent} from './login/login.component';
// // // import {SignupComponent} from './signup/signup.component';
// // // import {HomeComponent} from './home/app.component';
// // // import {AuthGuard} from './auth/auth.guard';
// // //
// // // const routes: Routes = [
// // //   {path: '', component: LoginComponent},
// // //   {path: 'login', component: LoginComponent},
// // //   {path: 'signup', component: SignupComponent},
// // //   {path: 'home', component: HomeComponent, canActivate: [AuthGuard]}
// // // ];
// // //
// // // @NgModule({
// // //   imports: [RouterModule.forRoot(routes, {useHash: true})], // 👈 Add `{ useHash: true }`
// // //   exports: [RouterModule],
// // // })
// // // export class AppRoutingModule {
// // // }
// import {NgModule} from '@angular/core';
// import {RouterModule, Routes} from '@angular/router';
// import {LoginComponent} from './login/login.component';
// import {HomeComponent} from './home/app.component';
// import {AuthGuard} from './auth/auth.guard';
//
// const routes: Routes = [
//   {path: '', redirectTo: '/login', pathMatch: 'full'},
//   {path: 'login', component: LoginComponent},
//   {path: 'home', component: HomeComponent, canActivate: [AuthGuard]}
// ];
//
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {
// }
