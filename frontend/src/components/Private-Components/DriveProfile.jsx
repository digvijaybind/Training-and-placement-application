import React, { Component } from 'react'
import { Typography,Button,LinearProgress,CardActions, Container,Grid,Paper,Card,CardActionArea,Divider,CardContent} from '@material-ui/core';


import UserContext from '../ContextManage/UserContext'

import {Link } from 'react-router-dom'
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

export default class Companydetail extends Component {
  static contextType =UserContext;
  constructor(props){
    super(props);
    this.state={
        isloggedin:true,
        Data:[],
        CompanyData:[],
        ID:null,
        Email:null,
        Role:null,
        Token:null,
        isloading:true,
    }
  }


 async componentDidMount(){

  const UserContextData = this.context
  await this.setState({
    ID:UserContextData.state.ID,
    Email:UserContextData.state.Email,
    isloggedin:UserContextData.state.loggedin,
    Token:UserContextData.state.Token,
    Role:UserContextData.state.Role
   })

  if(this.state.isloggedin===true){
        this.fetchData()
    }
 
  }

 

  async fetchData(){
  
   // let self = this;
    await fetch(`http://localhost:9000/applydrive//student/${this.state.ID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           'x-access-token':this.state.Token
        }
    }).then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    }).then(response=>this.setState({Data:response.results,isloading:false}))
    .catch(err => {
      this.setState({error:err})
    console.log('caught it!',err);
    })
   
  }

 

  
  render() {
    return (
     <Container maxWidth="xl">
  {
    (this.state.isloading===false) ?(
      <React.Fragment>
        {
           (!this.state.Data || this.state.Data.length<=0) ? (
             <div style={{lineHeight:'300px',textAlign:'center'}}>
               <Container align="left" maxWidth="sm" style={{display:'inline-block',verticalAlign:'middle'}}>  
              <Card>
            <CardActionArea>
            <CardContent>
            <Typography  gutterBottom variant="p" component="h2">
                  You Haven't Applied for any Drive
                 </Typography>

                 <Typography variant="body1"  component="p" color="textSecondary">
                    Go to Homepage to findout the Latest Avalibale Drive.
                 </Typography>
            </CardContent>
            <CardActions>
            <Link to='/' component={Button}>
                  Home
                  </Link>
            </CardActions>
            </CardActionArea>
              </Card>
            </Container>
             </div>
            ) :(
             
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={4}>
        
                <Card elevation={1} style={{  height:'auto',
                    display: 'flex',
                    flexDirection: 'column'}}>  
                 <CardActionArea>
                  <CardContent style={{ flexGrow: 1,}}>
                    <Typography  gutterBottom variant="p" component="h2">
                      {this.state.Email}
                    </Typography>
                    <br/>
                    <Typography variant="body1"  component="p" color="textSecondary">
                       ID:-{this.state.ID}
                    </Typography>
                   <br/>
                    <Typography  gutterBottom variant="body1" component="p">
                    Role:- {this.state.Role}
                    </Typography>
                    <br/> 
                  </CardContent>
                  </CardActionArea>
                  
                </Card>
                </Grid>
                  <Grid item xs={12} md={8} lg={8}>
                  <Grid container spacing={3}>

                 {
                   this.state.Data[0].drives.map((drive)=>(
                    <Grid item key={drive.ID} xs={12} sm={8} md={4}>
                    <Card elevation={1} style={{  height: '100%',
                        display: 'flex',
                        flexDirection: 'column'}}>  
                    <CardActionArea>
                      <CardContent style={{ flexGrow: 1,}}>
                        <Typography  gutterBottom variant="p" component="h2">
                          {drive.CompanyName}
                        </Typography>
                        <Divider/>
                        <br/>
                        <Typography variant="body1"  component="p" color="textSecondary">
                           {drive.Detail}
                        </Typography>
                       <br/>
                        <Typography  gutterBottom variant="body1" component="p">
                         Salary:- {drive.Salary} LPA
                        </Typography>
                        <br/>
                        <Typography  gutterBottom variant="body1" component="p">
                         Allowed Branches:- {drive.AllowedBranches}
                        </Typography>
                        <br/>
                        <Typography  gutterBottom variant="body1" component="p">
                         Criterai:- {drive.PercentageCrieteria} %
                        </Typography>
                       <br/>
                        <Typography  gutterBottom variant="body1" component="p" style={{fontWeight:'bolder'}}>
                        DriveDate:- {drive.DriveDate} 
                        </Typography>
       
                        <br/>
                        <Typography  gutterBottom variant="body1" component="p" style={{fontWeight:'bolder'}}>
                        Last Date To Apply:- {drive.LastDateApply} 
                        </Typography>
                      </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
  
                   ))
                 }

                  </Grid>
                       </Grid>
                </Grid>
            )}
      </React.Fragment>
    ):(
      <React.Fragment>
         <LinearProgress/>
         <Typography variant="h6">Loading..</Typography>
     </React.Fragment>

    )
  }
       
      
     </Container>
    )
  }
}

