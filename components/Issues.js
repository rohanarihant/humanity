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
import { issues } from '../utils/apis';
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

export default function Issues() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState("facebook");
    const [socialMediaList, setSocialMediaList] = React.useState(['Select']);
    const [issuesList, setIssuesList] = React.useState([]);
    const [officialHandlerDetail, setofficialHandlerDetail] = React.useState(['Select']);
    const {account: { toggleShowLoader, setRoute, setSelectedIssue }} = useContext(AccountContext);

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
        async function getAllIssues() {
            toggleShowLoader(true);
            const userid = localStorage.getItem('userId');
            const authpassword = localStorage.getItem('authpassword');
            const power = JSON.parse(localStorage.getItem('power'));
            const MemberDetaildet = JSON.parse(localStorage.getItem('MemberDetaildet'));
            const gender = MemberDetaildet && MemberDetaildet[0].usrgen;
            const response = await issues.getAllIssues(userid, authpassword, gender, power);
            if(response.success){
                setIssuesList(response.itissues);
            }
            toggleShowLoader(false);
        }
        getAllIssues();
    }, []);

    const openIssue = async(issueId) => {
        const userid = localStorage.getItem('userId');
        const authpassword = localStorage.getItem('authpassword');
        const power = JSON.parse(localStorage.getItem('power'));
        const res = await issues.closeIssue(userid, authpassword, power, issueId, "No");
        res.success && setSelectedIssue(res.itissues);
        res.success && setRoute('issueDetail');
    }

    return (
        <div className="official-info">
            <NavBar />
            <div className="issues-container">
                {
                    issuesList && issuesList.map((detail, index) => {
                        const issuedes = detail && detail.issuedes;
                            return (
                                <div id={`profile${index}`} class="profile" onClick={() => openIssue(detail.issueid)} style={{height: issuedes.length < 100 ? 140 : issuedes.length < 200 ? 180 :issuedes.length < 250 ? 250:300}}>
                                    <div >
                                        <div class="profile-info-wrapper">
                                            <p class="profile-name-label" style={{ marginBottom: 0 }}>{detail.usrname} ({detail.catshortname})</p>
                                            <p className="profile-name-label" style={{margin:0}}>{detail.issuedate}</p>
                                            <div class='social-links' style={{height: 0}}>
                                                {issuedes}
                                            </div>
                                            <div className="sewa-category">
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                    })
                }
            </div>

        </div>
    );
}
