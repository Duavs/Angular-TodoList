import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http'; // ✅ Import HttpClient
import {serverRoutes} from './app/app.routes';
import {AppComponent} from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(serverRoutes),
    provideHttpClient() // ✅ Provide HttpClient for API calls
  ]
}).catch(err => console.error(err));

