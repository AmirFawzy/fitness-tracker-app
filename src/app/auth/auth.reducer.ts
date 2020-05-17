import { AUTHActions, SET_AUTHANTICATED, SET_UNAUTHANTICATED } from './auth.actions';

export interface State {
  isAuthanticated: boolean;
}

const initialState: State = {
  isAuthanticated: false
};

export function authReducer(state = initialState, action: AUTHActions) {
  switch (action.type) {
    case SET_AUTHANTICATED:
      return {
        isAuthanticated: true
      };
    case SET_UNAUTHANTICATED:
      return {
        isAuthanticated: false
      };
    default:
      return state;
  }
}

export const getIsAuthanticated = (state: State) => state.isAuthanticated;
