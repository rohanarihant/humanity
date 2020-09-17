import React, { useContext } from 'react'
import NavBar from '../components/NavBar'
import Slider from '../components/Slider';
import Dashboard from '../components/Dashboard';
import AccountContext from '../contexts/accountContext';
import HomePage from '../components/HomePage';
import Profile from '../components/Profile';
import Escalation from '../components/Escalation';
import Team from '../components/Team';
import Sewa from '../components/Sewa';
import MyHazri from '../components/MyHazri';
import Info from '../components/Info';
import Events from '../components/Events';
import Issues from '../components/Issues';
import AddMyEvent from '../components/AddEvent';
import AddHazri from '../components/AddHazri';
import SearchMember from '../components/SearchMember';
import ChangeRole from '../components/ChangeRole';


const Index = () => {
	const { account : { route }} = useContext(AccountContext);
	const renderComponent = () => {
		console.log(route,'route')
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
			case 'addEvent':
			return <AddMyEvent />;
			case 'addHazri':
			return <AddHazri />;
			case 'searchMember':
			return <SearchMember />;
			case 'changeRole':
			return <ChangeRole />;
			default:
			return <HomePage />;
		}
	}

	return(
	<React.Fragment>
		{
			renderComponent()
		}
		
		
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
