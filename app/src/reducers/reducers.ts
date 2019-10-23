import { User } from '../types/types';
import { createStore } from 'react-hooks-global-state';

export type Action =
  | { type: 'loginUser', user: User }
  | { type: 'loginUserCookie', user: User };

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
      default: return state;
    }
  },
  {
    user: {} as User,
    error: false,
    loading: false,
  },
);