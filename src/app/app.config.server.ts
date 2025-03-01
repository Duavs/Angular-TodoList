import {ApplicationConfig, mergeApplicationConfig} from '@angular/core';
import {provideServerRendering} from '@angular/platform-server';
import {appConfig} from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    // If `provideServerRoutesConfig` is needed, ensure it's correctly imported and available
    // provideServerRoutesConfig(serverRoutes) // Remove or fix this line if it's causing issues
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
