import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {AuthService} from '../login/authservice';


/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class Signup {
newcreds = {
           email: '',
           password: '',
           name: '',
           department: ''
        }
  constructor(public navCtrl: NavController, public authservice: AuthService, public alertCtrl: AlertController) {
     
     
     
    
  }
  
  register(user) {
        this.authservice.adduser(user).then(data => {
            if(data) {
                var alert = this.alertCtrl.create({
                    title: 'Başarılı',
                    subTitle: 'Kulanıcı oluşturuldu!',
                    buttons: ['Tamam']
                });
                alert.present();
            }
            else{
              var alert = this.alertCtrl.create({
                    title: 'Başarısız',
                    subTitle: 'Kullanıcı zaten kayıtlı!',
                    buttons: ['Tamam']
                });
                alert.present();
            }
    });
}


  ionViewDidLoad() {
    console.log('Hello Signup Page');
  }

}
