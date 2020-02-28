import React from "react";

import { ThemeProvider } from '@material-ui/styles';
import {useGlobalState} from "../../reducers/reducers";

import {
  CssBaseline, Divider,
  Drawer, Hidden,
  List,
  ListItem, ListItemIcon, ListItemText,
} from "@material-ui/core";

import HomeIcon from '@material-ui/icons/Home';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SearchIcon from '@material-ui/icons/Search';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import CommentIcon from '@material-ui/icons/Comment';

import {
  BrowserRouter as Router,
  Route,
  withRouter
} from "react-router-dom";
import {NavBar, navigationTheme, useNavigationStyles} from "../Shared/SharedNavigation";
import {AdminHomePage} from "./AdminHomepage";
import {DataDownloadPage} from "./DataDownloadPage";
import {SearchStudentPage} from "./SearchStudentPage";
import {AdminMakerPage} from "./AdminMakerPage";
import {AdminExperienceProjectPage} from "./AdminExperienceProjectPage";
import {AdminSharingPage} from "./AdminSharingPage";

const Content: React.FC = () => {
  const classes = useNavigationStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar}/>
        <Route path="/" exact>
          <AdminHomePage/>
        </Route>
        <Route path="/search_student">
          <SearchStudentPage/>
        </Route>
        <Route path="/data">
          <DataDownloadPage/>
        </Route>
        <Route path="/admin_maker">
          <AdminMakerPage/>
        </Route>
        <Route path="/admin_experience">
          <AdminExperienceProjectPage/>
        </Route>
        <Route path="/admin_sharing">
          <AdminSharingPage/>
        </Route>
    </main>
  )
};

const HomeDrawerRoute: React.FC = (props: any) => {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const classes = useNavigationStyles();
  const [, setPage] = useGlobalState('currentPage');
  const pages = [
    {path: '/', text: 'Home', icon: (<ListItemIcon><HomeIcon/></ListItemIcon>)},
    {path: '/search_student', text: 'Search Student', icon: (<ListItemIcon><SearchIcon/></ListItemIcon>)},
    {path: '/admin_sharing', text: 'Sharings', icon: (<ListItemIcon><PeopleAltIcon/></ListItemIcon>)},
    {path: '/admin_maker', text: 'Makers', icon: (<ListItemIcon><UnarchiveIcon/></ListItemIcon>)},
    {path: '/admin_experience', text: 'Experience Projects', icon: (<ListItemIcon><CommentIcon/></ListItemIcon>)},
    {path: '/data', text: 'Download Data', icon: (<ListItemIcon><FileCopyIcon/></ListItemIcon>)},
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
                    <Hidden smDown>
                      <ListItemText primary={page['text']}/>
                    </Hidden>
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

export const AdminNavigation: React.FC = () => {
  const classes = useNavigationStyles();

  return (
    <Router>
      <ThemeProvider theme={navigationTheme}>
        <div className={classes.root}>
          <CssBaseline />
          <NavBar showNotifications={false}/>
          <HomeDrawer/>
          <Content/>
        </div>
      </ThemeProvider>
    </Router>
  );
};