import React, { Component } from 'react'
import { Typography,LinearProgress, CardActions,Button, Container,Grid,Paper,Card,CardActionArea,Divider,CardContent} from '@material-ui/core';

import MaterialTable from "material-table";
import { Link } from 'react-router-dom';

import cookie from 'react-cookies'
import jwtdecode from 'jwt-decode';

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

export default class Companydetail extends Component {

  constructor(props){
    super(props);
    let match = props.match;
    this.state={
        companyid:match.params.ID,
        loggedintoken:'',
        isloggedin:false,
        Data:[],
        CompanyData:[],
        StudentsData:[],
        bridgedata:[],
        isloading:true
    }
  }


  componentDidMount(){
    this.fetchData()
    if(this.state.isloggedin===true){
        this.fetchData()
        
    }
     
  }

  checklogin(){
    const token=cookie.load("token")
		if(!token){
			this.props.history.push('/');
		}else{
			try{
				jwtdecode(token)
        const data=jwtdecode(token);
        this.setState({loggedintoken:token,isloggedin:true})
        this.fetchData()
			}catch(err){
				this.props.history.push('/');
			}
		}	
  }


  async fetchData(){
  const token=cookie.load("token")
   // let self = this;
    await fetch(`http://localhost:9000/applydrive//company/${this.state.companyid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
           'x-access-token':token
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

    //console.log("Data",this.state.Data)
    if(!this.state.Data || this.state.Data.length<=0){
        return null;
    }else{
      this.setdata()
      this.normalizedata()
    
    }
   
  }

  setdata=()=>{
    if(this.state.Data.islength>=0 || this.state.Data){
    this.setState({CompanyData:this.state.Data[0].drives,bridgedata:this.state.Data[0].users})
   // console.log("Company Data",this.state.CompanyData)
   // console.log("StudentData",this.state.bridgedata)
  }
  }

  normalizedata=()=>{
  const data=this.state.bridgedata;
  //console.log("data length",data.length)
  
  let temparray=[]
  for(var i=0;i<data.length;i++){
  var userdataobject={
   ID:data[i].ID,
   Name:data[i].Name,
   Email:data[i].Email,
   PhoneNumber:data[i].userdetail.PhNo,
   Branch:data[i].userdetail.Branch,
   SscMarks:data[i].userdetail.SscMarks,
   HscMarks:data[i].userdetail.HscMarks,
   BeAvg:data[i].userdetail.BeAvg,
   PlacementStatus:data[i].userdetail.Placed,
   Fiileddata:data[i].userdetail.CreatedAt,
   Role:data[i].Role,
   ApplicationSubmission:data[i].applydrife.CreatedAt,
  }
temparray.push(userdataobject)
  
  }
  this.setState({StudentsData:temparray})
 //console.log(this.state.StudentsData)
  }
  
  render() {
    return (
     <Container maxWidth="xl">
      {
        (this.state.isloading===false) ? ( 
          <React.Fragment>
             {
           (!this.state.Data || this.state.Data.length<=0) ? (
            <React.Fragment>
              
              <div style={{lineHeight:'300px',textAlign:'center'}}>
               <Container align="left" maxWidth="sm" style={{display:'inline-block',verticalAlign:'middle'}}>  
              <Card>
            <CardActionArea>
            <CardContent>
            <Typography  gutterBottom variant="p" component="h2">
                  No Student Has Applied For this Drive!
                 </Typography>
                 <Typography variant="body1"  component="p" color="textSecondary">
                   To Know More About Other Drives Go to Drive
                 </Typography>
            </CardContent>
            <CardActions>
            <Link to='/drives' component={Button}>
                  Home
                  </Link>
            </CardActions>
            </CardActionArea>
              </Card>
            </Container>
             </div>



              </React.Fragment> 
            ) :(
              <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={4}>
            
                {
                  this.state.CompanyData.map((data)=>(
                    <Card elevation={1} style={{  height: '100%',
                    display: 'flex',
                    flexDirection: 'column'}}>  
                 <CardActionArea>
                  <CardContent style={{ flexGrow: 1,}}>
                    <Typography  gutterBottom variant="p" component="h2">
                      {data.CompanyName}
                    </Typography>
                    <Divider/>
                    <br/>
                    <Typography variant="body1"  component="p" color="textSecondary">
                       {data.Detail}
                    </Typography>
                   <br/>
                    <Typography  gutterBottom variant="body1" component="p">
                     Salary:- {data.Salary} LPA
                    </Typography>
                    <br/>
                    <Typography  gutterBottom variant="body1" component="p">
                     Allowed Branches:- {data.AllowedBranches}
                    </Typography>
                    <br/>
                    <Typography  gutterBottom variant="body1" component="p">
                     Criterai:- {data.PercentageCrieteria} %
                    </Typography>
                   <br/>
                    <Typography  gutterBottom variant="body1" component="p" style={{fontWeight:'bolder'}}>
                    DriveDate:- {data.DriveDate} 
                    </Typography>
   
                    <br/>
                    <Typography  gutterBottom variant="body1" component="p" style={{fontWeight:'bolder'}}>
                    Last Date To Apply:- {data.LastDateApply} 
                    </Typography>
                  </CardContent>
                  </CardActionArea>
                  
                </Card>
                  ))
                }
         
  
      
              </Grid>
              {/* all Category */}
              <Grid item xs={12} md={8} lg={8}>
              <Paper elevation={3} style={{height:250}}>
                          <MaterialTable
                    title={'Students'}
                    columns={[
                      { title: 'Student ID', field: 'ID',editable: 'never' },
                      {title:'Name',field:'Name',type: 'string'},
                      {title:'User Email',field:'Email'},
                      {title:'Branch',field:'Branch', lookup: { COMP: 'COMPS',IT: 'IT', CIVIL:'CIVIL'},},
                      {title:'Phone Number',field:'PhoneNumber'},
                      {title:'SSC Marks',field:'SscMarks'},
                      {title:'HSC Marks',field:'HscMarks'},
                      {title:'B.E Avg.',field:'BeAvg'},
                      {title:'Placed',field:'PlacementStatus',lookup: { Placed: 'Placed',NotPlaced: 'NotPlaced'},},
                      {title:'Role',field:'Role',  lookup: { User: 'User',Admin: 'Admin', Manager:'Manager'},},
                      {title:'Submitted On',field:'ApplicationSubmission',editable: 'never'},
  
                    ]}
                    data={
                    this.state.StudentsData
                    }     
                    options={{
                      exportButton: true,   filtering: true , actionsColumnIndex: -1
                    }}     
                    actions={[
                      {
                        icon: 'delete',
                        tooltip: 'Delete Comment',
                        onClick: (event, rowData) => this.deletecomment(rowData.ID)
                      },
                      
                    ]}
                  />
              </Paper>
              </Grid>
              </Grid>

            )

       }
          </React.Fragment>
        ):(
            <React.Fragment>
          <LinearProgress/>
            </React.Fragment>
        )

      }




      
      
     </Container>
    )
  }
}


/*<MaterialTable
      title={'Students'}
      columns={[
        { title: 'User ID', field: 'ID',editable: 'never' },
        {title:'Name',field:'Name',type: 'string'},
        {title:'User Email',field:'Email'},
        {title:'Branch',field:this.state.StudentsData, lookup: { COMP: 'COMPS',IT: 'IT', CIVIL:'CIVIL'},},
        {title:'Phone Number',field:'PhoneNumber'},
        {title:'SSC Marks',field:'SscMarks'},
        {title:'HSC Marks',field:'HscMarks'},
        {title:'B.E Avg.',field:'BeAvg'},
        {title:'Role',field:'Role',  lookup: { User: 'User',Admin: 'Admin', Manager:'Manager'},},
        //{title:'SignUpdate',field:'CreatedAt',editable: 'never'},

      ]}
      data={
       this.state.StudentsData
      }     
      options={{
        exportButton: true,   filtering: true , actionsColumnIndex: -1
      }}     
      actions={[
        {
          icon: 'delete',
          tooltip: 'Delete Comment',
          onClick: (event, rowData) => this.deletecomment(rowData.ID)
        },
      ]}
    />*/
