import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  GoogleLoginProvider,
  SocialUser
} from 'angular-6-social-login';
import { MapSyncService } from '../services/map-sync.service';
import { UserResponse } from '../response/user-response';
import { BackendApiServiceService } from '../services/backend-api-service.service';
import { User } from '../model/user';
import { UserDataServiceService } from '../services/user-data-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  private _loginCredentails: SocialUser
  public displaySignup: boolean = false

  constructor(private socialAuthService: AuthService, private mapSyncService: MapSyncService, private api: BackendApiServiceService, private userDataService: UserDataServiceService) { }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : ", userData);
        this._loginCredentails = userData;
        let userId = this._loginCredentails.id
        this.api.hasAccount(userId).subscribe((hasAccount: boolean) => {
          if (hasAccount) {
            this.api.updateUserData(userId).subscribe(_ => {
              this.api.getUser(userId).subscribe((userResponse: UserResponse) => {
                this.userDataService.setUserData(new User(userResponse))
                this.mapSyncService.generateBaseMap()
              });
            });

          } else {
            window.location.href = this.api.generateSignupUrl(userId)
          }
        });

      }
    );
  }

  public socialSignOut() {
    this.socialAuthService.signOut().then(
      (data) => {
        this._loginCredentails = null;
        this.mapSyncService.clearMap()
        this.userDataService.setUserData(new User())
      }
    )
  }

  ngOnInit() {
    this._loginCredentails = null
  }

  public isSignedIn(): boolean {
    return this._loginCredentails != null
  }
}
