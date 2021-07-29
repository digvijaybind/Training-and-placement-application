import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { uniqBy } from 'lodash';
import { rolesConfig } from '../config/roles';
import * as Routes from './index';
import NotFound from '../components/NotFound';
import LoggedInMenu from '../components/Private-Components/Components/LoggedInMenu'

import cookie from 'react-cookies'
import jwtdecode from 'jwt-decode';



class PrivateRoutes extends Component {
	state = { allowedRoutes: [] };

	componentDidMount() {
		const token=cookie.load("token")
		if(!token){
			this.props.history.push('/');
		}else{
			try{
				jwtdecode(token)
				const data=jwtdecode(token);
				console.log("User login detail",data);
				let roles=[data.Role]
					roles = ['common', ...roles];
				  console.log(roles,"listing roles")
					let allowedRoutes = roles.reduce((acc, role) => {
						return [...acc, ...rolesConfig[role].routes];
					}, []);
					
					// For removing duplicate entries, compare with 'url'.
					allowedRoutes = uniqBy(allowedRoutes, 'url');
					this.setState({ allowedRoutes });

			}catch(err){
				this.props.history.push('/');
			}
		}	

	}



	render() {
		return (
			<div style={styles.root}>
				<LoggedInMenu
				routes={this.state.allowedRoutes}
				path={this.props.match.path}
				/>
		 <main style={styles.content}>
			 <div style={{marginTop:"100px"}}>    			
				 	<Switch>
					{this.state.allowedRoutes.map((route) => (
						<Route
							exact
							key={route.url}
							component={Routes[route.component]}
							path={`${this.props.match.path}${route.url}`}
						/>
					))}
					<Route component={NotFound} />
				</Switch>
			
			</div>
			</main>
			</div>
		
		);
	}
}

export default PrivateRoutes;


const styles={

	root:{
		display:'flex'
	},
	content: {
		flexGrow: 1,
		padding:3
	  },
}


/*previous function for login

  		let roles=["Admin"]
		if (roles) {
			roles = ['common', ...roles];
		  console.log(roles,"listing roles")
			let allowedRoutes = roles.reduce((acc, role) => {
				return [...acc, ...rolesConfig[role].routes];
			}, []);
			
			// For removing duplicate entries, compare with 'url'.
			allowedRoutes = uniqBy(allowedRoutes, 'url');
			this.setState({ allowedRoutes });
		} 
		else {
			this.props.history.push('/');
		}
*/
