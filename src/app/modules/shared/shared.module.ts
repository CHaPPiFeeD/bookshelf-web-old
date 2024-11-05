import { NgModule } from "@angular/core";
import { ProfilePageComponent } from "../../pages/profile-page/profile-page.component";
import { HomePageComponent } from "../../pages/home-page/home-page.component";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { ToolbarComponent } from "../../components/toolbar/toolbar.component";
import { RouterModule } from "@angular/router";
import { AppComponent } from "../../app.component";
import { UserApiService } from "../../api/user.api.service";
import { HttpClientModule } from "@angular/common/http";
import { MatTabsModule } from '@angular/material/tabs';
import { EditProfilePage } from "../../pages/edit-profile-page/edit-profile-page.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from "@angular/forms";

const MATERIAL = [MatToolbarModule, MatButtonModule, MatIconModule, MatTabsModule, MatFormFieldModule, MatInputModule];

const PAGES = [HomePageComponent, ProfilePageComponent, EditProfilePage];
const COMPONENTS = [AppComponent, ToolbarComponent];
const API_SERVICES = [UserApiService];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    ...MATERIAL,
  ],
  declarations: [
    ...PAGES,
    ...COMPONENTS,
  ],
  exports: [...MATERIAL],
  providers: [...API_SERVICES]
})
export class SharedModule { }