import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Assessment from '@material-ui/icons/Assessment';
import DateRange from '@material-ui/icons/DateRange';
import EventNote from '@material-ui/icons/EventNote';
import AddCircle from '@material-ui/icons/AddCircle';
import Link from '@material-ui/core/Link';
import AccountContext from '../contexts/accountContext';
import {auth} from '../utils/apis';
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    icons: {
        height: 50,
        width: 60,
    },
    text: {
        marginTop: 0,
        fontWeight: 500,
        textShadow: '2px 2px #000',
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: '#fff',
        height: 120,
        backgroundColor: '#673ab7',
        boxShadow: '10px 10px 5px #aaaaaa',
    },
    link: {
        marginTop: '20px',
        fontSize: '20px'
    }
}));

function FormRow() {
    const classes = useStyles();
    const { account: { setRoute } } = useContext(AccountContext);
    const openRoute = (route) => {
        setRoute(`${route}`);
    }

    return (
        <React.Fragment>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <Assessment className={classes.icons} />
                    <Typography component="h3" variant="h5" align="center" className={classes.text} onClick={() => openRoute('sewaResults')}>Results</Typography>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <DateRange className={classes.icons} />
                    <Typography component="h3" variant="h5" align="center" className={classes.text} onClick={() => openRoute('myHazri')}>My Hazri Detail</Typography>
                </Paper>
            </Grid>
        </React.Fragment>
    );
}
function FormRowSecond() {
    const classes = useStyles();
    const { account: { setRoute } } = useContext(AccountContext);

    const openRoute = (route) => {
        setRoute(`${route}`);
    }
    return (
        <React.Fragment>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <AddCircle className={classes.icons} />
                    <Typography component="h3" variant="h5" align="center" className={classes.text} onClick={() => openRoute('sewa')}>Add Sewa Detail</Typography>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <EventNote className={classes.icons} />
                    <Typography component="h3" variant="h5" align="center" className={classes.text} onClick={() => openRoute('events')}>Events</Typography>
                </Paper>
            </Grid>
        </React.Fragment>
    );
}

export default function SimplePaper() {
    const classes = useStyles();
    const { account: { getProfileDetails, setPermissions, setItwingRank } } = useContext(AccountContext);
    const router = useRouter();
    const [ItwingRank,updateItwingRank] = useState('');
    const [MemberDetaildet,setMemberDetaildet] = useState('');

    useEffect(() => {
        async function getProfile() {
            const response = await getProfileDetails();
            if (response.success) {
                setItwingRank(response.categoryname);
                localStorage.setItem('MemberDetaildet', JSON.stringify(response.MemberDetaildet));
                localStorage.setItem('ItwingRank', JSON.stringify(response.categoryname));
                localStorage.setItem('samiti', JSON.stringify(response.samiti));
            }
        }
        async function checkLoginStatus() {
            const userId = localStorage.getItem('userId');
            const authpassword = localStorage.getItem('authpassword');
            const response = await auth.checkLoginStatus(userId, authpassword);
            if(!Number(response.success)){
                localStorage.clear();
                router.push('/login');
            }else{
                setPermissions(response);
            }
        }
        updateItwingRank(JSON.parse(localStorage.getItem('ItwingRank')));
        setMemberDetaildet(JSON.parse(localStorage.getItem('MemberDetaildet')));
        getProfile();
        checkLoginStatus();
    }, []);
    return (
        <div style={{ marginTop: 20 }}>
            <div className="user-detail-dashboard">
                <p>{MemberDetaildet && MemberDetaildet[0] && MemberDetaildet[0].usrname}</p>
                <p>{ItwingRank}</p>
            </div>
            <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <FormRowSecond />
                </Grid>
                {/* <Grid container item xs={12} spacing={3}>
                    <FormRow />
                </Grid> */}
            </Grid>
            <Grid container justify="center">
                <Link
                    component="button"
                    variant="body2"
                    className={classes.link}
                    onClick={() => {
                        console.info("I'm a button.");
                    }}
                >
                    msghumanity@gmail.com
                </Link>
            </Grid>

        </div>
    );
}