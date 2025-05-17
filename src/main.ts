import {bootstrapApplication, Title} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http'; // ✅ Import HttpClient
import {serverRoutes} from './app/app.routes';
import {AppComponent} from './app/app.component';
import {MessageService} from 'primeng/api';
import {ApplicationConfig} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Lara from '@primeng/themes/lara';
import { definePreset } from '@primeng/themes';
const Noir = definePreset(Lara, {
  semantic: {
    primary: {
      50: '{zinc.50}',
      100: '{zinc.100}',
      200: '{zinc.200}',
      300: '{zinc.300}',
      400: '{zinc.400}',
      500: '{zinc.500}',
      600: '{zinc.600}',
      700: '{zinc.700}',
      800: '{zinc.800}',
      900: '{zinc.900}',
      950: '{zinc.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{zinc.950}',
          inverseColor: '#ffffff',
          hoverColor: '{zinc.900}',
          activeColor: '{zinc.800}',
        },
        highlight: {
          background: '{zinc.950}',
          focusBackground: '{zinc.700}',
          color: '#ffffff',
          focusColor: '#ffffff',
        },
      },
      dark: {
        primary: {
          color: '{zinc.50}',
          inverseColor: '{zinc.950}',
          hoverColor: '{zinc.100}',
          activeColor: '{zinc.200}',
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
      },
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(serverRoutes),
    provideHttpClient(), // ✅ Provide HttpClient for API calls
    // Title,
    MessageService,
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Noir,
        options: {
          darkModeSelector: false || 'none',
        },
      },
    }),
  ],
};
bootstrapApplication(AppComponent, appConfig).catch((err) => console.log(err));

