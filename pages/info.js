import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import NavBar from '../components/NavBarBack';
import { makeStyles } from '@material-ui/core/styles';
import { Twitter, YouTube, Facebook, Instagram } from '@material-ui/icons';


const options = ['Official Handles', 'OBD Detail India', 'International OBD'];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: 70,
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    socialIcons: {
        marginTop: '20px',
    }
}));

export default function SplitButton() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const officialHandles = [
        {
            name: 'Pujniya Guru Ji',
            handles: "@Gurmeetramrahim"
        },
        {
            name: 'Dera Sacha Sauda',
            handles: "@derasachasauda"
        },
        {
            name: 'Shah Satnam ji Green S Welfare Wing',
            handles: "@greenswelfares"
        },
        {
            name: 'MSG The Film',
            handles: "@msgthefilm"
        },
        {
            name: 'Sach Kahoon',
            handles: "@sachkahoon"
        }
    ]
    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    return (
        <>
            <NavBar />
            <Grid container direction="column" alignItems="center" className={classes.root}>
                <Grid item xs={12}>
                    <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                        <Button
                            color="primary"
                            size="small"
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                        >
                            <ArrowDropDownIcon />
                        </Button>
                    </ButtonGroup>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList id="split-button-menu">
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    // disabled={index === 2}
                                                    selected={index === selectedIndex}
                                                    onClick={(event) => handleMenuItemClick(event, index)}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Grid>
            </Grid>
            <div className={classes.socialIcons} style={{marginTop : open ? '180px' : '20px'}}>
                {officialHandles.map((obj, index) => { 
                    return(<div id={`profile${index+1}`} class="profile">
                    <div class="profile-info-wrapper">
				        <p class="profile-name-label">{obj.name}</p>
                    <div class='social-links'>
                        <div class='social-btn flex-center' id="twitter">
                        <img src="./static/img/twitter.svg" height="30px" width="30px"/><span>{obj && obj.handles}</span>
                        </div>

                        <div class='social-btn flex-center' id="linkedin">
                            <img src="./static/img/facebook.svg" height="30px" width="30px" /><span>{obj && obj.handles}</span>
                        </div>
                        <div class='social-btn flex-center' id="linkedin">
                            <img src="./static/img/youtube.svg" height="30px" width="30px"/><span>{obj && obj.handles}</span>
                        </div>

                        <div class='social-btn flex-center' id="github">
                        <img src="./static/img/instagram.svg" height="30px" width="30px"/><span>{obj && obj.handles}</span>
                        </div>
                    </div>
                    </div>
                </div>)})}
            </div>
        </>
    );
}
