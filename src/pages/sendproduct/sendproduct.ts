import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import { HomePage } from '../home/home';
import { CameraPage } from '../camera/camera';

/**
 * Generated class for the Sendproduct page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sendproduct',
  templateUrl: 'sendproduct.html',
})
export class Sendproduct {
  public image;
  product = {
  title: '', 
  price: '',
  token: '',
  image: '',
  }
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.image = this.navParams.get('image');
    this.product.image = this.navParams.get('image').replace('data:image/jpeg;base64,','');
    this.product.token = window.localStorage.getItem('raja');
    console.log(this.product);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Sendproduct');
  }
  addProduct(item){
    let loading = this.loadingCtrl.create({
    spinner: 'crescent',
    content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box"></div>
      </div>`
    
  });
    loading.present();
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
            this.http.post('http://tukasservice.azurewebsites.net/api/product/sellproduct', item, {headers: headers}).subscribe(data => {
            console.log(data.json().Result);
                if((data.json().Result.indexOf("success") >= 0)){
                   
                    let toast = this.toastCtrl.create({
    message: 'Ürün başarıyla eklendi !',
    duration: 3000,
    position: 'bottom'
  }); 
  loading.dismiss();
  toast.present();
                  
                  this.navCtrl.setRoot(CameraPage);
                  this.navCtrl.parent.select(0);

                }
                else{
                   let toast = this.toastCtrl.create({
    message: 'Ürün Eklenemedi Bir Hata Var !',
    duration: 3000,
    position: 'bottom'
  });
  loading.dismiss();
  toast.present();
  

                }
                    
            });
      

  }

}
