import {IncludeBearerTokenCondition, provideKeycloak} from 'keycloak-angular';
import { createInterceptorCondition, INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, includeBearerTokenInterceptor } from 'keycloak-angular';
import { provideRouter } from '@angular/router';
import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import { routes } from "./app.routes";
import {provideHttpClient, withInterceptors} from "@angular/common/http";


const localhostCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: /^(http:\/\/localhost:4200)(\/.*)?$/i
});

export const provideKeycloakAngular = () =>
  provideKeycloak({
    config: {
      url: 'https://keycloak.szut.dev/auth',
      realm: 'szut',
      clientId: 'employee-management-service-frontend'
    },
    initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      redirectUri: window.location.origin + '/'
    },
    providers: [
      {
        provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
        useValue: [localhostCondition]
      }
    ]
  });

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloakAngular(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor]))
  ]
};
