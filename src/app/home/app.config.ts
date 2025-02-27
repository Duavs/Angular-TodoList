import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {routes} from './app.routes'; // ✅ Ensure this file exists

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // ✅ Provide Router
    provideHttpClient()    // ✅ Provide HttpClient
  ]
};
