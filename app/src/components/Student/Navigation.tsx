import React from "react";
import { HomePage } from "./HomePage";
import {SettingsPage} from "./SettingsPage";
import {ActivitiesPage} from "./ActivitiesPage";
import {CalendarPage} from "./CalendarPage";

import { ThemeProvider } from '@material-ui/styles';
import {useGlobalState} from "../../reducers/reducers";

import {
  CssBaseline, Divider,
  Drawer,
  List,
  ListItem, ListItemIcon, ListItemText,
} from "@material-ui/core";

import HomeIcon from '@material-ui/icons/Home';
import EventNoteIcon from '@material-ui/icons/EventNote';
import TuneIcon from '@material-ui/icons/Tune';
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
import {NavBar, navigationTheme, StyledBadge, useNavigationStyles} from "../Shared/SharedNavigation";

const Content: React.FC = () => {
  const classes = useNavigationStyles();

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

const HomeDrawerRoute: React.FC = (props: any) => {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const classes = useNavigationStyles();
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

export const Navigation: React.FC = () => {
  const classes = useNavigationStyles();

  return (
    <Router>
      <ThemeProvider theme={navigationTheme}>
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