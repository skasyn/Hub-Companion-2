import React, {useState} from "react";
import {dispatch} from "../../reducers/reducers";
import {
  AppBar,
  Badge,
  Card,
  CardMedia, createStyles,
  IconButton,
  ListItemIcon, ListItemText,
  Menu,
  MenuItem, Theme,
  Toolbar,
  Typography
} from "@material-ui/core";
import HubLogoSvg from "../../assets/hubcompanionlogo.svg";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {createMuiTheme, withStyles} from "@material-ui/core/styles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {lightBlue, red} from "@material-ui/core/colors";

export const navigationTheme = createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[800],
    },
    secondary: red
  },
});

export const useNavigationStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      [theme.breakpoints.down('md')]: {
        width: 60
      },
      [theme.breakpoints.up('md')]: {
        width: 240
      },
      flexShrink: 0,
    },
    drawerPaper: {
      [theme.breakpoints.down('md')]: {
        width: 60
      },
      [theme.breakpoints.up('md')]: {
        width: 240
      },
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

export const StyledBadge = withStyles({
  badge: {
    padding: '5px'
  }
})(Badge);


export const NavBar: React.FC = () => {
  const classes = useNavigationStyles();
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