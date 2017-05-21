import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController,ToastController,AlertController } from 'ionic-angular';
import {Http, Headers, RequestOptions } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AuthService } from "../login/authservice";
import { LoginPage } from "../login/login";


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
public sellingItems:any;
public favItems:any;
username:string;
profilephoto:string;
ppDefault = "../assets/images/placeholder.png"
  constructor(public navCtrl: NavController, public http: Http,public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public camera: Camera,public toastCtrl: ToastController,public authservice: AuthService,public alertCtrl:AlertController) {
   
  }
  ionViewDidLoad(){
    this.getData();
  }
  getData(){
    let loading = this.loadingCtrl.create({
    spinner: 'crescent'
  });
    loading.present();
       var token =  window.localStorage.getItem('raja');
this.http.get('http://tukasservice.azurewebsites.net/api/user/getinfo?token='+token).subscribe(data => {
              var jsonData = data.json();
            	this.username = jsonData.Name;
              if(jsonData.ProfileImgUrl == null){
                this.profilephoto = this.ppDefault;
              }
              else{
                this.profilephoto = jsonData.ProfileImgUrl;
              }
              console.log(jsonData);
            	this.sellingItems = jsonData.SellingProducts;
              this.favItems = jsonData.FavoriteProducts;
              loading.dismiss();
            });
  }

  changePp() {
   let actionSheet = this.actionSheetCtrl.create({
     title: 'Profil fotoğrafı değiştir',
     buttons: [
       {
         text: 'Kamera',
         handler: () => {
          this.takePhoto();
         }
       },
       {
         text: 'Galeri',
         handler: () => {
         this.pickImage();
         }
       },
       {
         text: 'İptal',
         role: 'cancel',
         handler: () => {
         
         }
       }
     ]
   });

   actionSheet.present();
 }

  takePhoto() {
        this.takeThePhoto(this.camera.PictureSourceType.CAMERA);
    }


 pickImage() {
        this.takeThePhoto(this.camera.PictureSourceType.SAVEDPHOTOALBUM);
    }

  takeThePhoto(pictureSourceType) {
        this.camera.getPicture({
            sourceType: pictureSourceType,
            destinationType: this.camera.DestinationType.FILE_URI,
            quality: 50,
            targetWidth: 720,
            correctOrientation: true,
            encodingType: this.camera.EncodingType.JPEG
        })
            .then(
            imageURI => {
                window['plugins'].crop.promise(imageURI, {
                    quality: 75,
                    keepingAspectRatio: true
                }).then(newPath => {
                 

                        return this.toBase64(newPath).then((base64Img) => {
                            this.profilephoto = base64Img;
                            console.log(base64Img)
                            this.updateProfilePhoto(base64Img);
                            //this.imageData = "data:image/jpeg;base64," + base64Img;
                        });
                    },
                    error => {
                        console.log("CROP ERROR -> " + JSON.stringify(error));
                        alert("CROP ERROR: " + JSON.stringify(error));
                    }
                    );
            },
            error => {
                console.log("CAMERA ERROR -> " + JSON.stringify(error));
                alert("CAMERA ERROR: " + JSON.stringify(error));
            }
            );
    }

    toBase64(url: string) {
        return new Promise<string>(function (resolve) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    resolve(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.send();
        });
    }

    resize(base64Img, width, height) {
         var img = new Image();
        img.src = base64Img;
        var canvas = document.createElement('canvas'),ctx = canvas.getContext('2d');
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 300, 500, width, height);
        return canvas.toDataURL("image/jpeg");
    }
    updateProfilePhoto(image){
      image = image.replace('data:image/jpeg;base64,','');
      var creds = {
        Token: window.localStorage.getItem('raja'),
        Image: image
      };

       let loading = this.loadingCtrl.create({
    spinner: 'crescent'
  });
    loading.present();
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
            this.http.post('http://tukasservice.azurewebsites.net/api/user/updateprofilephoto', creds, {headers: headers}).subscribe(data => {
            console.log(data.json().Result);
                if((data.json().Result.indexOf("success") >= 0)){
                   
                    let toast = this.toastCtrl.create({
    message: 'Profil fotoğrafı güncellendi !',
    duration: 3000,
    position: 'bottom'
  }); 
  loading.dismiss();
  toast.present();
                  
                

                }
                else{
                   let toast = this.toastCtrl.create({
    message: 'Profil fotoğrafı güncellenemedi !',
    duration: 3000,
    position: 'bottom'
  });
  loading.dismiss();
  toast.present();
  

                }
                    
            });
      

    }

    //remove product or favorite product
    remove(id,type){
      var token = window.localStorage.getItem('raja');
        let loading = this.loadingCtrl.create({
    spinner: 'crescent'
  });
    loading.present();
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
            this.http.get('http://tukasservice.azurewebsites.net/api/product/'+type+'?token='+token+'&id='+id, {headers: headers}).subscribe(data => {
            console.log(data.json().Result);
                if((data.json().Result.indexOf("success") >= 0)){
                    /*let toast = this.toastCtrl.create({
    message: 'Profil fotoğrafı güncellendi !',
    duration: 3000,
    position: 'bottom'
  }); */
  this.getData();
  loading.dismiss();
  //toast.present();
                }
                else{
                   let toast = this.toastCtrl.create({
    message: 'Ürün kaldırılamadı !',
    duration: 3000,
    position: 'bottom'
  });
  loading.dismiss();
  toast.present();
  

                }
                    
            });

    }
    settings() {

         let actionSheet = this.actionSheetCtrl.create({
     title: 'Nereye gidiyorsun :(',
     buttons: [
       {
         text: 'Çıkış yap',
        role: 'destructive',
         handler: () => {
         this.authservice.logout();
        debugger;
         this.navCtrl.parent.parent.setRoot(LoginPage);

         }
       },
       {
         text: 'Hakkında',
         handler: () => {
        let alert = this.alertCtrl.create({
        title: 'Blue App',
        subTitle: 'Bu uygulama İsmail Kundakcı tarafından geliştirilmiştir.',
        buttons: ["Tamam"]
    })
   
        alert.present();
         }
       },
       {
         text: 'İptal',
         role: 'cancel',
         handler: () => {
         
         }
       }
     ]
   });

   actionSheet.present();

        
    }

}
