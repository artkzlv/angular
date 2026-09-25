import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';

import { routes } from './app.routes';
import { TitleNavigationStrategy } from './shared/services/titleNavigationStrategy';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './shared/interceptors/authInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    TitleNavigationStrategy,
    {
      provide: TitleStrategy,
      useExisting: TitleNavigationStrategy,
    },
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
