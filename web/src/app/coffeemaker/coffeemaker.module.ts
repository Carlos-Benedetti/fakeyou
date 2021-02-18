import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoffeemakerPageRoutingModule } from './coffeemaker-routing.module';

import { CoffeemakerPage } from './coffeemaker.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CoffeemakerPageRoutingModule,
  ],
  declarations: [CoffeemakerPage]
})
export class CoffeemakerPageModule {}
