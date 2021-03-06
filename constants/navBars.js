import Person from '@material-ui/icons/Person';
import People from '@material-ui/icons/People';
import AcUnit from '@material-ui/icons/AcUnit';
import Group from '@material-ui/icons/Group';
import Info from '@material-ui/icons/Info';
import LiveTv from '@material-ui/icons/LiveTv';
import LockOpen from '@material-ui/icons/LockOpen';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import Accessibility from '@material-ui/icons/Accessibility';
import ExitToApp from '@material-ui/icons/ExitToApp';
import BugReport from '@material-ui/icons/BugReport';
import EventAvailable from '@material-ui/icons/EventAvailable';
import PostAdd from '@material-ui/icons/PostAdd';
import LibraryAdd from '@material-ui/icons/LibraryAdd';

const TeamMembers = [
    {title: 'My Profile', icon: <Person />, route: 'profile'},
    {title: 'Escalation Matrix', icon: <People />, route: 'escalation'},
    {title: 'Add Sewa', icon: <PostAdd />, route: 'sewa'},
    {title: 'My Hazri Details', icon: <LibraryAdd />, route: 'myHazri'},
    {title: 'Useful Information', icon: <Info />, route: 'info'},
    {title: 'Events', icon: <EventAvailable />, route: 'events'},
    // {title: 'Issues', icon: <BugReport />, route: 'issues'},
    {title: 'Broadcast', icon: <AcUnit />, route: 'broadcast'},
    {title: 'How to Work', icon: <LiveTv />, route: 'howtowork'},
    {title: 'ChangeMyPassword', icon: <LockOpen />, route: 'changeMyPassword'},
];
const StateMembers = [
    {title: 'My Profile', icon: <Person />, route: 'profile'},
    {title: 'Escalation Matrix', icon: <People />, route: 'escalation'},
    {title: 'Add Sewa', icon: <PostAdd />, route: 'sewa'},
    {title: 'My Hazri Details', icon: <LibraryAdd />, route: 'myHazri'},
    {title: 'Useful Information', icon: <Info />, route: 'info'},
    {title: 'Events', icon: <EventAvailable />, route: 'events'},
    // {title: 'Issues', icon: <BugReport />, route: 'issues'},
    {title: 'Approve Accounts', icon: <Person />, route: 'approveAccounts'},
    {title: 'Search Members', icon: <Person />, route: 'searchMember'},
    {title: 'Download State Members', icon: <Person />, route: 'download'},
    {title: 'Broadcast', icon: <AcUnit />, route: 'broadcast'},
    {title: 'How to Work', icon: <LiveTv />, route: 'howtowork'},
    {title: 'ChangeMyPassword', icon: <LockOpen />, route: 'changeMyPassword'},
];
const NationalMembers = [
    {title: 'My Profile', icon: <Person />, route: 'profile'},
    {title: 'Escalation Matrix', icon: <People />, route: 'escalation'},
    {title: 'Add Sewa', icon: <PostAdd />, route: 'sewa'},
    {title: 'My Hazri Details', icon: <LibraryAdd />, route: 'myHazri'},
    {title: 'Useful Information', icon: <Info />, route: 'info'},
    {title: 'Events', icon: <EventAvailable />, route: 'events'},
    // {title: 'Issues', icon: <BugReport />, route: 'issues'},
    {title: 'Search Members', icon: <Person />, route: 'searchMember'},
    {title: 'Change Role', icon: <Accessibility />, route: 'searchMember'},
    {title: 'Set Permission', icon: <Person />, route: 'searchMember'},
    {title: 'Delete Profile', icon: <PeopleOutline />, route: 'searchMember'},
    {title: 'Download All Member', icon: <PeopleOutline />, route: 'download'},
    {title: 'Broadcast', icon: <AcUnit />, route: 'broadcast'},
    {title: 'How to Work', icon: <LiveTv />, route: 'howtowork'},
    {title: 'ChangeMyPassword', icon: <LockOpen />, route: 'changeMyPassword'},
];
const ManagementMembers = [
    {title: 'My Profile', icon: <Person />, route: 'profile'},
    {title: 'Escalation Matrix', icon: <People />, route: 'escalation'},
    {title: 'Add Sewa', icon: <PostAdd />, route: 'sewa'},
    {title: 'My Hazri Details', icon: <LibraryAdd />, route: 'myHazri'},
    {title: 'Useful Information', icon: <Info />, route: 'info'},
    {title: 'Events', icon: <EventAvailable />, route: 'events'},
    // {title: 'Issues', icon: <BugReport />, route: 'issues'},
    {title: 'Search Members', icon: <Person />, route: 'searchMember'},
    {title: 'Change Role', icon: <Accessibility />, route: 'searchMember'},
    {title: 'Set Permission', icon: <Person />, route: 'searchMember'},
    {title: 'Delete Profile', icon: <PeopleOutline />, route: 'searchMember'},
    {title: 'Approve Accounts', icon: <Person />, route: 'approveAccounts'},
    {title: 'Download', icon: <Person />, route: 'download'},
    {title: 'Download Points', icon: <Person />, route: 'downloadPoints'},
    {title: 'Broadcast', icon: <AcUnit />, route: 'broadcast'},
    {title: 'How to Work', icon: <LiveTv />, route: 'howtowork'},
    {title: 'ChangeMyPassword', icon: <LockOpen />, route: 'changeMyPassword'},
];

const selectNavBarForUser = (userType, userPermissions) => {
    let selected = '';
    switch(userType){
        case "Team Member":
        case "Block Member":
        case "District Member":
            selected = TeamMembers;
            break;
        case "State Member":
            selected = StateMembers;
            break;
        case "National Member":
            selected =  NationalMembers;
            break;
        case "Management Member":
            selected =  ManagementMembers;
            break;
        default:
            selected = TeamMembers;
    }
    return selected;
}

export default selectNavBarForUser;