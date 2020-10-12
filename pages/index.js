import React, { useContext } from 'react'
import NavBar from '../components/NavBar'
import Slider from '../components/Slider';
import Dashboard from '../components/Dashboard';
import AccountContext from '../contexts/accountContext';
import HomePage from '../components/HomePage';
import Profile from '../components/Profile';
import Escalation from '../components/Escalation';
import Team from '../components/Team';
import Sewa from '../components/addSewa';
import MyHazri from '../components/MyHazri';
import Info from '../components/Info';
import Events from '../components/Events';
import Issues from '../components/Issues';
import AddMyEvent from '../components/AddEvent';
import AddHazri from '../components/AddHazri';
import SearchMember from '../components/SearchMember';
import ChangeRole from '../components/ChangeRole';
import ApproveAccounts from '../components/ApproveAccounts';
import MemberDetail from '../components/memberDetail';
import Download from '../components/download';
import IssueDetail from '../components/issueDetail';
import ChangeMyPassword from '../components/changePassword';
import SewaResults from '../components/sewaResults';
import EditProfile from '../components/editProfile';
import Howtowork from '../components/howtowork';
import UserProfile from '../components/UserProfile';
import AddIssue from '../components/addIssue';
import PointList from '../components/addSewaPointList';

const Index = () => {
	const { account : { route, showLoader }} = useContext(AccountContext);
	const renderComponent = () => {
		switch(route) {
			case 'home':
			return <HomePage />;
			case 'profile':
			return <Profile />;
			case 'escalation':
			return <Team />;
			case 'team':
			return <Team />;
			case 'sewa':
			return <Sewa />;
			case 'myHazri':
			return <MyHazri />;
			case 'info':
			return <Info />;
			case 'events':
			return <Events />;
			case 'issues':
			return <Issues />;
			case 'issueDetail':
			return <IssueDetail />;
			case 'addEvent':
			return <AddMyEvent />;
			case 'addHazri':
			return <AddHazri />;
			case 'searchMember':
			return <SearchMember />;
			case 'changeRole':
			return <ChangeRole />;
			case 'approveAccounts':
			return <ApproveAccounts />;
			case 'memberDetail':
			return <MemberDetail />;
			case 'download':
			return <Download />;
			case 'changeMyPassword':
			return <ChangeMyPassword />;
			case 'sewaResults':
			return <SewaResults />;
			case 'editProfile':
			return <EditProfile />;
			case 'howtowork':
			return <Howtowork />;
			case 'userProfile':
			return <UserProfile />;
			case 'addIssue':
			return <AddIssue />;
			case 'addSewaPointList':
			return <PointList />;
			default:
			return <HomePage />;
		}
	}

	return(
	<React.Fragment>
		{showLoader && <img className="loader" src="./static/img/loader.svg" />}
		<div style={{opacity : showLoader ? 0.2 : 1 }}>
			{	
				renderComponent()
			}
		</div>
		
		
	</React.Fragment>
)}

Index.getInitialProps = async () => {
	// const res = await fetch(
	// 	'https://api.github.com/repos/ooade/NextSimpleStarter'
	// )
	// const json = await res.json()
	// return { stars: json.stargazers_count }
}

export default Index
