import {bootstrapApplication, Title} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http'; // ✅ Import HttpClient
import {serverRoutes} from './app/app.routes';
import {AppComponent} from './app/app.component';
import {MessageService} from 'primeng/api';
import {ApplicationConfig} from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(serverRoutes),
    provideHttpClient(), // ✅ Provide HttpClient for API calls
    Title,
    MessageService
  ],
};
bootstrapApplication(AppComponent, appConfig).catch((err) => console.log(err));

