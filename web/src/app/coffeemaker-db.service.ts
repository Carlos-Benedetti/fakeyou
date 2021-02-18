import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase'
import { CoffeeMaker } from './coffee-maker';
import { CoffeeMakerController } from './coffee-maker-controller';
import { CoffeeMakerService } from './coffee-maker.service';
@Injectable({
  providedIn: 'root'
})
export class CoffeemakerDBService {
  public coffeeMakers: { [id: string]: CoffeeMakerController } = {}
  public user?: firebase.User
  public dbRef?: firebase.database.Reference

  constructor(private coffeeMakerService: CoffeeMakerService){

  }

  init() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user
      this.dbRef = firebase.database().ref('coffeeMakers/' + user.uid)
      this.dbRef.get().then(snapshot => {
        const raw = this.getArrayFromSnapshot(snapshot)
        raw.forEach(cm => {
          this.apendCoffeeMaker(cm);
        })
      })
      this.dbRef.on('value', (snapshot) => {
        const raw = this.getArrayFromSnapshot(snapshot)
        raw.forEach(cm => {
          this.apendCoffeeMaker(cm);
        })
      })
    })
  }
  private getArrayFromSnapshot(snapshot: firebase.database.DataSnapshot) {
    return Array.isArray(snapshot.val())? snapshot.val(): []
  }

  private apendCoffeeMaker(cm: CoffeeMaker) {
    const cmc = this.coffeeMakers[cm.id];
    if (cmc) {
      cmc.id = cm.id;
      cmc.ip = cm.ip;
      cmc.name = cm.name;
    } else {
      this.coffeeMakers[cm.id] = new CoffeeMakerController(cm.id, cm.ip, cm.name,this.coffeeMakerService);
    }
  }

  registerCoffee(coffeeMaker: CoffeeMaker) {
    this.apendCoffeeMaker(coffeeMaker)
    if (this.dbRef) {
      this.dbRef.set(Object.values(this.coffeeMakers).map(i=>i.toJSON()));
    }
  }

}
