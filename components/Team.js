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
import { user } from '../utils/apis';
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
    width: '122%',
    maxWidth: 360,
    padding: 0,
    overflowWrap: 'break-word',
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    width: '123vw'
  }
}));

export default function Escalation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { account: { toggleShowLoader } } = useContext(AccountContext);
  const [managementMem, setManagementMem] = useState([{}]);
  const [nationalMem, setNationalMem] = useState([{}]);
  const [stateMem, setStateMem] = useState([{}]);

  useEffect(() => {
    setManagementMem(JSON.parse(localStorage.getItem('ManagementMem')));
    async function getMyTeam() {
      toggleShowLoader(true);
      const userid = localStorage.getItem('userId')
      const authpassword = localStorage.getItem('authpassword')
      const power = JSON.parse(localStorage.getItem('power'));
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
      toggleShowLoader(false);
    }
    (!managementMem && !!localStorage.getItem('userId')) && getMyTeam();
    getMyTeam();
  }, []);
  const addDefaultSrc = (ev) => {
    ev.target.src = './static/img/head.png';
  }
  console.log(value,'value value')
  return (
    <div className={classes.root}>
      <NavBar prevRoute="home"/>
      <AppBar position="static" className={classes.container}>
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
      {/* <TabPanel value={value} index={0}>
        <List className={classes.listRoot}> */}
        <div>
          {stateMem && stateMem.map((mem) => (
            <div className="team-container">
              <img src={`http://humanity.rubrutech.com/profileimage/${mem.usrid}.jpg`} onError={(e) => addDefaultSrc(e)} className="profile-image" />
              <div className="team-user-details">
                <p className="team-user-detail">{mem.usrname}</p>
                <span><img className="contact-phone" src="./static/img/phone1.png" /><a href={`tel:${mem.usrmob}`} className="team-user-detail">{mem.usrmob}</a></span>
              </div>
              <div className="team-user-details">
                <p className="team-user-detail">{mem.statename}</p>
                <p className="team-user-detail">{mem.usrpriemail}</p>
              </div>
            </div>
          ))}
        </div>
        {/* </List>
      </TabPanel> */}
      <TabPanel value={value} index={1}>
        <List className={classes.listRoot}>
          {nationalMem && nationalMem.map((mem) => (
            <div className="team-container">
              <img src={`http://humanity.rubrutech.com/profileimage/${mem.usrid}.jpg`} onError={(e) => addDefaultSrc(e)} className="profile-image" />
              <div className="team-user-details">
                <p className="team-user-detail">{mem.usrname}</p>
                <span><img className="contact-phone" src="./static/img/phone1.png" /><a href={`tel:${mem.usrmob}`} className="team-user-detail">{mem.usrmob}</a></span>
              </div>
              <div className="team-user-details">
                <p className="team-user-detail">{mem.statename}</p>
                <p className="team-user-detail">{mem.usrpriemail}</p>
              </div>
            </div>
          ))}
        </List>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <List className={classes.listRoot}>
          {managementMem && managementMem.map((mem) => (
            <div className="team-container">
              <img src={`http://humanity.rubrutech.com/profileimage/${mem.usrid}.jpg`} onError={(e) => addDefaultSrc(e)} className="profile-image" />
              <div className="team-user-details">
                <p className="team-user-detail">{mem.usrname}</p>
                <span><img className="contact-phone" src="./static/img/phone1.png" /><a href={`tel:${mem.usrmob}`} className="team-user-detail">{mem.usrmob}</a></span>
              </div>
              <div className="team-user-details">
                <p className="team-user-detail">{mem.statename}</p>
                <p className="team-user-detail">{mem.usrpriemail}</p>
              </div>
            </div>
          ))}
        </List>
      </TabPanel>
      <style jsx>
        {`
        .main-container{
          width: 122vw;
        }
        .team-container{
          display: flex;
        }
        .profile-image{
          height: 90px;
          width: 90px;
          border-radius: 20px;
          margin: 4px;
        }
        .team-user-details{
          padding: 10px;
          font-size: 12px;
          font-weight: 600;
        }
        .team-user-detail{
          margin-bottom: 0.5rem;
        }
        .contact-phone{
          height: 15px;
          width: 15px;
        }
        `}
      </style>
    </div>
  );
}
