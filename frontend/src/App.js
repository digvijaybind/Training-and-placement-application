import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import history from './util/history';
import UserContext  from './components/ContextManage/UserContext'
import cookie from 'react-cookies'
import jwtdecode from 'jwt-decode';


const authentication = () => 
JSON.parse(localStorage.getItem('roles')) ? (
	<Redirect to="/app" />
) : (
	<PublicRoutes />
);
const token=cookie.load("token")
const authtest=()=>{
	if(!cookie.load("token")){
		return <PublicRoutes/>
	}
	else{
		try{
		jwtdecode(cookie.load("token"))
		 return <Redirect to="/app" />
		}catch(err){
				console.log("error regarding token",err)
				return <PublicRoutes/>
		}
	}

}



class App extends Component {
  
	
	
	constructor(props){
		super(props);
		this.state={
		  Name:null,
		  ID:null,
		  Token:null,
		  Email:null,
		  Role:null,
		  loggedin:false
		}
	}


	
	async componentWillMount(){
		await this.checklogin()
	  }

	    async checklogin(){
			if(!token){
				this.setState({loggedin:false})
			}else{
				try{
				    jwtdecode(token)
					let data=jwtdecode(token);
			 	await this.setState({Email:data.Email,ID:data.ID,Role:data.Role,loggedin:true,Token:token})
				}catch(err){
					this.setState({loggedin:false})
				}
			}	
	  }

	async Logout(){
	 	await cookie.remove('token', { path: 'http://localhost:3004/' })
		window.location.reload();
	  }
	  
	render() {
		const {Provider}=UserContext;
		return (
			<Provider value={{state:this.state,OnLogout:this.Logout}}>
				  <Router history={history}>
							<Switch>
								<Route path="/app" component={PrivateRoutes} />
								<Route path="" render={authtest} />
							</Switch>
						</Router>

			</Provider>
				
		);
	}
}

export default App;




/* for the login check if the valid token exist then only move to the /app thing
const authtest=()=>{
	if(!cookie.load("token")){
		return <PublicRoutes/>
	}
	else{
		try{
		jwtdecode(cookie.load("token"))
		 return <Redirect to="/app" />
		}catch(err){
				console.log("error regarding token",err)
				return <PublicRoutes/>
		}
	}

}
*/
