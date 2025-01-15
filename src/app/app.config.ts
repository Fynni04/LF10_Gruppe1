import {APP_INITIALIZER, ApplicationConfig, NgModule} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {
  includeBearerTokenInterceptor,
  KeycloakAngularModule,
  KeycloakBearerInterceptor,
  KeycloakService
} from "keycloak-angular";

export const appConfig: ApplicationConfig = {

  providers: [provideRouter(routes), provideHttpClient(withInterceptorsFromDi()), provideHttpClient(),
    KeycloakAngularModule,
    { //for KeyCloak
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [KeycloakService]
    },
    KeycloakService,
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true
    },
    { //for BearerToken
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true
    }
  ]
};

function initializeApp(keycloak: KeycloakService): () => Promise<boolean> {
  return () => initializeKeycloak(keycloak)();
}

export const initializeKeycloak = (keycloak: KeycloakService) => async () =>
  keycloak.init({
    config: {
      url: 'https://keycloak.szut.dev/auth',
      realm: 'szut',
      clientId: 'employee-management-service-frontend',
    },
    initOptions: {
      onLoad: 'login-required',
      checkLoginIframe: false,
    },
    enableBearerInterceptor: true,
    bearerPrefix: 'Bearer',
    bearerExcludedUrls: [],
  })

;
