import { User } from '../types/types';
import { createStore } from 'react-hooks-global-state';

const InitialState = {
  user: {} as User,
  error: false,
  loading: false,
  currentPage: 0 as Number
};

export type Action =
  | { type: 'loginUser', user: User }
  | { type: 'loginUserCookie', user: User }
  | { type: 'changePage', page: Number }
  | { type: 'disconnect' };

export const { GlobalStateProvider, dispatch, useGlobalState } = createStore(
  (state, action: Action) => {
    switch (action.type) {
      case 'loginUser': {
        let date = new Date();
        date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
        document.cookie = "id = " + action.user.id + "; expires = " + date.toString();
        window.history.pushState({}, document.title, '/');
        return {
          ...state,
          user: action.user
        };
      }
      case 'loginUserCookie': {
        return {
          ...state,
          user: action.user
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
    currentPage: 0 as Number
  },
);