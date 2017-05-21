import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { MessageDetail } from '../messagedetail/messagedetail';
import {Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class Message {
public items:any;
  messagePage = MessageDetail;
  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController) {

  }
    ionViewDidEnter()
  {
    let loading = this.loadingCtrl.create({
    spinner: 'crescent'
  });
    loading.present();
    var token =  window.localStorage.getItem('raja');
this.http.get('http://tukasservice.azurewebsites.net/api/message/getconversations?token='+token).subscribe(data => {
              var jsonData = data.json();
              console.log(jsonData);
            	this.items = jsonData;
              console.log(this.items);
              loading.dismiss();
            });
  }
  pushMessage(id){
    // push another page onto the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.

    this.navCtrl.push(MessageDetail,{
            id: id
          });
  }


}
