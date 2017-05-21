import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import {Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
public sellingItems:any;
public favItems:any;
username:string;
profilephoto:string;
segment:string;
  constructor(public navCtrl: NavController, public http: Http,public loadingCtrl: LoadingController) {
    this.segment = "selling";
  }
  ionViewDidLoad(){
    let loading = this.loadingCtrl.create({
    spinner: 'crescent'
  });
    loading.present();
       var token =  window.localStorage.getItem('raja');
this.http.get('http://tukasservice.azurewebsites.net/api/user/getinfo?token='+token).subscribe(data => {
              var jsonData = data.json();
            	this.username = jsonData.Name;
              this.profilephoto = jsonData.ProfileImgUrl;
              console.log(jsonData);
            	this.sellingItems = jsonData.SellingProducts;
              this.favItems = jsonData.FavoriteProducts;
              loading.dismiss();
            });
  }

}
