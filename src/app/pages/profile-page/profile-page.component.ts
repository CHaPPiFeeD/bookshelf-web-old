import { Component, OnInit } from "@angular/core";
import { IGetUserProfile, UserApiService } from "../../api/user.api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { BookUserStatus } from "../../components/book-card-list/book-card-list.enum";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  userId!: string;
  userProfile!: IGetUserProfile;
  isSelfUserProfile: boolean = false;
  BookUserStatus = BookUserStatus

  constructor(
    private userApiService: UserApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  
  async ngOnInit(): Promise<void> {
    this.userId = this.route.snapshot.params['id'];
    this.isSelfUserProfile = localStorage.getItem('user_id') === this.userId;
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userApiService.getUserProfile(this.userId).subscribe({
      next: (res) => {
        this.userProfile = res;
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  toEditProfile() {
    this.router.navigate(['profile', localStorage.getItem('user_id'), 'edit'])
  }
}