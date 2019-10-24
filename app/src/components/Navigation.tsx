import React from "react";

import { ThemeProvider } from '@material-ui/styles';
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useGlobalState } from "../reducers/reducers";

import {lightBlue, red } from "@material-ui/core/colors";
import { createMuiTheme } from '@material-ui/core/styles';

import {
  AppBar,
  Badge,
  createStyles, CssBaseline, Divider,
  Drawer,
  IconButton,
  List,
  ListItem, ListItemIcon, ListItemText,
  Theme,
  Toolbar,
  Typography
} from "@material-ui/core";

import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import EventNoteIcon from '@material-ui/icons/EventNote';
import TuneIcon from '@material-ui/icons/Tune';
import { HomePage } from "./HomePage";
import {SettingsPage} from "./SettingsPage";
import {ActivitiesPage} from "./ActivitiesPage";

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

const HomeDrawer: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const classes = useStyles();
  const [, setPage] = useGlobalState('currentPage');

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setPage(index);
  };

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
          onClick={event => handleListItemClick(event, 0)}
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
          onClick={event => handleListItemClick(event, 1)}
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
          onClick={event => handleListItemClick(event, 2)}
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

const NavBar: React.FC = () => {
  const classes = useStyles();
  let notificationNb = 2;

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
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
  );
};

const Content: React.FC = () => {
  const classes = useStyles();
  const [page] = useGlobalState('currentPage');
  const currentPage = (() => {
    switch (page) {
      case 0:
        return (<HomePage/>);
      case 1:
        return (<ActivitiesPage/>);
      case 2:
        return (<SettingsPage/>);
    }
  })();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar}/>
      {currentPage}
    </main>
  );
};

export const Navigation: React.FC = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <NavBar/>
        <HomeDrawer/>
        <Content/>
      </div>
    </ThemeProvider>
  );
};