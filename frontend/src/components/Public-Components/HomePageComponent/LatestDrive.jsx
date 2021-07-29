import React, { Component } from 'react'
import { Container,ThemeProvider,createMuiTheme, Button, Grid,Card,CardActions,CardContent ,
    Typography, Divider, CssBaseline,Box,CardActionArea} from '@material-ui/core'
import UserContext from '../../ContextManage/UserContext'



import { Link } from 'react-router-dom';



  const theme=createMuiTheme();

theme.typography.h3 = {
    fontSize: '2rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2rem',
    },
  };


class LatestDrive extends Component {

  static contextType =UserContext;
    constructor(props){
        super(props);
        this.state={
                Drives:[],
                ID:null,
                Email:null,
                Role:null,
                Token:null,
                isloggedin:false,
                isloading:true
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
      this.GetLatestDrive();
      
   }


   
 
   async GetLatestDrive(){
   await fetch('http://localhost:9000/drive/publicdrive', {
        method: 'GET'
    }).then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    }).then(response=>this.setState({ Drives:response.result,isloading:false}))
    .catch(err => {
      this.setState({error:err})
    console.log('caught it!',err);
    })
  }



  async applyfordrive(driveid){

    const data={
      companyid:driveid,
      userid:this.state.ID
    }

    await fetch('http://localhost:9000/applydrive/insertdrive',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'x-access-token':this.state.Token
      }, 
      body:JSON.stringify(data),
    })
    .then(
      function(response) {
        if (response.status !== 200) {
          alert('Cant Apply Again: ' +
            response.status);
          return;
        }
  
        // Examine the text in the response
        response.json().then(function(data) {
          alert("Applied SuccessFully!");
        });
      }
    )
    .catch((error)=>{
      alert("Cant Applly for the drive")
    })


  }



    render() {
      return (
     <Container maxWidth="lg" style={{marginBottom:"40px"}}>
         <CssBaseline/>
           <ThemeProvider>
                    <Typography component="div" gutterBottom align="left" >
                    <Box letterSpacing={1} m={1}  fontWeight={500} fontSize="h4.fontSize" fontFamily="Arial">
                        Drives
                    </Box>
                    </Typography>
                </ThemeProvider>
                <br/>
         <div className="Paper">
          <Grid container spacing={3}>
            {this.state.Drives.map(drive => (
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
                {
                  (this.state.isloggedin===false) ? (
                    <React.Fragment>   
                    <Divider/>         
               <CardActions>
                  <Link to='/login' component={Button}>
                    Login To Apply
                  </Link>
               </CardActions>
               </React.Fragment>
                  ):(
                 
                    <React.Fragment>   
                         <Divider/>         
                    <CardActions>
                        <Button
                        onClick={()=>this.applyfordrive(drive.ID)}
                        variant="outlined" color="primary">
                            Apply!
                        </Button>
                    </CardActions>
                    </React.Fragment>
                  )
                }
             </Card>
           </Grid>
            ))}
          </Grid>         
          </div>
        </Container>
       
      )
    }
  }


  export default LatestDrive
  /*function Cardpost(props) {
      return(
    <h1>{props.data}</h1>
      )
  }


  {featuredPosts.map(post => (
    <Cardpost data={post}/>
   ))}*/
  

