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
    const {account: { setRoute, toggleShowLoader, setChangeRoleUser, screen, setSelectedUser }} = useContext(AccountContext);

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
    const onMemberClick = async(e, user) => {
        setChangeRoleUser([user]);
        const userId = localStorage.getItem('userId');
        const authpassword = localStorage.getItem('authpassword');
        const usrid = user.usrid;
        const response = await searchUsers.getUserDetail(userId, authpassword, usrid);
        if(response.success){
            setSelectedUser(response.MemberDetaildet);
        }
        setRoute((screen === 'Delete Profile' || screen === 'Search Members') ? 'userProfile' : 'changeRole');
    }
    const searcForUsers = async(e) => {
        const key = e.keyCode || e.charCode;
        if(key === 13){
            toggleShowLoader(true);
            const userId = localStorage.getItem('userId');
            const authpassword = localStorage.getItem('authpassword');
            const power = localStorage.getItem('power');
            const MemberDetaildet = JSON.parse(localStorage.getItem('MemberDetaildet'));
            const gender = MemberDetaildet && MemberDetaildet[0].usrgen;
            const response = await searchUsers.listUserSearch(userId, authpassword, gender, searchKeyword, power);
            if(response.success){
                updateListSearchedUser(response.MemberDetaildet);
            }
            toggleShowLoader(false);
        }
    }
    
    return (
        <div className="official-info">
            <NavBar prevRoute="home" />
            <div className="issues-container">
            <div>
                <input type="text" name="search" autocomplete="off" className="search-input" placeholder="Search user and enter" value={searchKeyword} onChange={(e) => updateSearchKeyword(e.target.value)} onKeyPress={(e) => searcForUsers(e)} />
            </div>
                {
                    listSearchedUser && listSearchedUser.map((user) => {
                            return (
                                <div className="search-user" onClick={(e) => onMemberClick(e.target.value,user)}>
                                    <div className="memberList">
                                        <span>{user.usrname}</span>
                                        <span>{user.blockname}</span>
                                    </div>
                                    <div className="mem-contact" ><img className="contact-phone" src="./static/img/phone1.png" /><a href={`tel:${user.wmobno}`} className="team-user-detail">{user.wmobno}</a></div>

                                        {/* <p className="mobile-number">{}</p> */}
                                        <p className="mobile-number">{user.usrpriemail}</p>
                                </div>
                            )
                    })
                }
            </div>
            <style>
                {`
                .search-input{
                    border-radius: 10px;
                    margin-top: 10px;
                    font-size: 20px;
                    border: 1px solid #673ab7;
                    margin: 3vw 10px;
                    width: 100%;
                }
                .search-user{
                    margin-top: 20px;
                    border: 1px solid #ddd;
                    font-size: 18px;
                    border-radius: 6px;
                    padding: 10px;
                    background-color: rgb(235, 224, 255);
                    border: 1px solid #673ab7;
                    width: 90%;
                    font-weight: 500;
                    left: 0%;
                    margin: 10px 19px;
                }
                .mobile-number{
                    text-align: center;
                    margin: 5px;
                    font-size: 20px;
                }
                .contact-phone{
                    height: 24px;
                    width: 20px;
                    margin-right: 5px;
                  }
                .mem-contact{
                    display: flex;
                    justify-content: center;
                }
                `}
            </style>
        </div>
    );
}
