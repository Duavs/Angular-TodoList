import {bootstrapApplication} from '@angular/platform-browser';
import {LoginComponent} from './app/login/login.component'; // ✅ Change HomeComponent to LoginComponent
import {config} from './app/app.config.server';

const bootstrap = () => bootstrapApplication(LoginComponent, config);

export default bootstrap;
