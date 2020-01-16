import React from 'react';
import { useQuery } from 'react-apollo';
import Button from '@material-ui/core/Button';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import {LOGIN, LOGIN_COOKIE} from '../query/query';
import {LoginCookieData, LoginData, LoginVars} from '../types/types';
import { dispatch } from "../reducers/reducers";
import {Card, Grid, CardMedia, CardContent, makeStyles, Typography} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';

require('dotenv').config();

const LoginButton: React.FC = () => {
  return (
    <Button variant="contained" color="primary" href={process.env.REACT_APP_OFFICELINK}>
      <LockOpenIcon style={{paddingRight: '0.5em'}}/>
      Login
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
    dispatch({type: 'loginUserCookie', user: data.loginCookie.user, jwt: props.code, xp: data.loginCookie.xp});
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
    if (data.login !== null )
      dispatch({type: 'loginUser', user: data.login.user, jwt: data.login.jwt, xp: data.login.xp});
    else
      return (
        <div>
          <Typography variant="h5">
            Error while login
          </Typography>
        </div>
      )
  }
  return (
    <div>
      <CircularProgress/>
      <Typography variant="h5" style={{padding: '1em'}}>It might take a few moments on your first connection</Typography>
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