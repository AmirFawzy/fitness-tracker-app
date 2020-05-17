import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription, Observable } from '../../../../node_modules/rxjs';
import { Store } from '../../../../node_modules/@ngrx/store';

import { AuthService } from '../../auth/auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSidenav = new EventEmitter();
  isAuth$: Observable<boolean>;
  // isAuth: boolean;
  // subscription: Subscription;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // this.subscription = this.authService.authChange.subscribe((authState: boolean) => {
    //   this.isAuth = authState;
    // });
    this.isAuth$ = this.store.select(fromRoot.getIsAuthaticated);
  }

  sideNavToggle(): void {
    this.toggleSidenav.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
