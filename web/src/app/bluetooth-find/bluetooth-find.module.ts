import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BluetoothFindPageRoutingModule } from './bluetooth-find-routing.module';

import { BluetoothFindPage } from './bluetooth-find.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    BluetoothFindPageRoutingModule
  ],
  declarations: [BluetoothFindPage]
})
export class BluetoothFindPageModule {}
