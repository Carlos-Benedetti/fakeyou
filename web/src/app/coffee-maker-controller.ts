import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { CoffeeMaker } from './coffee-maker';
import { CoffeeMakerService } from './coffee-maker.service';
import { CoffeemakerDBService } from './coffeemaker-db.service';

@Injectable({ providedIn: 'root' })
export class CoffeeMakerControllerResolver implements Resolve<CoffeeMakerController> {
    constructor(private coffeemakerDBSvc: CoffeemakerDBService, protected router: Router) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<CoffeeMakerController> {
        const id = route.params.id
        const coffeeMaker = this.coffeemakerDBSvc.coffeeMakers[id]
        if (coffeeMaker) {
            return of(coffeeMaker)
        } else {
            this.router.navigate(['404'])
            return EMPTY
        }
    }
}
export class CoffeeMakerController implements CoffeeMaker {

    constructor(public id: string, public ip: string, public name: string, private coffeeMakerService: CoffeeMakerService) { }
    on() {
        return this.coffeeMakerService.on(this)
    }
    off() {
        return this.coffeeMakerService.off(this)
    }
    toJSON() {
        return { ip: this.ip, name: this.name, id: this.id }
    }
}
