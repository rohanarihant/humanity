import React, { useEffect, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Assessment from '@material-ui/icons/Assessment';
import DateRange from '@material-ui/icons/DateRange';
import EventNote from '@material-ui/icons/EventNote';
import AddCircle from '@material-ui/icons/AddCircle';
import Search from '@material-ui/icons/Search';
import Book from '@material-ui/icons/Book';
import Link from '@material-ui/core/Link';
import AccountContext from '../contexts/accountContext';
import {auth} from '../utils/apis';
import { useRouter } from 'next/router'
import { dashboardGrids } from '../constants/url';

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
        backgroundColor: '#3D8EE1',
        boxShadow: '10px 10px 5px #aaaaaa',
    },
    note: {
        marginTop: '20px',
        fontSize: '16px',
        textAlign: 'center',
        color: '#ACA6A5',
    },
    link: {
        margin: '20px',
        fontSize: '20px'
    }
}));

function FormRow() {
    const classes = useStyles();
    const { account: { setRoute, updateSelectedScreen } } = useContext(AccountContext);
    const openRoute = (route) => {
        setRoute(`${route}`);
        updateSelectedScreen(`${route === 'sewaResults' ? 'Sewa Results' : 'My Hazri'}`);
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
    const { account: { setRoute, updateSelectedScreen } } = useContext(AccountContext);


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
function FormRowThird() {
    const classes = useStyles();
    const { account: { setRoute, updateSelectedScreen } } = useContext(AccountContext);

    const openRoute = (route) => {
        setRoute(`${route}`);
        updateSelectedScreen(`${route === 'escalation' ? 'escalation' : 'searchMember'}`);
    }
    return (
        <React.Fragment>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <Search className={classes.icons} />
                    <Typography component="h3" variant="h5" align="center" className={classes.text} onClick={() => openRoute('searchMember')}>Search Member</Typography>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <Book className={classes.icons} />
                    <Typography component="h3" variant="h5" align="center" className={classes.text} onClick={() => openRoute('escalation')}>Escalation Matrix</Typography>
                </Paper>
            </Grid>
        </React.Fragment>
    );
}

export default function SimplePaper() {
    const classes = useStyles();
    const { account: { getProfileDetails, setPermissions, setItwingRank, setRoute } } = useContext(AccountContext);
    const router = useRouter();
    const [ItwingRank,updateItwingRank] = useState('');
    const [MemberDetaildet,setMemberDetaildet] = useState('');
    const [userID,setUserID] = useState('');

    useEffect(() => {
        async function getProfile() {
            const response = await getProfileDetails();
            if (response.success) {
                setItwingRank(response.categoryname);
                updateItwingRank(response.categoryname);
                setMemberDetaildet(response.MemberDetaildet);
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
        setUserID(localStorage.getItem('userId'));
        updateItwingRank(JSON.parse(localStorage.getItem('ItwingRank')));
        setMemberDetaildet(JSON.parse(localStorage.getItem('MemberDetaildet')));
        getProfile();
        checkLoginStatus();
    }, []);
    const addDefaultSrc = (ev) => {
        ev.target.src = './static/img/head.png';
    }
    const openRoute = (route) => {
        setRoute(`${route}`);
        updateSelectedScreen(`${route === 'sewa' ? 'Sewa' : 'Events'}`);
    }
    return (
        <>
        <div style={{ marginTop: 20 }}>
            <div className="user-detail-dashboard">
                <img class="profile-image" style={{height: 85, width: 90, borderRadius: "50%"}} src={`http://humanity.rubrutech.com/profileimage/${userID}.jpg`}  onError={(e) => addDefaultSrc(e)}  alt="profile image" />
                <div>
                    <p>{MemberDetaildet && MemberDetaildet[0] && MemberDetaildet[0].usrname}</p>
                    <p>{ItwingRank}</p>
                </div>
            </div>
            <div>
                {dashboardGrids &&
                dashboardGrids.map((grid) => {
                    return(
                    <>
                    <div className="full-width-border"></div>
                    <div className="home-block">
                    {grid && grid.row.map((r) => (
                        <div className="home-block-container" onClick={() => openRoute(r.route)}>
                            <img src={`./static/desktop/${r.img}.jpg`} style={{height: 40, width: 40}} />
                            <p className="block-name">{r.name}</p>
                        </div>
                    ))}
                    </div>
                    </>        
                )})}
                <div className="full-width-border"></div>
            </div>
            {/* <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <FormRowSecond />
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <FormRowThird />
                </Grid>
            </Grid> */}
            <Grid container justify="center" className={classes.note}>
                If you are facing any problem with this app then please send us an email
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
            <style jsx>
                    {`
                    .full-width-border{
                        width: 80%;
                        border: 1px solid #F1F1F1;
                        margin: 10px 0px 10px 10%;
                    }
                    .home-block{
                        display: flex;
                        justify-content: start;
                    }
                    .home-block-container{
                        border: 1px solid #F1F1F1;
                        width: 33.3%;
                        border-left: 0px;
                        border-top: 0px;
                        justify-content: center;
                        align-items: center;
                        display: flex;
                        height: 100px;
                        flex-direction: column;
                        border-bottom:0px;
                    }
                    .block-name{
                        font-size: 12px;
                        margin: 0.6rem 0px 0px 0px;
                        color: #1270E9;
                    }
                    `}
            </style>
        </>
    );
}