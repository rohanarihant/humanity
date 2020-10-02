import React, { useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AccountContext from '../contexts/accountContext';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import NavBar from './NavBarBack';
import { makeStyles } from '@material-ui/core/styles';
import { Twitter, YouTube, Facebook, Instagram } from '@material-ui/icons';
import { searchUsers, events } from '../utils/apis';

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

export default function SearchMember() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState("facebook");
    const [socialMediaList, setSocialMediaList] = React.useState(['Select']);
    const [socialMediaDetail, setSocialMediaDetail] = React.useState(['Select']);
    const [officialHandlerDetail, setofficialHandlerDetail] = React.useState(['Select']);
    const [searchKeyword, updateSearchKeyword] = React.useState('');
    const [listSearchedUser, updateListSearchedUser] = React.useState([]);
    const {account: { setRoute, title, setChangeRoleUser, screen, route }} = useContext(AccountContext);

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
            const MemberDetaildet = JSON.parse(localStorage.getItem('MemberDetaildet'));
            const gender = MemberDetaildet && MemberDetaildet[0].usrgen;
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
    // useEffect(() => {
    //     async function getSearchUserList(){
    //         const userId = localStorage.getItem('userId');
    //         const authpassword = localStorage.getItem('authpassword');
    //         const power = localStorage.getItem('power');
    //         const MemberDetaildet = JSON.parse(localStorage.getItem('MemberDetaildet'));
    //         const gender = MemberDetaildet && MemberDetaildet[0].usrgen;
    //         const response = await searchUsers.listUserSearch(userId, authpassword, gender, searchKeyword, power);
    //         if(response.success){
    //             updateListSearchedUser(response.MemberDetaildet);
    //         }
    //     }
    //     getSearchUserList();
    // },[searchKeyword]);
    const deleteMember = (e, user) => {
        setChangeRoleUser([user]);
        setRoute(screen === 'Delete Member' ? 'profile' : 'changeRole');
    }
    const searcForUsers = async(e) => {
        const key = e.keyCode || e.charCode;
        if(key === 13){
            const userId = localStorage.getItem('userId');
            const authpassword = localStorage.getItem('authpassword');
            const power = localStorage.getItem('power');
            const MemberDetaildet = JSON.parse(localStorage.getItem('MemberDetaildet'));
            const gender = MemberDetaildet && MemberDetaildet[0].usrgen;
            const response = await searchUsers.listUserSearch(userId, authpassword, gender, searchKeyword, power);
            if(response.success){
                updateListSearchedUser(response.MemberDetaildet);
            }
        }


    }
    return (
        <div className="official-info">
            <NavBar />
            <div className="issues-container">
            <div>
                <input type="text" name="search" className="search-input" placeholder="Search user and enter" value={searchKeyword} onChange={(e) => updateSearchKeyword(e.target.value)} onKeyPress={(e) => searcForUsers(e)} />
            </div>
                {
                    listSearchedUser && listSearchedUser.map((user, index) => {
                            return (
                                <div style={{ marginTop: 20, border: '1px solid #ddd', fontSize: 18, width: '108vw' }} onClick={(e) => deleteMember(e.target.value,user)}>
                                    <div className="memberList">
                                        <span>{user.usrname}</span>
                                        <span>{user.blockname}</span>
                                    </div>
                                    <div className="memberList">
                                        <span>{user.wmobno}</span>
                                        <span>{user.usrpriemail}</span>
                                    </div>
                                </div>
                            )
                    })
                }
            </div>

        </div>
    );
}
