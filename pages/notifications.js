import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Alert, AlertTitle} from '@material-ui/lab';
import NavBar from '../components/NavBarBack';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 70,
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SimpleAlerts() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar />
      <Alert variant="filled" severity="warning" onClose={() => {}}>
      <AlertTitle>Meeting Notification</AlertTitle>
        Meeting at 7:00 AM on Zoom 
      </Alert>
      <Alert variant="filled" severity="error" onClose={() => {}}>
      <AlertTitle>Add Report Notification</AlertTitle>
        Please fill your Yesterday's Report.
      </Alert>
      <Alert variant="filled" severity="info" onClose={() => {}}>
      <AlertTitle>Namcharcha Notification</AlertTitle>
        Don't miss Namcharcha at 11:00 AM
      </Alert>
      <Alert variant="filled" severity="success" onClose={() => {}}>
        You Have successfuly created your account.
      </Alert>
    </div>
  );
}
