import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Person from '@material-ui/icons/Person';
import AcUnit from '@material-ui/icons/AcUnit';
import Group from '@material-ui/icons/Group';
import Info from '@material-ui/icons/Info';
import LiveTv from '@material-ui/icons/LiveTv';
import Notifications from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsPower from '@material-ui/icons/SettingsPower';
import ExitToApp from '@material-ui/icons/ExitToApp';
import BugReport from '@material-ui/icons/BugReport';
import EventAvailable from '@material-ui/icons/EventAvailable';
import PostAdd from '@material-ui/icons/PostAdd';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router'

// const useStyles = makeStyles({
// root: {
// flexGrow: 1,
// },
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: 'auto',
//   },
// });
const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
	},
	menuButton: {
	  marginRight: theme.spacing(2),
	},
	title: {
	  flexGrow: 1,
	},
	notification : {
		marginRight: 15,
	}
  }));

export default function TemporaryDrawer() {
  const router = useRouter();
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [open, setOpen] = React.useState(false);
  const [loginStatus, updateLoginStatus] = React.useState(false);
  const categories = [
	  {title: 'My Profile', icon: <Person />, route: '/profile'},
	  {title: 'Escalation', icon: <AcUnit />, route: '/escalation'},
	  {title: 'My District Team', icon: <Group />, route: '/team'},
	  {title: 'Add Sewa', icon: <PostAdd />, route: '/sewa'},
	  {title: 'My Hazri Details', icon: <LibraryAdd />, route: '/my-hazri'},
	  {title: 'Useful Information', icon: <Info />, route: '/info'},
	  {title: 'Events', icon: <EventAvailable />, route: '/events'},
	  {title: 'Issues', icon: <BugReport />, route: '/issues'},
	  {title: 'Broadcast', icon: <LiveTv />, route: '/broadcast'},
	  {title: 'Logout', icon: <ExitToApp />, route: '/logout'},
  ];
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

	// setState({ ...state, [anchor]: open });
	setOpen(open)
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const openRoute = (link) => {
	  router.push(link);
  }
  React.useEffect(() => {
    updateLoginStatus(localStorage.getItem('login'));
  },[]);
  const onLogout = () => {
    localStorage.setItem('login', false);
    updateLoginStatus(false);
    router.push('/login');
  }
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {categories.map(({title, icon, route}) => (
          <ListItem button key={title} onClick={() => openRoute(route)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={open} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
	  ))}
	  <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={handleDrawerOpen} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Humanity
          </Typography>
          	<Notifications className={classes.notification}/>
          	{!loginStatus ? 
            <AccountCircle className={classes.notification} onClick={() => router.push('/login')} />
            :
			      <SettingsPower className={classes.logout} onClick={() => onLogout()} />}
        </Toolbar>
      </AppBar>
    </div>
    </div>
  );
}
