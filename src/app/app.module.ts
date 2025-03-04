import {AppRoutingModule} from './app-routing.module';
import {NgModule} from '@angular/core'; // Import routing module
import {AuthGuard} from './auth/auth.guard';

@NgModule({
  imports: [
    AppRoutingModule, // Ensure this is included
  ],
  providers: [AuthGuard],
})

export class AppModule {
}
