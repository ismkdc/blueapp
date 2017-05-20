import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from "@angular/http";


import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { CameraPage } from '../pages/camera/camera';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {AuthService} from '../pages/login/authservice';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { Message } from '../pages/message/message';
import { MessageDetail } from '../pages/messagedetail/messagedetail';

@NgModule({
  declarations: [
    MyApp,
    Message,
    MessageDetail,
    ProfilePage,
    HomePage,
    TabsPage,
    LoginPage,
    Signup,
    CameraPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Message,
    MessageDetail,
    ProfilePage,
    HomePage,
    TabsPage,
    LoginPage,
    Signup,
    CameraPage
  ],
  providers: [
    StatusBar,
    AuthService,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
