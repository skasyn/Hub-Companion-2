import React from "react";

import { ThemeProvider } from '@material-ui/styles';
import {useGlobalState} from "../../reducers/reducers";

import {
  CssBaseline, Divider,
  Drawer,
  List,
  ListItem, ListItemIcon, ListItemText,
} from "@material-ui/core";

import HomeIcon from '@material-ui/icons/Home';

import {
  BrowserRouter as Router,
  Route,
  withRouter
} from "react-router-dom";
import {NavBar, navigationTheme, useNavigationStyles} from "../Shared/SharedNavigation";
import {AdminHomePage} from "./AdminHomepage";

const Content: React.FC = () => {
  const classes = useNavigationStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar}/>
        <Route path="/" exact>
          <AdminHomePage/>
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

export const AdminNavigation: React.FC = () => {
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