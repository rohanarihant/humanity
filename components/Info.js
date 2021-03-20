import React, { useEffect, useContext } from 'react';
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
import { user } from '../utils/apis';
import AccountContext from '../contexts/accountContext';

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
    // const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [officialHandlerList, setofficialHandlerList] = React.useState(['Select']);
    const [officialHandlerDetail, setofficialHandlerDetail] = React.useState(['Select']);
    const [selectedIndex, setSelectedValue] = React.useState(0);
    const { account: { toggleShowLoader } } = useContext(AccountContext);

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
    useEffect(() => {
        async function getOfficialHandler() {
            toggleShowLoader(true);
            const userId = localStorage.getItem('userId');
            const authpassword = localStorage.getItem('authpassword');
            const gender = JSON.parse(localStorage.getItem('MemberDetaildet'))[0].usrgen;
            const response = await user.getOfficialHandler(userId, authpassword, gender);
            response.map((res) => officialHandlerList.push(res.handler_title));
            setofficialHandlerList(officialHandlerList);
            setofficialHandlerDetail(response);
            toggleShowLoader(false);
        }
        getOfficialHandler();
    }, []);

    return (
        <div className="official-info">
            <NavBar prevRoute="home" />
            {/* <Grid container direction="column" alignItems="center" className={classes.root}>
                <Grid item xs={12}>
                    <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                        <Button onClick={handleClick}>{officialHandlerList[selectedIndex]}</Button>
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
                                            {officialHandlerList.map((option, index) => (
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
            </Grid> */}
            <select className="form-control" style={{marginTop: 100, marginLeft: 20, width: '90%'}} name="bloodGroup" value={selectedIndex} onChange={(e) => setSelectedValue(e.target.value)}>
                {officialHandlerList.map((oh,index) => (<option value={index}>{oh}</option>))}
            </select>
            <div>
                {selectedIndex === 0 && <p className="selection-option">Please select any option</p>}
            </div>

            {selectedIndex > 0 && <div>
                <iframe src={"https://humanity.rubrutech.com/htmlpage/officialhandle.html"} className="iframe-class" />
            </div>}
            <style jsx>
                {`
        .iframe-class{
            background:url(./static/img/loader.svg);
            background-repeat: no-repeat;
            position: absolute;
            z-index: 60;
        }
        .selection-option{
            text-align: center;
            margin-top: 20px;
            font-size: 20px;
        }
        `}
            </style>
        </div>
    );
}
