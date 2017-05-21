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
/*    window.localStorage.setItem('raja', 'f886a79bf8f8b8807fdf50efc8e062ee');
        this.navCtrl.setRoot(TabsPage);*/
       
  }

login(user) {
     let loading = this.loadingCtrl.create({
    spinner: 'crescent'
  });
    loading.present();
        this.authservice.authenticate(user).then(data => {
            if(data) {
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
