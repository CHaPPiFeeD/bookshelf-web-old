import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { parseJwt } from '../helpers/jwt.helper';


@Injectable()
export class AuthGuard {
  constructor(
    protected router: Router,
    protected keycloakService: KeycloakService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    try {
      const token = this.keycloakService.getKeycloakInstance().token;
      if (!token) throw new Error('Token is required!');
      const data = parseJwt(token);
      if (!data) throw new Error('Data not found!');
      if (Date.now() >= data.exp * 1000) {
        throw new Error('Expired token!');
      }
      return true;
    } catch (e: any) {
      this.keycloakService.login({ redirectUri: 'http://localhost:4200' + state.url });
      return false;
    }
  }
}
