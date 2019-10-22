import React from 'react';
import { useQuery } from 'react-apollo';
import Button from '@material-ui/core/Button';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {LOGIN, LOGIN_COOKIE} from '../query/query';
import {LoginCookieData, LoginData, LoginVars} from '../types/types';
import { dispatch } from "../reducers/reducers";
import Cookies from "universal-cookie";

require('dotenv').config();

const LoginButton: React.FC = () => {
  return (
    <Button variant="contained" color="primary" href={process.env.REACT_APP_OFFICELINK}>
      Login
      <LockOpenIcon/>
    </Button>
  );
};

interface LoadingConnectionProps {
  code: String
}

export const LoadingConnectionCookie: React.FC<LoadingConnectionProps> = (props) => {
  const { data } = useQuery<LoginCookieData, LoginVars>(
    LOGIN_COOKIE,
    { variables: { code: props.code }}
  );
  if (data !== undefined) {
    dispatch({type: 'loginUserCookie', user: data.loginCookie});
  }
  return (
    <div>
      Loading (Cookie)
    </div>
  );
};

export const LoadingConnectionOffice: React.FC<LoadingConnectionProps> = (props) => {
  const { data } = useQuery<LoginData, LoginVars>(
    LOGIN,
    { variables: { code: props.code}}
  );
  if (data !== undefined) {
    dispatch({type: 'loginUser', user: data.login});
  }
  return (
    <div>
      Loading
    </div>
  );
};

export const PageNotLogged: React.FC = () => {
  let query = new URLSearchParams(window.location.search);
  const code = query.get('code');
  const cookies = new Cookies();
  const cookieId = cookies.get<String>('id');

  if (cookieId !== null && cookieId !== undefined && cookieId !== "") {
    return (
      <div>
        <LoadingConnectionCookie code={cookieId}/>
      </div>
    )
  } else if (code != null) {
    return (
      <div>
        <LoadingConnectionOffice code={code}/>
      </div>
    );
  } else {
    return (
      <div>
        <LoginButton/>
      </div>
    );
  }
};