import React, { Component } from 'react'


import MaterialTable from "material-table";
import { Container,Grid, Typography,Paper,TableContainer,Table,TableBody,TableCell,TableHead,TableRow, Divider} from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';


import UserContext from '../ContextManage/UserContext'

import cookie from 'react-cookies'
import jwtdecode from 'jwt-decode';


import ExploreIcon from '@material-ui/icons/Explore';
import {useHistory} from 'react-router-dom';




import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);


export default class Allcompanies extends Component {
  static contextType =UserContext;
  constructor(props){
    super(props)
    this.state={
      isloggedin:false,
      data:[],
      loggedintoken:'',
      message:'',
      singlecomment:[],
      postdata:[],
      ID:null,
      Email:null,
      Role:null,
      Token:null,
      isloggedin:false,
      columns: [
        {
          title: 'Status', field: 'Status',
          editComponent: props => (
            <input
              type="select"
              value={props.value}
              onChange={e => props.onChange(e.target.value)}
            />
          )
        },
      ],
    }

 
  }


  async getcompany(){
   await fetch('http://localhost:9000/drive', {
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
    }).then(response=>this.setState({ data:response.results}))
    .catch(err => {
      this.setState({error:err})
    console.log('caught it!',err);
    })

    console.log(this.state.data)
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

       this.checklogin()
  }

  checklogin(){
    
    if(this.state.isloggedin===false && this.state.Role==="Manager" || "Admin" ){
      this.getcompany()
    }else{
        this.props.history.push('/')
    }
  }


  deletecompany(index){
    const token=cookie.load("token")
    fetch(`http://localhost:9000/drive/${index}`, {
       method: 'DELETE',
       headers: {
        'Content-Type': 'application/json',
         'x-access-token':this.state.Token
      }

   }).then(function(response) {
       if (response.status >= 400) {
           throw new Error("Bad response from server");
       }
       return response.json();
   }).then(response=>{
      this.setState({message:'Commnet Deleted'})
   })
   .catch(err => {
     alert("Cant Delete at That Time")
   })
 }



 //name,detail,salary,allowdbranches,percentagecrieteria,drivedate,lastdattoapply,status

 async  updatecompany(index,Name,Detail,Salary,ALB,PC,DriveDate,LDA,Status){
        const data={
          name:Name ,
          des:Detail,
          salary:Salary,
          alb:ALB,
          prc:PC,
          dd:DriveDate ,
          lda:LDA,
          status:Status
        }
   await fetch(`http://localhost:9000/drive/${index}`, {
       method: 'PATCH',
       headers: {
        'Content-Type': 'application/json',
         'x-access-token':this.state.Token
      },
      body: JSON.stringify(data),
   }) .then(
    function(response) {
      if (response.status === 200) {
        alert("Data Updated  "+ "Status code" +
        response.status);
    }else{
      alert("Data Cant Be Updated "+ "Error Code " +
      response.status);
    }
    }
  )
  .catch((error)=>{
    console.log("ERROR",error)
  //  alert("Somethign Wrong!")
  })


   }

   addnewcompany(){
     this.props.history.push('/app/add-company')
   }

   setcompanydetail(index){
     this.props.history.push(`/app/company-detail/${index}`);
   }



  render() {
    return (
          <ThemeProvider  theme={theme}>
      <Container maxWidth="xl">
            <MaterialTable
            title={"Companies"}
      columns={[
       {title:'ID',field:'ID',editable: 'never'},
        { title: 'Name', field: 'CompanyName' },
        {title:'Description',field:'Detail',type: 'string'}, 
        {title:'Salary (in Lakhs)',field:'Salary',type: 'string'},
        {title:'Allowed Branches',field:'AllowedBranches',type: 'string'},
        {title:'Crieteria (% Avg)',field:'PercentageCrieteria',type: 'string'},
        {title:'Drive Date',field:'DriveDate',type: 'string'},
        {title:'Last Date Apply',field:'LastDateApply',type: 'string'},
        {title:'Status',field:'Status',lookup: { Active: 'Active',NotActive: 'NotActive'},},
        {title:'CreatedAt',field:'CreatedAt',editable: 'never'},
       
      ]}
      data={this.state.data}     
      options={{
        exportButton: true,   filtering: true , actionsColumnIndex: -1
      }}     

      actions={[
        {
          icon: 'add',
          tooltip: 'Add Company',
          isFreeAction: true,
          onClick: (event) => this.addnewcompany()
        },
        {
          icon: 'explore',
          tooltip: 'Explore',
          onClick: (event,rowData) => this.setcompanydetail(rowData.ID)
        }
      ]}
    
      editable={{  
         onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              try{
                this.deletecompany(oldData.ID)
                let data = this.state.data;
                const index = data.indexOf(oldData);
                data.splice(index, 1);
                this.setState({ data }, () => resolve());
                resolve();

              }catch(err){
                alert("can't Remove the Company right now")
                reject();
              }
                  
            }),
        onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
          try{
            this.updatecompany(oldData.ID,newData.CompanyName,newData.Detail,
              newData.Salary,newData.AllowedBranches,newData.PercentageCrieteria,
              newData.DriveDate,newData.LastDateApply,newData.Status)
            const data = this.state.data;
            const index = data.indexOf(oldData);
            data[index] = newData;
            this.setState({ data }, () => resolve());
            resolve();

          }catch(err){  
          alert("cant update the data right now")
      reject();
          }
    
        }),


      }}

    />
  </Container>
  </ThemeProvider>
    )
  }
}

const styles={

  paper:{
    padding:5,
    margin:5,
    overflow:'auto',
    flowdirection:'column',
    height:150
  }


}