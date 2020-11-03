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
import { user, events } from '../utils/apis';
import { toast } from 'react-toastify';
import AccountContext from '../contexts/accountContext';

const options = ['Official Handles', 'OBD Detail India', 'International OBD'];

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: 10,
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
    const [pointsList, updatePointsList] = React.useState({ pointlist : [] });
    const [enableButton, updateEnableButton] = React.useState(false);
    const {account: { setRoute, toggleShowLoader, setSewaPointList }} = useContext(AccountContext);

    const handleClick = () => {
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
            setSewaPointList(response);
            setSocialMediaList(platformList);
        }
        getOfficialHandler();
    }, []);

    const addSewa = async() => {
        toggleShowLoader(true);
        const { pointlist } = pointsList;
        const userId = localStorage.getItem('userId');
        const authpassword = localStorage.getItem('authpassword');
        const MemberDetaildet = JSON.parse(localStorage.getItem('MemberDetaildet'))[0];
        const gender = MemberDetaildet && MemberDetaildet.usrgen;
        const countryid = MemberDetaildet && MemberDetaildet.usrgen;
        const stateid = MemberDetaildet && MemberDetaildet.usrstaid;
        const distidd = MemberDetaildet && MemberDetaildet.usrdstid;
        const blockid = MemberDetaildet && MemberDetaildet.usrblkid;
        const postdate = new Date().toLocaleDateString();
        // console.log(pointlist,'pointlist')
        const totalPoints = pointlist.reduce((accc, obj) => { return accc + (Number(obj.point_entry) * Number(obj.point_point))}, 0);
        var conf = confirm(`Confirm Total Sewa Points:- ${totalPoints}`);
        if(conf){
            const res = await user.addSewa(userId, authpassword, gender, JSON.stringify(pointsList), countryid, stateid, distidd, blockid, postdate);
            res.success && toast.success('Sewa added successfully');
            res.success && setRoute('home')
        }
        toggleShowLoader(false);
    }

    const updateField = (value, catId, catPoints) => {
        const { pointlist } = pointsList;
        const obj = {
            point_cat_id: '',
            point_point: '',
            point_entry: ''
          }
        if(pointlist.findIndex(arr => arr.point_cat_id === catId) === -1){
            obj.point_cat_id = catId;
            obj.point_point = catPoints;
            obj.point_entry = value;
            pointlist.push(obj);
        }else{
            const index = pointlist.findIndex(arr => arr.point_cat_id === catId)
            pointlist[index].point_cat_id = catId;
            pointlist[index].point_point = catPoints;
            pointlist[index].point_entry = value;
        }
        updatePointsList(pointsList);
        updateEnableButton(true);
    }
    const showPoint = (e) => {
        e.stopPropagation();
        setRoute('addSewaPointList')
    }
    return (
        <div className="official-info">
            <NavBar />
            <img src="http://humanitydemo.rubrutech.com/uploads/instruction.jpg" className="add-sewa-instruction" />
            <p className="add-sewa-date">Date: {new Date().toLocaleDateString()}<p className="add-sewa-point-list" onClick={(e) => showPoint(e)}>Point List</p></p>
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
                                                {/* <p>{detail.sewacategory_point}</p> */}
                                                <input type="text" style={{ width: 100 }} className="add-sewa-input" onChange={(e) => updateField(e.target.value,detail.sewacategory_id, detail.sewacategory_point)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
                {enableButton && <p className="iconSwitch" style={{margin: "20px 10px 20px"}} onClick={() => addSewa()}>Add Sewa</p>}
            </div>
            <style>
                {`
                .add-sewa-instruction{
                    padding: 10px;
                    width: 100vw;
                    margin-top: 60px;
                }
                .add-sewa-date{
                    color: rgb(72, 40, 128);
                    font-size: 17px;
                    text-align: left;
                    font-weight: 600;
                }
                .iconSwitch{
                    margin:10px;
                }
                .add-sewa-point-list{
                    text-align: right;
                    margin-right: 10px;
                    position: relative;
                    bottom: 25px;
                }
                `}
            </style>
        </div>
    );
}
