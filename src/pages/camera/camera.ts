import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Sendproduct } from '../sendproduct/sendproduct';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {
     public current_image: string;

 public imageData: string;


  constructor(public navCtrl: NavController, public camera: Camera, public toastCtrl: ToastController) {
  
    this.current_image = "assets/images/photoholder.jpg";
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
                            this.current_image = base64Img;
                            console.log(base64Img)
                            this.imageData = "data:image/jpeg;base64," + base64Img;
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
    nextPage(){
        if(this.current_image != "assets/images/photoholder.jpg"){
        this.navCtrl.push(Sendproduct,{
            image: this.current_image
        })
    }
    else{
        let toast = this.toastCtrl.create({
    message: 'Lütfen fotoğraf ekleyin !',
    duration: 3000,
    position: 'bottom'
  }); 
  toast.present();

    }
    }

}
