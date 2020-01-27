import React from 'react';
import { PageNotLogged } from './PageNotLogged';
import { Navigation } from '../Student/Navigation';
import {AdminNavigation} from "../Admin/AdminNavigation";
import {dispatch, GlobalStateProvider, useGlobalState} from "../../reducers/reducers";

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
    if (user.privilege === 0)
      return (<Navigation/>);
    else if (user.privilege === 1)
      return (<AdminNavigation/>);
  }
  return (<div>Error</div>);
};

const App: React.FC = () => {
  return (
    <GlobalStateProvider>
      <LoginDispatch/>
    </GlobalStateProvider>
  );
};

export default App;
