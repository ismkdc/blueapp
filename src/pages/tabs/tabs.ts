import { Component } from '@angular/core';

import { CameraPage } from '../camera/camera';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';

import { Message } from '../message/message';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CameraPage;
  tab3Root = Message;
  tab4Root = ProfilePage;
  constructor() {

  }
}
