import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '../../../node_modules/@ngrx/store';
import { take } from '../../../node_modules/rxjs/operators';

import { AuthService } from './auth.service';
import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router, private store: Store<fromRoot.State>) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.store.select(fromRoot.getIsAuthaticated).pipe(take(1));
    // if (this.authService.isAuth()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/signin']);
    // }
  }

  canLoad(route: Route) {
    return this.store.select(fromRoot.getIsAuthaticated).pipe(take(1));
    // if (this.authService.isAuth()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/signin']);
    // }
  }
}
