import { User } from '../types/types';
import { createStore } from 'react-hooks-global-state';

const InitialState = {
  user: {} as User,
  error: false,
  loading: false,
  currentPage: 0 as Number,
  jwt: "" as String
};

export type Action =
  | { type: 'loginUser', user: User, jwt: String }
  | { type: 'loginUserCookie', user: User, jwt: String }
  | { type: 'changePage', page: Number }
  | { type: 'disconnect' };

export const { GlobalStateProvider, dispatch, useGlobalState } = createStore(
  (state, action: Action) => {
    switch (action.type) {
      case 'loginUser': {
        let date = new Date();
        date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
        document.cookie = "id = " + action.jwt + "; expires = " + date.toString();
        window.history.pushState({}, document.title, '/');
        return {
          ...state,
          user: action.user,
          jwt: action.jwt
        };
      }
      case 'loginUserCookie': {
        return {
          ...state,
          user: action.user,
          jwt: action.jwt
        };
      }
      case 'disconnect': {
        document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        return InitialState;
      }
      case 'changePage': {
        return {
          ...state,
          currentPage: action.page
        };
      }
      default: return state;
    }
  },
  {
    user: {} as User,
    error: false,
    loading: false,
    currentPage: 0 as Number,
    jwt: "" as String
  },
);