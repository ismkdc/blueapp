import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { Sendproduct } from './sendproduct';

@NgModule({
  declarations: [
    Sendproduct,
  ],
  imports: [
    IonicPageModule.forChild(Sendproduct),
  ],
  exports: [
    Sendproduct
  ]
})
export class SendproductModule {}
