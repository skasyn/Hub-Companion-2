import React, {useState} from "react";
import { HomePage } from "./HomePage";
import {SettingsPage} from "./SettingsPage";
import {ActivitiesPage} from "./ActivitiesPage";
import {CalendarPage} from "./CalendarPage";

import { ThemeProvider } from '@material-ui/styles';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {dispatch, useGlobalState} from "../reducers/reducers";
import {lightBlue, red } from "@material-ui/core/colors";
import {createMuiTheme, withStyles} from '@material-ui/core/styles';
import HubLogoSvg from '../assets/hubcompanionlogo.svg';

import {
  AppBar,
  Badge, Card, CardMedia,
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
import EventIcon from '@material-ui/icons/Event';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import CommentIcon from '@material-ui/icons/Comment';

import {
  BrowserRouter as Router,
  Route,
  withRouter
} from "react-router-dom";
import {SharingPage} from "./SharingPage";
import {MakerPage} from "./MakerPage";
import {ExperienceProjectPage} from "./ExperienceProjectPage";

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

const StyledBadge = withStyles({
  badge: {
    padding: '5px'
  }
})(Badge);

const HomeDrawerRoute: React.FC = (props: any) => {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const classes = useStyles();
  const [, setPage] = useGlobalState('currentPage');
  const [user] = useGlobalState('user');
  const pages = [
    {path: '/', text: 'Home', icon: (<ListItemIcon><HomeIcon/></ListItemIcon>)},
    {path: '/activities', text: 'Activities', icon: (<ListItemIcon><EventNoteIcon/></ListItemIcon>)},
    {path: '/calendar', text: 'Calendar', icon: (<ListItemIcon><EventIcon/></ListItemIcon>)},
    {path: '/sharing', text: 'Sharing', icon: (<ListItemIcon><PeopleAltIcon/></ListItemIcon>)},
    {path: '/maker', text: 'Maker', icon: (<ListItemIcon><UnarchiveIcon/></ListItemIcon>)},
    {path: '/experience', text: 'Experience Project', icon: (<ListItemIcon><CommentIcon/></ListItemIcon>)},
    {path: '/settings', text: 'Settings', icon: (<ListItemIcon><StyledBadge badgeContent={(user.year !== 0 && user.plan !== -1) ? 0 : ""} color="secondary" variant="dot"><TuneIcon/></StyledBadge></ListItemIcon>)}
  ];

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
    setSelectedIndex(pages.findIndex((page) => page['path'] === props.location.pathname));
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{paper: classes.drawerPaper}}
    >
      <div className={classes.toolbar}/>
      <List component="nav" aria-label="main mailbox folders">
        {
          pages.map((page, index) => {
            return (
              <div key={index}>
                <ListItem
                  button
                  selected={selectedIndex === index}
                  onClick={event => handleListItemClick(event, index, page['path'])}
                >
                  {page.icon}
                  <ListItemText primary={page['text']}/>
                </ListItem>
                <Divider/>
              </div>
            );
          })
        }
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
          <Card style={{borderRadius: '15px'}}>
            <CardMedia
              style={{width: '50px', height: '50px', padding: '5px'}}
              src={HubLogoSvg}
              component="img"
              />
          </Card>
          <Typography variant="h6" className={classes.title} style={{marginLeft: '10px'}}>
            Hub Companion
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
        <Route path="/calendar">
          <CalendarPage/>
        </Route>
        <Route path="/sharing">
          <SharingPage/>
        </Route>
        <Route path="/maker">
          <MakerPage/>
        </Route>
        <Route path="/experience">
          <ExperienceProjectPage/>
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