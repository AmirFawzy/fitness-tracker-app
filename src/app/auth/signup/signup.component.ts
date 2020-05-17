import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from '../../../../node_modules/rxjs';

import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  matIconDefaultColor: 'red';
  startDate = new Date();
  maxDate = new Date();
  LoggingSupscription: Subscription;
  isLogin = false;

  constructor(private authService: AuthService, private uiService: UiService) { }

  ngOnInit() {
    const maxYear = this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.maxDate = new Date(maxYear);
    this.LoggingSupscription = this.uiService.lodingStateChanged.subscribe((lodingSpinner: boolean) => {
      this.isLogin = lodingSpinner;
    });
  }

  onSubmit(form: NgForm): void {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy() {
    if (this.LoggingSupscription) {
      this.LoggingSupscription.unsubscribe();
    }
  }
}
