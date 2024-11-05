import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';


@Injectable()
export class OwnershipGuard {
  constructor(
    protected router: Router,
    protected keycloakService: KeycloakService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    try {
      const userId = localStorage.getItem('user_id');
      const userIdFromRoute = route.paramMap.get('id');
      if (userId !== userIdFromRoute) throw new Error('Access denied!');
      return true;
    } catch (e: any) {
      console.error(e.message);
      return false;
    }
  }
}
