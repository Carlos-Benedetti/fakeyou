import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { of, Subject, throwError } from 'rxjs';
import { catchError, delay, finalize, mergeMap, tap } from 'rxjs/operators';
import { CoffeeMaker } from './coffee-maker';
import { RequestLoaderService } from './shared/request-loader/request-loader.service';

@Injectable({
  providedIn: 'root'
})
export class CoffeeMakerService {
  onFinalize = () => finalize(() => this.requestLoaderService.loading = false)
  onCatchError = () => catchError(error => { this.presentToast(); return throwError(error) })
  constructor(private http: HttpClient, public toastController: ToastController, public requestLoaderService: RequestLoaderService) {

  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Falha ao se comunicar com a Cafeteira',
      duration: 2000
    });
    toast.present();
  }

  on(cooffeeMaker: CoffeeMaker) {
    this.requestLoaderService.loading = true
    return this.http.get(`${cooffeeMaker.ip}/on`, { observe: 'response' })
      .pipe(
        this.onFinalize(),
        this.onCatchError()
      )
  }
  off(cooffeeMaker: CoffeeMaker) {
    this.requestLoaderService.loading = true
    return this.http.get(`${cooffeeMaker.ip}/off`,{ observe: 'response' })
      .pipe(
        this.onFinalize(),
        this.onCatchError()
      )
  }
}
