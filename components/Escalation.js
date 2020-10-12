import React from 'react';
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
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Escalation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            <ListItem>
                <Avatar>
                    <ImageIcon />
                </Avatar>
                <ListItemText className={classes.listItem} primary="User1" secondary="July 20, 2014" />
                <ListItemText primary="Karnataka" secondary="c.rohit2111@gmail.com" />
            </ListItem>
            <Divider />
            <ListItem>
                <Avatar>
                    <ImageIcon />
                </Avatar>
                <ListItemText className={classes.listItem} primary="User2" secondary="July 20, 2014" />
                <ListItemText primary="Karnataka" secondary="c.rohit2111@gmail.com" />
            </ListItem>
            <Divider />
            <ListItem>
                <Avatar>
                    <ImageIcon />
                </Avatar>
                <ListItemText className={classes.listItem} primary="User3" secondary="July 20, 2014" />
                <ListItemText primary="Karnataka" secondary="c.rohit2111@gmail.com" />
            </ListItem>
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List className={classes.listRoot}>
            <ListItem>
                <Avatar>
                    <BeachAccessIcon />
                </Avatar>
                <ListItemText className={classes.listItem} primary="User1" secondary="July 20, 2014" />
                <ListItemText primary="Karnataka" secondary="c.rohit2111@gmail.com" />
            </ListItem>
            <ListItem>
                <Avatar>
                    <BeachAccessIcon />
                </Avatar>
                <ListItemText className={classes.listItem} primary="User2" secondary="July 20, 2014" />
                <ListItemText primary="Karnataka" secondary="c.rohit2111@gmail.com" />
            </ListItem>
            <ListItem>
                <Avatar>
                    <BeachAccessIcon />
                </Avatar>
                <ListItemText className={classes.listItem} primary="User3" secondary="July 20, 2014" />
                <ListItemText primary="Karnataka" secondary="c.rohit2111@gmail.com" />
            </ListItem>
        </List>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <List className={classes.listRoot}>
            <ListItem>
                <Avatar>
                    <BeachAccessIcon />
                </Avatar>
                <ListItemText className={classes.listItem} primary="User1" secondary="July 20, 2014" />
                <ListItemText primary="Karnataka" secondary="c.rohit2111@gmail.com" />
            </ListItem>
            <ListItem>
                <Avatar>
                    <BeachAccessIcon />
                </Avatar>
                <ListItemText className={classes.listItem} primary="User2" secondary="July 20, 2014" />
                <ListItemText primary="Karnataka" secondary="c.rohit2111@gmail.com" />
            </ListItem>
            <ListItem>
                <Avatar>
                    <BeachAccessIcon />
                </Avatar>
                <ListItemText className={classes.listItem} primary="User3" secondary="July 20, 2014" />
                <ListItemText primary="Karnataka" secondary="c.rohit2111@gmail.com" />
            </ListItem>
        </List>
      </TabPanel>
      <style jsx>
        {`
        .MuiAppBar-positionStatic{
          width: 122vw;
        }
        `}
      </style>
    </div>
  );
}
