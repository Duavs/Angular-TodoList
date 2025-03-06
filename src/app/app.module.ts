import {routes} from './app-routing.module';
import {NgModule} from '@angular/core'; // Import routing module
import {AuthGuard} from './auth/auth.guard';

@NgModule({
  imports: [
    routes, // Ensure this is included
  ],
  providers: [AuthGuard],
})

export class AppModule {
}

