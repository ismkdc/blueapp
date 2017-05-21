import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import {AuthService} from '../pages/login/authservice';
import {HomePage} from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public authservice: AuthService) {
    platform.ready().then(() => {
      
      var username = window.localStorage.getItem('username');
      var password = window.localStorage.getItem('password');
      var user = {
        email:username,
        password:password
      }
     
      if(username !=null || password != null){
        this.authservice.authenticate(user).then(data => {
            if(data) {
                window.localStorage.setItem('username',user.email);
                window.localStorage.setItem('password',user.password);
                this.authservice.isLoggedin = true;
                this.rootPage = TabsPage; 
            }
        });

      }
      else{
        this.rootPage = LoginPage;
      }
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
