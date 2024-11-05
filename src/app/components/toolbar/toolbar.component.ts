import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  isLoggined!: boolean;

  constructor(
    private keycloakService: KeycloakService,
    private router: Router,
  ) {
    this.isLoggined = this.keycloakService.isLoggedIn();
  }

  toProfile() {
    this.router.navigate(['/profile', localStorage.getItem('user_id')])
  }

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }
}