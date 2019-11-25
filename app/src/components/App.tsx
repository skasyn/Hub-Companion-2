import React from 'react';
import { PageNotLogged } from './PageNotLogged';
import { Navigation } from './Navigation';
import {dispatch, GlobalStateProvider, useGlobalState} from "../reducers/reducers";

const LoginDispatch: React.FC = () => {
  const [user] = useGlobalState('user');

  if (user === undefined || user === null || Object.keys(user).length === 0) {
    if (user === undefined || user === null) {
      dispatch({type: 'disconnect'});
    }
    return (
        <PageNotLogged/>
    );
  } else {
    return (
      <Navigation/>
    );
  }
};

const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <LoginDispatch/>
    </GlobalStateProvider>
  );
};

export default App;
