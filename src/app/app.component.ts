import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { getEmailFromJwt } from './helpers/jwt.helper';
import { UserApiService } from './api/user.api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'bookshelf-web';

  constructor(private keycloakService: KeycloakService, private usersApiService: UserApiService) { }


  ngOnInit(): void {
    const loggedIn = this.keycloakService.isLoggedIn();

    if (loggedIn) {
      this.afterLogin();
    } else {
      this.afterLogout();
    }
  }

  async afterLogin() {
    const token = await this.keycloakService.getToken();
    const email = getEmailFromJwt(token);
    if (!email) return;
    this.usersApiService.getUsers({ email }).subscribe({
      next: (data) => {
        const user = data?.[0];

        localStorage.setItem('user_id', user.id);
        localStorage.setItem('email', user.email);
      }
    });
  }

  afterLogout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('email');
  }
}
