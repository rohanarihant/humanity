import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NavBar from './NavBarBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import {events} from '../utils/apis';
import { useRouter } from 'next/router'
import AccountContext from '../contexts/accountContext';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 22,
    backgroundColor: theme.palette.background.paper,
  },
  listRoot: {
    width: '100%',
    maxWidth: 360,
    padding: 0,
    overflowWrap: 'break-word',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Events() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {account: { getProfileDetails, setRoute, toggleShowLoader }} = useContext(AccountContext);
  const [managementMem, setManagementMem] = useState([{}]);
  const [nationalMem, setNationalMem] = useState([{}]);
  const [stateMem, setStateMem] = useState([{}]);
  const router = useRouter();

  useEffect(() => {
    setManagementMem(JSON.parse(localStorage.getItem('ManagementMem')));
      async function getMyEvents() {
          toggleShowLoader(true);
          const userid = localStorage.getItem('userId')
          const authpassword = localStorage.getItem('authpassword')
          const power = JSON.parse(localStorage.getItem('power'));
          const MemberDetaildet = JSON.parse(localStorage.getItem('MemberDetaildet'));
          const gender = MemberDetaildet && MemberDetaildet[0].usrgen;
          const stateid = MemberDetaildet && MemberDetaildet[0].usrstaid;
          const countryid = MemberDetaildet && MemberDetaildet[0].usrcouid;
          const blockid = MemberDetaildet && MemberDetaildet[0].usrblkid;
          const usrdstid = MemberDetaildet && MemberDetaildet[0].usrdstid;
          const response = await events.getEvents(userid, authpassword, gender, power, countryid, stateid, blockid, new Date().toLocaleDateString());
          toggleShowLoader(false);
      }
      getMyEvents();
  }, []);
  
  return (
    <div className={classes.root}>
    <NavBar />
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Upcoming Events" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Past Events" href="/trash" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <List className={classes.listRoot}>
          {stateMem && stateMem.map((mem) => (
            <>
              <ListItem>
                  <Avatar>
                      <ImageIcon />
                  </Avatar>
                  <ListItemText className={classes.listItem} primary={mem.usrname} secondary={mem.usrmob} />
                  <ListItemText className={classes.listItem} primary={mem.statename} secondary={mem.usrpriemail} />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List className={classes.listRoot}>
          {nationalMem && nationalMem.map((mem) => (
            <>
              <ListItem>
                  <Avatar>
                      <ImageIcon />
                  </Avatar>
                  <ListItemText className={classes.listItem} primary={mem.usrname} secondary={mem.usrmob} />
                  <ListItemText className={classes.listItemSec} primary={mem.statename} secondary={mem.usrpriemail} />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <List className={classes.listRoot}>
          {managementMem && managementMem.map((mem) => (
            <>
              <ListItem>
                  <Avatar>
                      <ImageIcon />
                  </Avatar>
                  <ListItemText className={classes.listItem} primary={mem.usrname} secondary={mem.usrmob} />
                  <ListItemText primary={mem.statename} secondary={mem.usrpriemail} />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </TabPanel>
      <img className="plus-icon" src="/static/img/plus.svg" onClick={() => setRoute('addEvent')} />
    </div>
  );
}
