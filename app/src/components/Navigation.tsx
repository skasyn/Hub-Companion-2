import React, {useState} from "react";
import { HomePage } from "./HomePage";
import {SettingsPage} from "./SettingsPage";
import {ActivitiesPage} from "./ActivitiesPage";

import { ThemeProvider } from '@material-ui/styles';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {dispatch, useGlobalState} from "../reducers/reducers";
import {lightBlue, red } from "@material-ui/core/colors";
import { createMuiTheme } from '@material-ui/core/styles';

import {
  AppBar,
  Badge,
  createStyles, CssBaseline, Divider,
  Drawer,
  IconButton,
  List,
  ListItem, ListItemIcon, ListItemText, Menu, MenuItem,
  Theme,
  Toolbar,
  Typography
} from "@material-ui/core";

import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import EventNoteIcon from '@material-ui/icons/EventNote';
import TuneIcon from '@material-ui/icons/Tune';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {
  BrowserRouter as Router,
  Route,
  withRouter
} from "react-router-dom";

const drawerWidth = 240;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[800],
    },
    secondary: red
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
    menuItems: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    title: {
      flexGrow: 1,
    },
    selected: {
      backgroundColor: 'red'
    },
  }),
);

const HomeDrawerRoute: React.FC = (props: any) => {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const classes = useStyles();
  const [, setPage] = useGlobalState('currentPage');

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    path: String
  ) => {
    setSelectedIndex(index);
    props.history.push(path);
    setPage(index);
  };
  if (selectedIndex === -1) {
    switch (props.location.pathname) {
      case '/':
        setSelectedIndex(0);
        break;
      case '/activities':
        setSelectedIndex(1);
        break;
      case '/settings':
        setSelectedIndex(2);
        break;
    }
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{paper: classes.drawerPaper}}
    >
      <div className={classes.toolbar}/>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={event => handleListItemClick(event, 0, "/")}
        >
          <ListItemIcon>
            <HomeIcon/>
          </ListItemIcon>
          <ListItemText primary='Home'/>
        </ListItem>
        <Divider/>
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1, "/activities")}
        >
          <ListItemIcon>
            <EventNoteIcon/>
          </ListItemIcon>
          <ListItemText primary='Activities'/>
        </ListItem>
        <Divider/>
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={event => handleListItemClick(event, 2, "/settings")}
        >
          <ListItemIcon>
            <TuneIcon/>
          </ListItemIcon>
          <ListItemText primary='Settings'/>
        </ListItem>
      </List>
    </Drawer>
  );
};

const HomeDrawer = withRouter(HomeDrawerRoute);

const NavBar: React.FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  let notificationNb = 2;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDisconnect = () => {
    dispatch({type: 'disconnect'});
    handleClose();
  };

  return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={notificationNb} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="account of user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem  onClick={handleDisconnect}>
              <ListItemIcon>
                <ExitToAppIcon/>
              </ListItemIcon>
              <ListItemText>Disconnect</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
  );
};

const Content: React.FC = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar}/>
        <Route path="/" exact>
          <HomePage/>
        </Route>
        <Route path="/activities">
          <ActivitiesPage/>
        </Route>
        <Route path="/settings">
          <SettingsPage/>
        </Route>
    </main>
  )
};

export const Navigation: React.FC = () => {
  const classes = useStyles();

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <NavBar/>
          <HomeDrawer/>
          <Content/>
        </div>
      </ThemeProvider>
    </Router>
  );
};