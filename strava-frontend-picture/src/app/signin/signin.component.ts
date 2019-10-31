import { Component, OnInit } from '@angular/core';
import {
    AuthService,
    GoogleLoginProvider,
    SocialUser
} from 'angular-6-social-login';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginCredentails : SocialUser
  constructor( private socialAuthService: AuthService ) {}

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        this.loginCredentails = userData;
      }
    );
  }

  public socialSignOut(){
    this.socialAuthService.signOut().then(
      (data) => {
        this.loginCredentails = null;
      }
    )
  }

  ngOnInit() {
    this.loginCredentails = null
  }

}
