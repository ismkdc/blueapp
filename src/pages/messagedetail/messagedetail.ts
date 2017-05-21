import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers, RequestOptions } from '@angular/http';
/**
 * Generated class for the Message page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-messagedetail',
  templateUrl: 'messagedetail.html',
})
export class MessageDetail   {
public items:any;
username:string;
conId:number;
messagetext:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
   
 
  }
  sendmsg()
  {

    var token =  window.localStorage.getItem('raja');
    
this.http.get('http://tukasservice.azurewebsites.net/api/message/sendmessage?conId='+this.conId+'&token='+token+'&msg='+this.messagetext).subscribe(data => {

  this.conId = data.json().Result;
  
  this.getmsg();
            });
            this.messagetext = "";
  }
  getmsg()
  {

    var token =  window.localStorage.getItem('raja');
this.http.get('http://tukasservice.azurewebsites.net/api/message/getmessages?conId='+this.conId+'&token='+token).subscribe(data => {
              var jsonData = data.json();
              console.log(jsonData);
            	this.items = jsonData;
              this.username = jsonData[0].UserName;
      
              console.log(this.items);
            });
  }

  ionViewDidLoad() {
    if(this.navParams.get('username') != null)
    {
      this.username = this.navParams.get('username');
      this.conId = this.navParams.get('id')*-1;
    }
    else
    {
      this.conId = this.navParams.get('id');
      this.getmsg();
    }
     
  }

}
