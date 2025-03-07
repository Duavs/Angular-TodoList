import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http'; // ✅ Import HttpClient
import {LoginComponent} from './app/login/login.component';
import {serverRoutes} from './app/app.routes';

bootstrapApplication(LoginComponent, {
  providers: [
    provideRouter(serverRoutes),
    provideHttpClient() // ✅ Provide HttpClient for API calls
  ]
}).catch(err => console.error(err));

