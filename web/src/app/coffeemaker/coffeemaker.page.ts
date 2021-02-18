import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, IonDatetime, LoadingController } from '@ionic/angular';
import { tap } from 'rxjs/operators'
import * as moment from 'moment';
import { CoffeeMakerController } from '../coffee-maker-controller';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-coffeemaker',
  templateUrl: './coffeemaker.page.html',
  styleUrls: ['./coffeemaker.page.scss'],
})
export class CoffeemakerPage implements OnInit {
  @ViewChild('executionTime', { static: false }) executionTime: IonDatetime
  public timerpassed: number
  public done = false
  public coffeeIntent: CoffeeIntent;
  private coffeeMakerController: CoffeeMakerController;
  loading: HTMLIonLoadingElement;
  constructor(public actionSheetController: ActionSheetController, private activatedRoute: ActivatedRoute, public loadingController: LoadingController) { }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      spinner: 'circular',
    });
    this.loading.present();
  }
  async ngOnInit() {
    await this.presentLoading()
    this.getQueryParans().subscribe(() => {
      this.loadPage()
    })
  }
  async loadPage() {
    this.loading.dismiss();

  }

  getQueryParans() {
    return this.activatedRoute.data.pipe(
      tap(({ coffeeMakerController }) => {
        this.coffeeMakerController = coffeeMakerController as CoffeeMakerController
      })
    )
  }
  async forceActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Forçar Ação',
      buttons: [{
        text: 'Desligar',
        icon: 'trash',
        cssClass: 'btn-cofee off',
        handler: () => {
          this.coffeeMakerController.off().subscribe()
        }
      }, {
        text: 'Ligar',
        icon: 'share',
        cssClass: 'btn-cofee on',
        handler: () => {
          this.coffeeMakerController.on().subscribe()
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {

        }
      }]
    });
    await actionSheet.present();
  }
  startCoffee() {
    this.coffeeMakerController.on().subscribe(() => {
      const executionTimerTime = new Date(this.executionTime.value)
      const endTime = moment()

      endTime.add(executionTimerTime.getMinutes(), 'minutes')
      endTime.add(executionTimerTime.getSeconds(), 'seconds')

      console.log(moment().diff(endTime))
      this.coffeeIntent = new CoffeeIntent(moment(), endTime, this.coffeeMakerController);
    })
  }
  endCoffee() {
    this.coffeeMakerController.off().subscribe(() => {
      if (this.coffeeIntent) {
        this.coffeeIntent.done = true
      }
    })
  }
}
export class CoffeeIntent {
  private _done = false;
  public get done() {
    return this._done;
  }
  public set done(value) {
    if (value !== this._done && value === false) {
      this.coffeeMakerController.off().subscribe(() => {
        this._done = false;
      })
    } else {
      this._done = value;
    }



  }
  public timerpassed = 0
  public timeRemaning
  timer: any;
  constructor(public startTime: moment.Moment, public endTime: moment.Moment, private coffeeMakerController: CoffeeMakerController) {
    this.timer = setInterval(() => this.calculateTimer(), 1000)
    this.coffeeMakerController.on()
  }

  calculateTimer() {
    this.timerpassed = (moment().unix() - this.startTime.unix()) / (this.endTime.unix() - this.startTime.unix())
    this.timeRemaning = this.endTime.diff(moment(), 'seconds')
    if (this.timerpassed >= 1) {
      this.done = true
      clearInterval(this.timer)
    }
  }
}
