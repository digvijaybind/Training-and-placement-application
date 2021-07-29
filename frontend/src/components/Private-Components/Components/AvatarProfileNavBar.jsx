import React, { Component } from 'react'
import { Container, Avatar,Typography, Divider, Button } from '@material-ui/core'
import UserContext from '../../ContextManage/UserContext'

export default class AvatarProfileNavBar extends Component {
    static contextType =UserContext;
    constructor(props){
        super(props);
        this.state={
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
   await this.setState({
      ID:UserContextData.state.ID,
      Email:UserContextData.state.Email,
      isloggedin:UserContextData.state.loggedin,
      Token:UserContextData.state.Token,
      Role:UserContextData.state.Role
     })
  }

  Logout=()=>{
    const UserContextData = this.context
    UserContextData.OnLogout()
  }
  
  

  render() {
    const Author=this.state.Email;
    return (
        <Container maxWidth="xl" align="center" >
            <br/>
            <Typography variant="subtitle1" align="left" style={{fontWeight:700}}>Role :- &nbsp; {this.state.Role}</Typography>
            <Typography variant="subtitle1" align="left">Email :- &nbsp; {this.state.Email}</Typography>
             <Typography variant="subtitle1"align="left">User ID :- &nbsp; {this.state.ID}</Typography>
             <br/>
             <Button variant="outlined" color="secondary"
             onClick={()=>this.Logout()}
             >LOGOUT</Button>
            
        </Container>
    )
  }
}
