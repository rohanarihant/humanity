import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NavBar from '../components/NavBarBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import {user} from '../utils/apis';
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

export default function Escalation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const {account: { getProfileDetails}} = useContext(AccountContext);
  const [managementMem, setManagementMem] = useState([{}]);
  const [nationalMem, setNationalMem] = useState([{}]);
  const [stateMem, setStateMem] = useState([{}]);

  useEffect(() => {
    setManagementMem(JSON.parse(localStorage.getItem('ManagementMem')));
      async function getMyTeam() {
          const userid = localStorage.getItem('userId')
          const authpassword = localStorage.getItem('authpassword')
          const power = JSON.parse(localStorage.getItem('ItwingRank'));
          const gender = JSON.parse(localStorage.getItem('MemberDetaildet'))[0].usrgen;
          const stateid = JSON.parse(localStorage.getItem('MemberDetaildet'))[0].usrstaid;
          const countryid = JSON.parse(localStorage.getItem('MemberDetaildet'))[0].usrcouid;
          const response = await user.getMyTeam(userid, authpassword, power, gender, countryid, stateid);
          if (response.success) {
              setManagementMem(response.allmanagementmem);
              setStateMem(response.allstatemembers);
              setNationalMem(response.allnmmembers);
              localStorage.setItem('ManagementMem', JSON.stringify(response.allmanagementmem));
              localStorage.setItem('allstatemembers', JSON.stringify(response.allstatemembers));
              localStorage.setItem('allnmmembers', JSON.stringify(response.allnmmembers));
          }
      }
      (!managementMem && !!localStorage.getItem('userId')) && getMyTeam();
      getMyTeam();
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
          <LinkTab label="State Members" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="National Members" href="/trash" {...a11yProps(1)} />
          <LinkTab label="Managemanet Members" href="/spam" {...a11yProps(2)} />
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
    </div>
  );
}
