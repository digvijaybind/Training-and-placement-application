import React, { Component } from 'react'
import { Container, CssBaseline} from '@material-ui/core'


//usercontext
import UserContext from '../ContextManage/UserContext'

import LatestDrive from '../Public-Components/HomePageComponent/LatestDrive'

import Footer from './Footer';
import TopNavBar from './TopNavBar';


class HomePage extends Component {
  static contextType =UserContext;

    constructor(props){
      super(props);
      this.state={
        Data:[],
        isloggedin:false,
        ID:null,
        Email:null,
        Token:null,
        Role:null
      }
    }


    
async componentDidMount(){
  const UserContextData = this.context
  console.log("from post page",UserContextData)
  this.setState({
    ID:UserContextData.ID,
    Email:UserContextData.Email,
    isloggedin:UserContextData.loggedin,
    Token:UserContextData.Token,
    Role:UserContextData.Role
   })
}




  render() {
    return (
 <div>
  <CssBaseline/>
        <LatestDrive/>
        </div>
    )
  }
}

export default HomePage
