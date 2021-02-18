import { Component, OnInit } from '@angular/core';
import { v4 } from 'uuid';
import { CoffeemakerDBService } from '../coffeemaker-db.service';

@Component({
  selector: 'app-bluetooth-find',
  templateUrl: './bluetooth-find.page.html',
  styleUrls: ['./bluetooth-find.page.scss'],
})
export class BluetoothFindPage implements OnInit {

  constructor(private coffeemakerDBSvc: CoffeemakerDBService) { }

  ngOnInit() {
  }
  addCoffeeMaker() {
    this.coffeemakerDBSvc.registerCoffee({ ip: "192.168.0.101", name: "Cafeteira Teste", id:v4() })
  }

}
