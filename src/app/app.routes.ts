import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AuthGuard } from './guards/auth.guard';
import { EditProfilePage } from './pages/edit-profile-page/edit-profile-page.component';
import { OwnershipGuard } from './guards/ownership.guard';
import { CreateBookPageComponent } from './pages/create-book-page/create-book-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    children: [
      { path: ':id', component: ProfilePageComponent },
      { path: ':id/edit', component: EditProfilePage, canActivate: [OwnershipGuard] },
    ],
  },
  {
    path: 'book',
    children: [
      { path: 'create', canActivate: [AuthGuard], component: CreateBookPageComponent }
    ],
  }
];
