import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Assessment from '@material-ui/icons/Assessment';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    icons: {
        height: 75,
        width: 100,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: '#fff',
        height: 150,
        backgroundColor: '#673ab7'
    },
    link: {
        marginTop: '20px',
        fontSize: '20px'
    }
}));
const onClick = () => {
    console.log('sdfjkhadfsj')
}
function FormRow() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <Assessment className={classes.icons} />
                    <Typography component="h1" variant="h5" align="center" >Trending Handles</Typography>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <Assessment className={classes.icons} />
                    <Typography component="h1" variant="h5" align="center" >My Hazri Detail</Typography>
                    </Paper>
            </Grid>
            {/* <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <Assessment className={classes.icons} />
                    <Typography component="h1" variant="h6" align="center" >Results</Typography>
                    </Paper>
            </Grid> */}
        </React.Fragment>
    );
}
export default function SimplePaper() {
    const classes = useStyles();

    return (
        <div style={{ marginTop: 20 }}>
            <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
                </Grid>
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
        // <Grid container className={classes.root} spacing={1}>
        // <Grid item xs={12}>
        // <Grid container justify="center" >
        //     <Grid item>
        //   <Paper variant="outlined" align="center" elevation={0} onClick={() => onClick()} >
        //     <Assessment className={classes.icons} />
        //     <Typography component="h1" variant="h5" align="center" >hello</Typography>
        //   </Paper>
        //   </Grid>
        // </Grid>
        //   <Paper variant="outlined" />
        //   <Paper variant="outlined" elevation={3} />
        //   <Paper variant="outlined" elevation={4} />
        //   <Paper variant="outlined" elevation={5} />
        //   <Paper variant="outlined" elevation={6} />
        //   </Grid>
        // </Grid>
    );
}