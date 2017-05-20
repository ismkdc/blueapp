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
