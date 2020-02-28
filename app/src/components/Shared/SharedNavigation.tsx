import React, {useState} from "react";
import {useMutation} from "@apollo/react-hooks";
import {dispatch, useGlobalState} from "../../reducers/reducers";
import {
  AppBar,
  Badge,
  Card,
  CardMedia, createStyles, Grid,
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
import DeleteIcon from "@material-ui/icons/Delete";
import DraftsIcon from '@material-ui/icons/Drafts';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import {createMuiTheme, withStyles} from "@material-ui/core/styles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {lightBlue, red} from "@material-ui/core/colors";
import {
  DeleteUserNotificationData, DeleteUserNotificationVars,
  ReadUserNotificationData,
  ReadUserNotificationVars,
  UserMessages
} from "../../types/types";
import {DELETE_USER_NOTIFICATION, READ_USER_NOTIFICATION} from "../../query/mutation";

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

interface NotificationMenuProps {
  setNotificationNb: (value: number) => void
}

const NotificationMenu: React.FC<NotificationMenuProps> = (props) => {
  const [jwt] = useGlobalState('jwt');
  const [user] = useGlobalState('user');
  const [refresh, setRefresh] = useState(0);
  const [readUserNotification] = useMutation<ReadUserNotificationData, ReadUserNotificationVars>(READ_USER_NOTIFICATION);
  const [deleteUserNotification] = useMutation<DeleteUserNotificationData, DeleteUserNotificationVars>(DELETE_USER_NOTIFICATION);

  const handleRead = async (id: number) => {
    await readUserNotification({variables: {jwt: jwt, id: user.notifications[id].id}});
    user.notifications[id].seen = true;
    dispatch({type: 'updateUser', user: user});
    props.setNotificationNb(user.notifications.reduce((acc, notif) => notif.seen ? acc : acc + 1, 0));
    setRefresh(refresh + 1);
  };
  const handleDelete = async (id: number) => {
    await deleteUserNotification({variables: {jwt: jwt, id: user.notifications[id].id}});
    user.notifications.splice(id, 1);
    dispatch({type: 'updateUser', user: user});
    props.setNotificationNb(user.notifications.reduce((acc, notif) => notif.seen ? acc : acc + 1, 0));
    setRefresh(refresh + 1);
  };
  if (user.notifications.length === 0) {
    return (
      <MenuItem disableRipple={true}>
        <Typography variant="h5">No notifications</Typography>
      </MenuItem>
    );
  }
  return (
    <>
    {
      user.notifications.map((notification: UserMessages, id: number) => {
        const date = new Date(Date.parse(notification.date as string));
        return (
          <MenuItem key={id} disableRipple={true} style={{backgroundColor: notification.seen ? 'initial' : 'lightgray'}}>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="body2" display="inline">{notification.author}</Typography>
                      <Typography display="inline"> | {date.toLocaleString('en-GB')}</Typography>
                    </>
                  }
                  secondary={<Typography>{notification.message}</Typography>}
                />
              </Grid>
              <Grid item>
                <IconButton onClick={() => handleRead(id)}>
                  <DraftsIcon/>
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDelete(id)}>
                  <DeleteIcon/>
                </IconButton>
              </Grid>
            </Grid>
          </MenuItem>
        );
      })
    }
    </>
  );
};

interface NavBarProps {
  showNotifications: boolean
}

export const NavBar: React.FC<NavBarProps> = (props) => {
  const classes = useNavigationStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menu, setMenu] = React.useState<number>(-1);
  const open = Boolean(anchorEl);
  const [user] = useGlobalState('user');
  const [notificationNb, setNotificationNb] = React.useState<number>(user.notifications.reduce((acc, notif) => notif.seen ? acc : acc + 1, 0));

  const handleMenu = (event: React.MouseEvent<HTMLElement>, menuType: number) => {
    setAnchorEl(event.currentTarget);
    setMenu(menuType);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setMenu(-1);
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
        {
          props.showNotifications &&
          <IconButton color="inherit" onClick={(event: React.MouseEvent<HTMLElement>) => handleMenu(event, 1)}>
            <Badge badgeContent={notificationNb} color="secondary">
              <NotificationsIcon/>
            </Badge>
          </IconButton>
        }
        <IconButton
          color="inherit"
          aria-label="account of user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={(event: React.MouseEvent<HTMLElement>) => handleMenu(event, 0)}
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
          {menu === 0 &&
            <MenuItem  onClick={handleDisconnect}>
              <ListItemIcon>
                  <ExitToAppIcon/>
              </ListItemIcon>
              <ListItemText>Disconnect</ListItemText>
            </MenuItem>
          }
          {
            menu === 1 &&
              <NotificationMenu setNotificationNb={setNotificationNb}/>
          }
        </Menu>
      </Toolbar>
    </AppBar>
  );
};