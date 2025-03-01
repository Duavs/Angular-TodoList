// import {bootstrapApplication} from '@angular/platform-browser';
// import {enableProdMode} from '@angular/core';
// import {LoginComponent} from './app/login/login.component';
// import {appConfig} from './app/app.config';
//
// enableProdMode();
//
// bootstrapApplication(LoginComponent, appConfig)
//   .catch((err) => console.error(err));

// import {bootstrapApplication} from '@angular/platform-browser';
// import {provideRouter} from '@angular/router';
// import {serverRoutes} from './app/app.routes';
// import {AppComponent} from './app/app.component';
//
// bootstrapApplication(AppComponent, {
//   providers: [provideRouter(serverRoutes)],
// }).catch(err => console.error(err));


import {importProvidersFrom} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {serverRoutes} from './app/app.routes';
import {AppComponent} from './app/app.component';
import {HttpClientModule} from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(serverRoutes),
    importProvidersFrom(HttpClientModule) // Ensure HTTP requests work
  ],
}).catch(err => console.error(err));
