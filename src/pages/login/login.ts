import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public authservice: AuthService,private Alert: AlertController) {
/*    window.localStorage.setItem('raja', 'f886a79bf8f8b8807fdf50efc8e062ee');
        this.navCtrl.setRoot(TabsPage);*/
       
  }

login(user) {
        this.authservice.authenticate(user).then(data => {
            if(data) {
                this.navCtrl.setRoot(TabsPage);
            }
            else{
                
   
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
        this.navCtrl.push(Signup);
    }

}
