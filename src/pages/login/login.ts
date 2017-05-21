import { Component } from '@angular/core';

import { NavController,LoadingController } from 'ionic-angular';

import {AuthService} from './authservice';
import { TabsPage } from '../tabs/tabs';
import {Signup} from '../signup/signup';
import { AlertController } from "ionic-angular/index";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

usercreds = {
            email: '',
            password: '',
            name: '',
            department: ''
        };

  constructor(public navCtrl: NavController, public authservice: AuthService,private Alert: AlertController,public loadingCtrl: LoadingController) {
    
  }

login(user) {
     let loading = this.loadingCtrl.create({
    spinner: 'crescent'
  });
    loading.present();
        this.authservice.authenticate(user).then(data => {
            if(data) {
                window.localStorage.setItem('username',this.usercreds.email);
                window.localStorage.setItem('password',this.usercreds.password);
                this.authservice.isLoggedin = true;
                this.navCtrl.setRoot(TabsPage);
                loading.dismiss();
                
            }
            else{
                 loading.dismiss();
   
        let alert = this.Alert.create({
        title: 'Hata',
        subTitle: 'Giriş başarısız',
        buttons: ["Tamam"]
    })
   
        alert.present();
            }
    });
}
    signup() {
        this.navCtrl.setRoot(Signup);
    }

}
