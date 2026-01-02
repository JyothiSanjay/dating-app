import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { lastValueFrom } from 'rxjs';
import { InitService } from './services/init.service';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { jwtInterceptorInterceptor } from './core/interceptors/jwt-interceptor-interceptor';
import { loadingInterceptor } from './loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withInterceptors([errorInterceptor, jwtInterceptorInterceptor, loadingInterceptor])),
    provideAppInitializer(async () => {
      const initService = inject(InitService);
      return new Promise<void>(async (resolve) => {
        setTimeout(async () => {
          try {
            return lastValueFrom(initService.init());
          } finally {
            const splash = document.getElementById('initial-splash');
            if (splash) {
              splash.remove();
            }
            resolve();
          }
        }, 2000);
      });

    })
  ]
};
