import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Platform } from '@ionic/angular';
const auth = firebase.default.auth
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        public angularFire: AngularFireAuth,
        public platform: Platform,
        public afAuth: AngularFireAuth
    ) { }

    signInWithGoogle() {
        const provider = new auth.GoogleAuthProvider();
        const scopes = ['profile', 'email'];
        return this.socialSignIn(provider.providerId, scopes);
    }

    socialSignIn(providerName: string, scopes?: Array<string>): Promise<any> {
        const provider = new auth.OAuthProvider(providerName);

        // add any permission scope you need
        if (scopes) {
            scopes.forEach(scope => {
                provider.addScope(scope);
            });
        }

        if (this.platform.is('desktop')) {
            return this.angularFire.signInWithPopup(provider);
        } else {
            // web but not desktop, for example mobile PWA
            return this.angularFire.signInWithRedirect(provider);
        }
    }
}