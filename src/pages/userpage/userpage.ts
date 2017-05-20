import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {AuthService} from '../login/authservice';
import {LoginPage} from '../login/login';


/*
  Generated class for the Userpage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-userpage',
  templateUrl: 'userpage.html'
})
export class Userpage {

  constructor(public navCtrl: NavController, public authservice: AuthService, public alertCtrl: AlertController) {}
  
  logout() {
        this.authservice.logout();
        this.navCtrl.setRoot(LoginPage);
    }
    
    getinfo() {
        this.authservice.getinfo().then((data: any) => {
        if(data) {
            var alert = this.alertCtrl.create({
                title: data.Name,
                subTitle: data.Email,
                buttons: ['ok']
            });
            alert.present();
        }
            
    })
    }        


  ionViewDidLoad() {
    console.log('Hello Userpage Page');
  }

}
