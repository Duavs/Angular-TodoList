import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http'; // ✅ Import HttpClient
import {LoginComponent} from './app/login/login.component';
import {importProvidersFrom} from '@angular/core';
import {serverRoutes} from './app/app.routes';

bootstrapApplication(LoginComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(serverRoutes),
    provideHttpClient() // ✅ Provide HttpClient for API calls
  ]
}).catch(err => console.error(err));

