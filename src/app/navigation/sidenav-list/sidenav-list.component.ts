import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription, Observable } from '../../../../node_modules/rxjs';
import { Store } from '../../../../node_modules/@ngrx/store';

import { AuthService } from '../../auth/auth.service';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter();
  insAuth$: Observable<boolean>;
  // insAuth: boolean;
  // supscribtion: Subscription;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.insAuth$ = this.store.select(fromRoot.getIsAuthaticated);
    // this.supscribtion = this.authService.authChange.subscribe((authStatus) => {
    //   this.insAuth = authStatus;
    // });
  }

  sidenavClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.authService.logout();
    this.sidenavClose();
  }

  ngOnDestroy() {
    // this.supscribtion.unsubscribe();
  }
}
