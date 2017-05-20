import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
public items:any;
username:string;
profilephoto:string;
  constructor(public navCtrl: NavController, public http: Http) {
  
   var token =  window.localStorage.getItem('raja');
this.http.get('http://tukasservice.azurewebsites.net/api/user/getinfo?token='+token).subscribe(data => {
              var jsonData = data.json();
            	this.username = jsonData.Name;
              this.profilephoto = jsonData.ProfileImgUrl;
              console.log(jsonData);
            	this.items = jsonData.SellingProducts;
              console.log(this.items);
            });
  }

}
