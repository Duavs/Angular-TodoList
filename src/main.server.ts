import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/home/app.component';
import {config} from './app/home/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
