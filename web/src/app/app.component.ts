import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth.service';
import { CoffeeMaker } from './coffee-maker';
import { CoffeemakerDBService } from './coffeemaker-db.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private authService:AuthService,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private coffeemakerDBSvc: CoffeemakerDBService
  ) {
    this.initializeApp();
  }
  doLogin(){
    this.authService.signInWithGoogle()
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.coffeemakerDBSvc.init()
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('coffeemaker/')[1];
    if (path !== undefined) {
      this.selectedIndex = Object.keys(this.coffeemakerDBSvc.coffeeMakers).findIndex(cm => cm.toLowerCase() === path.toLowerCase());
    }
  }
}
