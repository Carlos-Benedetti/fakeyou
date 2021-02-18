import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoffeeMakerControllerResolver } from '../coffee-maker-controller';

import { CoffeemakerPage } from './coffeemaker.page';

const routes: Routes = [
  {
    path: '',
    component: CoffeemakerPage,
    resolve:{
      coffeeMakerController:CoffeeMakerControllerResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoffeemakerPageRoutingModule {}
