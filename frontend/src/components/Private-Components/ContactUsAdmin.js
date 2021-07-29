import React, { Component } from 'react'


import MaterialTable from "material-table";
import { Container,Snackbar } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';


import cookie from 'react-cookies'
import jwtdecode from 'jwt-decode';


export default class ContactUsAdmin extends Component {

  constructor(props){
    super(props)
    this.state={
      isloggedin:false,
      data:[],
      loggedintoken:'',
      snackbaropen:false,
      message:''
    }

    this.closethesnackbar = this.closethesnackbar.bind(this);
  }


  async getcategory(){
    const token=cookie.load("token")
    let self = this;
   await fetch('http://localhost:4000/contact', {
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
    }).then(response=>this.setState({ data:response.results}))
    .catch(err => {
      this.setState({error:err})
    console.log('caught it!',err);
    })

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
        this.getcategory()
			}catch(err){
				this.props.history.push('/');
			}
		}	
  }


  deletecontactdata(index){
    const token=cookie.load("token")
    fetch(`http://localhost:4000/contact/${index}`, {
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
      this.setState({snackbaropen:true,message:'Contact Data Deleted'})
      this.setState({    data: this.state.data.filter(item => {    
        if (item.ID !== index) {    
          return item;  
            }    })  });

         this.closethesnackbar()

      
   })
   .catch(err => {
     alert("Cant Delete at That Time")
   })
 }


 closethesnackbar(){
  setInterval(() => {
    this.setState({snackbaropen:false})
  }, 2000);
 }

   updatecontactstatus(index){
   
        const data={
          status:"Read"
        }
    const token=cookie.load("token")
    fetch(`http://localhost:4000/contact/${index}`, {
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
      this.setState({snackbaropen:true,message:'Contact Status Updated'})

      
  this.setState({    
    data: this.state.data.map(contact => {    
          if (contact.ID === index) {        
              contact['Status'] = "Read";    
                    return contact;        }
      return contact;      }) 
    
    });

         this.closethesnackbar()

      
   })
   .catch(err => {
     alert("Cant Delete at That Time")
   })


   }



  render() {
    return (
      <Container maxWidth="xl">
      <MaterialTable
      title={'Contact Data'}
      columns={[
        { title: 'First Name', field: 'FirstName' },
        { title: 'Last Name', field: 'LastName' },
        {title:'Phone Numner',field:'Phonenumber',type: 'string'},
        {title:'Description',field:'Description'},
        {title:'Status',field:'Status',  lookup: { Read: 'Read',Unread: 'unread' },
      },
        {title:'ContactedAt',field:'ContactedAt'},
      ]}
      data={this.state.data}     
      options={{
        exportButton: true,   filtering: true , actionsColumnIndex: -1
      }}     
      actions={[

        {
          icon: 'delete',
          tooltip: 'Delete User',
          onClick: (event, rowData) => this.deletecontactdata(rowData.ID)
        },
        rowData => ({
          icon: 'edit',
          tooltip: 'Update Status',
          onClick: (event, rowData) => this.updatecontactstatus(rowData.ID),
          disabled: rowData.Status=="Read"
        })
      ]}
    />


<Snackbar
        open={this.state.snackbaropen}
        onClose={this.state.snackbaropen}
        message={this.state.message}
     //   TransitionComponent={"right"}
      />
  </Container>
    )
  }
}




