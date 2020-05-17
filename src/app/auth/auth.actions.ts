import { Action } from '../../../node_modules/@ngrx/store';

export const SET_AUTHANTICATED = '[AUTH] authanticated';
export const SET_UNAUTHANTICATED = '[AUTH] unauthanticated';

export class SetAuthanticated implements Action {
  readonly type = SET_AUTHANTICATED;
}

export class SetUnauthanticated implements Action {
  readonly type = SET_UNAUTHANTICATED;
}

export type AUTHActions = SetAuthanticated | SetUnauthanticated;
