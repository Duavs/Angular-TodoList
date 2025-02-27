import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/home/app.component';
import {appConfig} from './app/home/app.config';
import {enableProdMode} from '@angular/core';

enableProdMode();
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


