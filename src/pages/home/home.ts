import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { MessageDetail } from '../messagedetail/messagedetail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public items;
  constructor(public navCtrl: NavController,public http: Http) {
      this.http.get('http://tukasservice.azurewebsites.net/api/product/getproducts').subscribe(data => {
            	
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

}
