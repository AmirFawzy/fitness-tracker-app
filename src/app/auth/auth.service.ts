import { Injectable } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { Subject } from '../../../node_modules/rxjs';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { Store } from '../../../node_modules/@ngrx/store';

import { AuthData } from './auth-data';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // authChange = new Subject<boolean>();
  // private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<fromRoot.State>
  ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // this.isAuthenticated = true;
        // this.authChange.next(true);
        this.store.dispatch(new Auth.SetAuthanticated);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscription();
        // this.authChange.next(false);
        // this.isAuthenticated = false;
        this.store.dispatch(new Auth.SetUnauthanticated);
      }
    });
  }

  registerUser(authData: AuthData) {
    // this.uiService.lodingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading);   // NgRx
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(
      result => {
        // this.uiService.lodingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading);  // NgRx
        console.log(result);
      }
    ).catch(error => {
      // this.uiService.lodingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading);  // NgRx
      this.uiService.showSnackbar(error.message, 'X', 6000);
    });
  }

  login(authData: AuthData) {
    // this.uiService.lodingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading);   // NgRx
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(
      result => {
        // this.uiService.lodingStateChanged.next(false);
        this.store.dispatch(new UI.StopLoading);  // NgRx

        console.log(result);
      }
    ).catch(error => {
      // this.uiService.lodingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading);  // NgRx
      this.uiService.showSnackbar(error.message, 'X', 6000);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    // this.trainingService.cancelSubscription();
    // this.authChange.next(false);
    this.router.navigate(['/']);
    // this.isAuthenticated = false;
  }

  // isAuth(): boolean {
  //   return this.isAuthenticated;
  // }

  // authSuccessfully() {
  //   this.isAuthenticated = true;
  //   this.authChange.next(true);
  //   this.router.navigate(['/training']);
  // }
}
