import React, { useEffect, useState, useContext } from 'react';
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
import { events, searchUsers } from '../utils/apis';
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
  const { account: { getProfileDetails, setRoute, toggleShowLoader, saveSelectedEvent, setUserRoles, userRoles } } = useContext(AccountContext);
  const [managementMem, setManagementMem] = useState([{}]);
  const [nationalMem, setNationalMem] = useState([{}]);
  const [stateMem, setStateMem] = useState([{}]);
  const [eventsList, setEventsList] = useState([]);
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
      const response = await events.getEvents(userid, authpassword, gender, power, countryid, stateid, blockid, new Date().toLocaleDateString());
      response.success && setEventsList(response.eventslist);
      const res = await searchUsers.getUserRoles();
      res.success && setUserRoles(res.myrole);
      toggleShowLoader(false);
    }
    getMyEvents();
  }, []);
  const getImage = (userId) => {
    const image = `http://humanity.rubrutech.com/profileimage/${userId}.jpg`;
    return image;
  }
  const addDefaultSrc = (ev) => {
    ev.target.src = './static/img/head.png';
  }
  const getEventDetail = (event) => {
    saveSelectedEvent(event);
    setRoute('eventDetail');
  }
  const getEventCreatedBy = (userRoles, event) => {
    const match = userRoles.map((role) => role.categoryid === event.CreateBy);
    return match && match.categoryid;
  }
  return (
    <div className={classes.root}>
      <NavBar prevRoute="home"/>
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
      {eventsList && eventsList.map(event => {
        if(new Date() - new Date(event.ToDate) < 0){
          return(<div className="event-container" onClick={() => setRoute('eventDetail')}>
          <div className="event-title">
            <img src={`http://humanity.rubrutech.com/profileimage/${event.CreateBy}.jpg`} className="event-user-image" onError={(e) => addDefaultSrc(e)} />
            <div className="event-user-detail">
              <p className="event-text">{event.usrname}</p>
              <p className="event-schedule">From: {event.FromDate} - {event.ToDate}</p>
              <p className="event-schedule">Created By: {event.usrname}{getEventCreatedBy(userRoles, event)}</p>
            </div>
          </div>
          <p className="event-description event-text">{event.Title}</p>
          {/* <p className="event-user event-text">{event.test}</p> */}
          <p className="event-date event-text">Created On: {event.CreateON}</p>

        </div>)}
      })}
      </TabPanel>
      <TabPanel value={value} index={1}>
      {eventsList && eventsList.map(event => {
        if(new Date() - new Date(event.ToDate) > 0){
          return(<div className="event-container" onClick={() => getEventDetail(event)}>
          <div className="event-title">
            <img src={`http://humanity.rubrutech.com/profileimage/${event.CreateBy}.jpg`} className="event-user-image" onError={(e) => addDefaultSrc(e)} />
            <div className="event-user-detail">
              <p className="event-text">{event.usrname}</p>
              <p className="event-schedule">From: {event.FromDate} to {event.ToDate}</p>
              <p className="event-schedule">Created By: {event.usrname}{getEventCreatedBy(userRoles, event)}</p>

            </div>
          </div>
          <p className="event-description event-text">{event.Title}</p>
          {/* <p className="event-user event-text">{event.test}</p> */}
          <p className="event-date event-text">Created On: {event.CreateON}</p>

        </div>)}
      })}
      </TabPanel>
      <img className="plus-icon" src="/static/img/plus.png" onClick={() => setRoute('addEvent')} />
      <style jsx>
        {`
      .event-container{
        padding: 20px;
        border: 1px solid;
        padding: 10px;
        box-shadow: 0px 5px #888888;
        margin: 10px;
      }
      .event-title{
        font-size: 20px;
        display:flex;
        font-weight: 500;
      }
      .event-description{
        margin: 5px 0px;
      }
      .event-user-detail{
        margin-left: 10px;
      }
      .event-schedule{
        font-size: 15px;
        margin-bottom:0px;
      }
      .event-user-image{
        height: 70px;
        border-radius: 50%;
      }
      .event-text{
        margin-bottom: 0rem;
      }
      .event-user{
        text-align: left;
      }
      .event-date{
        text-align: right;
      }
      `}
      </style>
    </div>
  );
}
