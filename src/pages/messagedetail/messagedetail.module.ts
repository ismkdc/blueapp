import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageDetail } from './messagedetail';

@NgModule({
  declarations: [
    MessageDetail,
  ],
  imports: [
    IonicPageModule.forChild(MessageDetail),
  ],
  exports: [
    MessageDetail
  ]
})
export class MessageModule {}
