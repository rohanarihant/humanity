import React from 'react'
import NavBar from '../components/NavBar'
import Slider from '../components/Slider';
import Dashboard from '../components/Dashboard';

const HomePage = () => {
	return(
	<React.Fragment>
		<NavBar />
		<Slider />
		<Dashboard />
	</React.Fragment>
)}

HomePage.getInitialProps = async () => {
}

export default HomePage
