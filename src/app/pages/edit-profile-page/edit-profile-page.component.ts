import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from '@angular/forms';
import { IGetUserProfile, UserApiService } from "../../api/user.api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrl: './edit-profile-page.component.scss'
})
export class EditProfilePage implements OnInit {
  profileForm = new FormGroup({
    username: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    private userApiService: UserApiService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.userApiService.getUserProfile(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (data: IGetUserProfile) => {
        this.profileForm.patchValue({
          username: data.name,
          description: data.description || '',
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  submit() {
    const payload = {
      name: this.profileForm.value.username as string,
      description: this.profileForm.value.description as string,
    };

    const userId = localStorage.getItem('user_id');
    if (!userId) return;
    this.userApiService.updateUser(userId, payload).subscribe({
      next: (v) => {
        console.log('success');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  back() {
    this.location.back();
  }
}