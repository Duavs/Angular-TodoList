import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http'; // ✅ Import HttpClient
import {routes} from './app/app-routing.module';
import {LoginComponent} from './app/login/login.component';
import {importProvidersFrom} from '@angular/core';

bootstrapApplication(LoginComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(routes),
    provideHttpClient() // ✅ Provide HttpClient for API calls
  ]
}).catch(err => console.error(err));
