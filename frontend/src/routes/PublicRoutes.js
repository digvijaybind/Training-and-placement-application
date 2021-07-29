import React, { Fragment } from 'react';
import { Link, Route, Switch } from 'react-router-dom';


//pages and components
import Login from '../components/Public-Components/Login_Page';
import NotFound from '../components/NotFound';
import Homepage from '../components/Public-Components/HomePage';
import Register from '../components/Public-Components/Signup';
import About from '../components/Public-Components/AboutUS';
import Contact from '../components/Public-Components/ContactUS';
import Footer from '../components/Public-Components/Footer';

//navigation

import TopNavBar from '../components/Public-Components/TopNavBar';
//end navigation

const PublicRoutes = ({ match }) => (
	<Fragment>
		<TopNavBar/>
		<Switch>
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />
			<Route exact path="/" component={Homepage} />
			<Route exact path="/about" component={About}/>
			<Route exact path="/contact" component={Contact}/>
			<Route component={NotFound} />
		</Switch>
	<Footer/>
	</Fragment>
);

export default PublicRoutes;
