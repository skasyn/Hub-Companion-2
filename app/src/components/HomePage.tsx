import React from "react";
import {createStyles, Theme} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import {REFRESH} from "../query/mutation";
import Button from "@material-ui/core/Button";
import LockOpenIcon from "@material-ui/core/SvgIcon/SvgIcon";
import { useMutation } from "react-apollo";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flewGrow: 1,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
  })
);

export const HomePage: React.FC = () => {
  const classes = useStyles();
  const [refresh] = useMutation(REFRESH);

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon/>
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Home
          </Typography>
        </Toolbar>
      </AppBar>
      <Button variant="contained" color="primary" onClick={() => {refresh(); }}>
        Refresh
        <LockOpenIcon/>
      </Button>
    </div>
  );
};