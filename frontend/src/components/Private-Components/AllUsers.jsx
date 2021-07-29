import React, { Component } from 'react'


import MaterialTable from "material-table";
import { Container,Grid, Typography,Paper,TableContainer,Table,TableBody,TableCell,TableHead,TableRow, Divider} from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';


import cookie from 'react-cookies'
import jwtdecode from 'jwt-decode';



import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { object } from 'prop-types';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);



export default class AllComments extends Component {

  constructor(props){
    super(props)
    this.state={
      isloggedin:false,
      data:[],
      rawdata:[],
      loggedintoken:'',
      message:'',

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


  async getusers(){
    const token=cookie.load("token")
    let self = this;
   await fetch('http://localhost:9000/user/alluserwithdata', {
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
    }).then(response=>this.setState({ rawdata:response.result}))
    .catch(err => {
      this.setState({error:err})
    console.log('caught it!',err);
    })
    
  const data=this.state.rawdata
  console.log(data.length)
  let bridgedata=[]
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
     CreatedAt:data[i].CreatedAt,
    }
  bridgedata.push(userdataobject)
    
    }
    this.setState({data:bridgedata})
    console.log(this.state.data)
  }



   componentDidMount(){
      this.checklogin()
  
  }

  
  checklogin(){
    const token=cookie.load("token")
		if(!token){
			this.props.history.push('/');
		}else{
			try{
				jwtdecode(token)
        const data=jwtdecode(token);
        console.log(data)
        this.setState({loggedintoken:token,isloggedin:true})
        this.getusers()
			}catch(err){
				this.props.history.push('/');
			}
		}	
  }


  deletecomment(index){
    const token=cookie.load("token")
    fetch(`http://localhost:4000/comment/${index}`, {
       method: 'DELETE',
       headers: {
        'Content-Type': 'application/json',
         'x-access-token':token
      }

   }).then(function(response) {
       if (response.status >= 400) {
           throw new Error("Bad response from server");
       }
       return response.json();
   }).then(response=>{
      this.setState({message:'Commnet Deleated'})
      this.setState({    data: this.state.data.filter(item => {    
        if (item.ID !== index) {    
          return item;  
            }    })  });

      
   })
   .catch(err => {
     alert("Cant Delete at That Time")
   })
 }

   updatecomment(index,comment,Aname,Aemail,Status){
        const data={
          comment:comment,
          aname:Aname,
          aemail:Aemail,
          status:Status
        }
    const token=cookie.load("token")
    fetch(`http://localhost:4000/comment/${index}`, {
       method: 'PATCH',
       headers: {
        'Content-Type': 'application/json',
         'x-access-token':token
      },
      body: JSON.stringify(data),
   }).then(function(response) {
       if (response.status >= 400) {
           throw new Error("Bad response from server");
       }
       return response.json();
   }).then(response=>{
      this.setState({message:'Comment Updated'})
         this.closethesnackbar()
   })
   .catch(err => {
     alert("Cant Delete at That Time")
   })

   }



   //get single comment data

        async  commentdata(index){
            const token=cookie.load("token")
            let self = this;
          await fetch(`http://localhost:4000/comment/${index}`, {
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
            }).then(response=>this.setState({ singlecomment:response.result,postdata:response.result.post}))
            .catch(err => {
              this.setState({error:err})
            console.log('caught it!',err);
            })

            console.log(this.state.singlecomment.post)
          }



  render() {
    return (
     <ThemeProvider  theme={theme}>
      <Container maxWidth="xl">
            <MaterialTable
      title={'User'}
      columns={[
        { title: 'User ID', field: 'ID',editable: 'never' },
        {title:'Name',field:'Name',type: 'string'},
        {title:'User Email',field:'Email'},
        {title:'Branch',field:'Branch', lookup: { COMP: 'COMPS',IT: 'IT', CIVIL:'CIVIL'},},
        {title:'Phone Number',field:'PhoneNumber'},
        {title:'SSC Marks',field:'SscMarks'},
        {title:'HSC Marks',field:'HscMarks'},
        {title:'B.E Avg.',field:'BeAvg'},
        {title:'Placed',field:'PlacementStatus',lookup: { Placed: 'Placed',NotPlaced: 'NotPlaced'},},
        {title:'Role',field:'Role',  lookup: { User: 'User',Admin: 'Admin', Manager:'Manager'},},
        {title:'SignUpdate',field:'CreatedAt',editable: 'never'},

      ]}
      data={
       this.state.data
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
      editable={{  
        onRowUpdate: (newData, oldData) =>
        new Promise((resolve, reject) => {
          try{
            this.updatecomment(oldData.ID,newData.comment,newData.AuthorName,newData.AuthorEmail,newData.Status)
            const data = this.state.data;
            const index = data.indexOf(oldData);
            data[index] = newData;
            this.setState({ data }, () => resolve());
            console.log(newData.comment,newData.AuthorEmail,newData.AuthorName,newData.postID,newData.Status)
            resolve();

          }catch(err){  
          alert("camt update the data right now")
      reject();
          }
    
        }),


      }}
    />


  </Container>

  { /* edit the comment */}
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