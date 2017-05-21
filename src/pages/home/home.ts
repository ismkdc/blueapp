import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { MessageDetail } from '../messagedetail/messagedetail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public items;
public token = window.localStorage.getItem('raja');
  constructor(public navCtrl: NavController,public http: Http, public loadingCtrl: LoadingController) {
      let loading = this.loadingCtrl.create({
    spinner: 'crescent',
    content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box"></div>
      </div>`
    
  });
    loading.present();
    this.http.get('http://tukasservice.azurewebsites.net/api/product/getproducts?token='+this.token).subscribe(data => {
            	
              console.log(data.json());
            	this.items = data.json();
              loading.dismiss();
            });
  }
  ionViewDidLoad() {
     this.http.get('http://tukasservice.azurewebsites.net/api/product/getproducts?token='+this.token).subscribe(data => {
            	
              console.log(data.json());
            	this.items = data.json();
            });
  }
  msg(userId, name)
  {
     this.navCtrl.push(MessageDetail,{
            id: userId,
            username : name
          });
  }
  fav(id, event){
     var target = event.target || event.srcElement || event.currentTarget;

     if( target.attributes.style.value.indexOf("red") >= 0)
     {
        target.attributes.style.value =  target.attributes.style.value.replace('red','black');
     }
     else{
           target.attributes.style.value = target.attributes.style.value.replace('black','red');
     }

       
      var token = window.localStorage.getItem('raja');
      this.http.get('http://tukasservice.azurewebsites.net/api/product/addfavorite?token='+token+'&id='+id).subscribe(data => {
            
            });
    }
   
  

}
