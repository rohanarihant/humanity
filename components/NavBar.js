import React, {useContext, useEffect} from 'react';
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
import LockOpen from '@material-ui/icons/LockOpen';
import Notifications from '@material-ui/icons/Notifications';
import Search from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsPower from '@material-ui/icons/SettingsPower';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import Accessibility from '@material-ui/icons/Accessibility';
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
import AccountContext from '../contexts/accountContext';
import { toast } from 'react-toastify';
import selectNavBarForUser from '../constants/navBars';

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
  const {account: {isSignedIn, setRoute, setTitle, title, updateSelectedScreen, ItwingRank, setItwingRank, userPermissions}} = useContext(AccountContext);
  const categories = selectNavBarForUser(ItwingRank, userPermissions);
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
  const openRoute = (title, link) => {
    setRoute(link);
	  setTitle(title);
	  updateSelectedScreen(link);
  }
  React.useEffect(() => {
    updateLoginStatus(!localStorage.getItem('userId'));
    !localStorage.getItem('userId') && router.push('/login');
  },[]);
  const onLogout = async() => {
    var conf = confirm(`Are you sure you want to logout?`);
    if(conf){
      localStorage.removeItem('userId')
      localStorage.removeItem('authpassword')
      await localStorage.clear();
      updateLoginStatus(false);
      setItwingRank('');
      router.push('/login');
    }
  }
  const onSearch = () => {
    updateSelectedScreen('Search Member');
    setRoute('searchMember');
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
          <ListItem button key={title} onClick={() => openRoute(route, title)}>
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
            {title}
          </Typography>
          	<Search className={classes.notification} onClick={() => onSearch()} />
          	<Notifications className={classes.notification} />
            {/* onClick={() => router.push('/notifications')} */}
          	{!loginStatus &&
			      <SettingsPower className={classes.logout }onClick={() => onLogout()} />}
        </Toolbar>
      </AppBar>
    </div>
    </div>
  );
}
