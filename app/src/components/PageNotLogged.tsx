import React from 'react';
import { useQuery } from 'react-apollo';
import Button from '@material-ui/core/Button';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {LOGIN, LOGIN_COOKIE} from '../query/query';
import {LoginCookieData, LoginData, LoginVars} from '../types/types';
import { dispatch } from "../reducers/reducers";
import { Card, Grid, CardMedia, CardContent, makeStyles } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';

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
      <CircularProgress/>
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
      <CircularProgress/>
    </div>
  );
};

const useStyles = makeStyles({
  card: {
    maxWidth: 700,
  },
  cardContent: {
    textAlign: 'center',
  },
  media: {
    height: 110,
    width: 652,
  },
  root: {
    flexGrow: 1,
  }
});

const CardNotLoggedContent: React.FC = () => {
  let query = new URLSearchParams(window.location.search);
  const code = query.get('code');
  const cookieId = /(; |^)(id=([^;]*))/gm.exec(window.document.cookie);

  if (cookieId !== null && cookieId !== undefined && cookieId[3] !== "") {
    return (
        <div>
          <LoadingConnectionCookie code={cookieId[3]}/>
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

const ConnectionDispatch: React.FC = () => {
  const classes = useStyles();

  return(
      <Card className={classes.card} elevation={0}>
        <CardMedia
            className={classes.media}
            image={require('../assets/hub_companion_2.png')}
        />
        <CardContent className={classes.cardContent}>
          <CardNotLoggedContent/>
        </CardContent>
      </Card>
  );
};

export const PageNotLogged: React.FC = () => {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <Grid
            container={true}
            spacing={3}
            alignItems="center"
            direction="column"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
          <Grid item xs={12}>
            <ConnectionDispatch/>
          </Grid>
        </Grid>
      </div>
  )
};