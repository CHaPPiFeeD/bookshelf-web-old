import { APP_INITIALIZER, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";
import { initializeKeycloak } from "./auth/keycloak.init";
import { RouterModule } from '@angular/router';
import { routes } from "./app.routes";
import { AuthGuard } from "./guards/auth.guard";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from "./modules/shared/shared.module";
import { OwnershipGuard } from "./guards/ownership.guard";

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    KeycloakAngularModule,
    SharedModule,
  ],
  providers: [
    AuthGuard,
    OwnershipGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    provideAnimationsAsync(),
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule {};