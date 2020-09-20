import React, { useEffect } from 'react';
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
import NavBar from './NavBarBack';
import { makeStyles } from '@material-ui/core/styles';
import { Twitter, YouTube, Facebook, Instagram } from '@material-ui/icons';
import { events } from '../utils/apis';

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

export default function Sewa() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState('Select Social Media');
    const [socialMediaList, setSocialMediaList] = React.useState(['Select']);
    const [socialMediaDetail, setSocialMediaDetail] = React.useState(['Select']);
    const [officialHandlerDetail, setofficialHandlerDetail] = React.useState(['Select']);

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (option, index) => {
        setSelectedIndex(option);
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

    useEffect(() => {
        async function getOfficialHandler() {
            const userId = localStorage.getItem('userId');
            const authpassword = localStorage.getItem('authpassword');
            const gender = JSON.parse(localStorage.getItem('MemberDetaildet'))[0].usrgen;
            const response = await events.getPointsList(userId, authpassword, gender);
            let platformList = ["Select Social Media"];
            response.map((res) => {
                if (platformList.indexOf(res.sewacategory_platform) === -1) {
                    platformList.push(res.sewacategory_platform);
                }
            });
            setSocialMediaDetail(response);
            setSocialMediaList(platformList);
        }
        getOfficialHandler();
    }, []);

    return (
        <div className="official-info">
            <NavBar />
            <Grid container direction="column" alignItems="center" className={classes.root}>
                <Grid item xs={12}>
                    <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                        <Button onClick={handleClick}>{selectedIndex}</Button>
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
                                            {socialMediaList.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                    // disabled={index === 2}
                                                    selected={option.sewacategory_platform === selectedIndex}
                                                    onClick={(event) => handleMenuItemClick(option, index)}
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
            <div>
                {
                    socialMediaDetail && socialMediaDetail.map((detail, index) => {
                        if (detail.sewacategory_platform === selectedIndex) {
                            return (
                                <div style={{ marginTop: 20 }} id={`profile${index}`} class="profile">
                                    <div >
                                        <div class="profile-info-wrapper">
                                            <p class="profile-name-label" style={{ marginBottom: 0 }}>{detail.sewacategory_platform}</p>
                                            <div class='social-links'>
                                                {detail.sewacategory_title}
                                            </div>
                                            <div className="sewa-category">
                                                <p>{detail.sewacategory_point}</p>
                                                <input type="text" style={{ width: 100 }} className="add-sewa-input" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>

        </div>
    );
}
