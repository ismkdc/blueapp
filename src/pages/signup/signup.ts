import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { AuthService } from '../login/authservice';
import { LoginPage } from "../login/login";


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
  constructor(public navCtrl: NavController, public authservice: AuthService, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
     
     
     
    
  }
  
  register(user) {
      let loading = this.loadingCtrl.create({
    spinner: 'crescent'
  });
    loading.present();
        this.authservice.adduser(user).then(data => {
            if(data) {
                var alert = this.alertCtrl.create({
                    title: 'Başarılı',
                    subTitle: 'Kulanıcı oluşturuldu!',
                    buttons: ['Tamam']
                });
                alert.present();
                this.navCtrl.push(LoginPage);
                loading.dismiss();
            }
            else{
               loading.dismiss();
              var alert = this.alertCtrl.create({
                    title: 'Başarısız',
                    subTitle: 'Kullanıcı zaten kayıtlı!',
                    buttons: ['Tamam']
                });
               
                alert.present();
                
            }
    });
}
signin(){
     this.navCtrl.setRoot(LoginPage);
}

  ionViewDidLoad() {
    console.log('Hello Signup Page');
  }

}
