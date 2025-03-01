import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {serverRoutes} from './app.routes'; // ✅ Ensure this file exists

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(serverRoutes), // ✅ Provide Router
    provideHttpClient()    // ✅ Provide HttpClient
  ]
};
