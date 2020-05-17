import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { Subscription, Observable } from '../../../../node_modules/rxjs';
import { Store } from '../../../../node_modules/@ngrx/store';

import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
  LoggingSupscription: Subscription;
  // isLogin = false;
  isLogin$: Observable<boolean>;  // controled by NgRx

  constructor(private authService: AuthService, private uiService: UiService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isLogin$ = this.store.select(fromRoot.getIsLoading);
    // this.LoggingSupscription = this.uiService.lodingStateChanged.subscribe((lodingSpinner: boolean) => {
    //   this.isLogin = lodingSpinner;
    // });
  }

  onSubmit(form: NgForm): void {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy() {
    // if (this.LoggingSupscription) {
    //   this.LoggingSupscription.unsubscribe();
    // }
  }
}
