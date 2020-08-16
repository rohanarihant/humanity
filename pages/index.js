import React from 'react'
import Todo from '../components/Todo'
import Slider from '../components/Slider';
import Dashboard from '../components/Dashboard';

const Index = () => (
	<React.Fragment>
		{/* <Fork  /> */}
		<Todo />
		<Slider />
		<Dashboard />
	</React.Fragment>
)

Index.getInitialProps = async () => {
	// const res = await fetch(
	// 	'https://api.github.com/repos/ooade/NextSimpleStarter'
	// )
	// const json = await res.json()
	// return { stars: json.stargazers_count }
}

export default Index
