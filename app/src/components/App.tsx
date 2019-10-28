import React from 'react';
import '../styles/App.css';
import { PageNotLogged } from './PageNotLogged';
import { Navigation } from './Navigation';
import { GlobalStateProvider, useGlobalState } from "../reducers/reducers";

const LoginDispatch: React.FC = () => {
  const [user] = useGlobalState('user');

  if (Object.keys(user).length === 0) {
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
