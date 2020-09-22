import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Assessment from '@material-ui/icons/Assessment';
import AddCircle from '@material-ui/icons/AddCircle';
import Link from '@material-ui/core/Link';
import AccountContext from '../contexts/accountContext';


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

    const showResult = () => {
        setRoute('sewaResults');
    }
    return (
        <React.Fragment>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <Assessment className={classes.icons} />
                    <Typography component="h3" variant="h5" align="center" className={classes.text} onClick={() => showResult()}>Results</Typography>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <AddCircle className={classes.icons} />
                    <Typography component="h3" variant="h5" align="center" className={classes.text} >My Hazri Detail</Typography>
                </Paper>
            </Grid>
        </React.Fragment>
    );
}

export default function SimplePaper() {
    const classes = useStyles();
    const { account: { getProfileDetails } } = useContext(AccountContext);
    useEffect(() => {
        async function getProfile() {
            const response = await getProfileDetails();
            if (response.success) {
                localStorage.setItem('MemberDetaildet', JSON.stringify(response.MemberDetaildet));
                localStorage.setItem('ItwingRank', JSON.stringify(response.categoryname));
                localStorage.setItem('samiti', JSON.stringify(response.samiti));
            }
        }
        getProfile();
    }, []);

    return (
        <div style={{ marginTop: 20 }}>
            <div className="user-detail-dashboard">
                <p>Dummy MM</p>
                <p>Management Member</p>
            </div>
            <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
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