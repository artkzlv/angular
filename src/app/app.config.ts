import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';

import { routes } from './app.routes';
import { TitleNavigationStrategy } from './shared/components/titleNavigationStrategy/titleNavigationStrategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    TitleNavigationStrategy,
    {
      provide: TitleStrategy,
      useExisting: TitleNavigationStrategy,
    },
  ],
};
