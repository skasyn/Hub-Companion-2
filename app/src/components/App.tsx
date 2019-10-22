import React from 'react';
import { StrictMode } from 'react';
import '../styles/App.css';
import { PageNotLogged } from './PageNotLogged';
import { HomePage } from './HomePage';
import { GlobalStateProvider, useGlobalState } from "../reducers/reducers";


const LoginDispatch: React.FC = () => {
  const [user] = useGlobalState('user');

  console.log('there ?');
  if (Object.keys(user).length === 0) {
    return (
      <PageNotLogged/>
    )
  } else {
    return (
      <HomePage/>
    );
  }
};

const App: React.FC = () => {
  return (
    <StrictMode>
      <GlobalStateProvider>
        <div>
          <LoginDispatch/>
        </div>
      </GlobalStateProvider>
    </StrictMode>
  );
};

export default App;
