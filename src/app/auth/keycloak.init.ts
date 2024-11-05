import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'bookshelf',
        clientId: 'bookshelf-client',
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false,
        token: localStorage.getItem('token') as any,
        refreshToken: localStorage.getItem('refreshToken') as any,
        enableLogging: true,
      },
    });
}