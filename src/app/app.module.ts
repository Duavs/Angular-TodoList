import {serverRoutes} from './app.routes';
import {NgModule} from '@angular/core'; // Import routing module
import {AuthGuard} from './auth/auth.guard';

@NgModule({
  imports: [
    serverRoutes, // Ensure this is included
  ],
  providers: [AuthGuard],
})

export class AppModule {
}

