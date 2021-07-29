import React, { Component } from 'react'
import {Select,NativeSelect, Container, Typography,MenuItem,Button,TextField,Box,FormControl,InputLabel } from '@material-ui/core'

import UserContext from '../../ContextManage/UserContext'
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';



import SaveIcon from '@material-ui/icons/Save'; 

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

export default class UserProfile extends Component {

  static contextType =UserContext;
  constructor(props){
      super(props);
      this.state={
              fields: {},
              errors: {},   
              Data:[],
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
     
     this.GetUserProfile()
    
   }


  
   
   async GetUserProfile(){
    await fetch('http://localhost:9000/userdata/user/userdetailprofile', {
         method: 'GET',
         headers:{
          'Content-Type':'application/json',
          'x-access-token':this.state.Token
        }, 
     }).then(function(response) {
         if (response.status >= 400) {
             throw new Error("Bad response from server");
         }
         return response.json();
     }).then(response=>this.setState({ Data:response.result,isloading:false}))
     .catch(err => {
       this.setState({error:err})
         console.log('caught it!',err);
     })

     console.log("User profile data",this.state.Data)

     this.SetData()

   }



   /*BeAvg: 6.5
Branch: "COMP"
CreatedAt: "2020-04-24"
Gender: "Male"
HscMarks: 80
PhNo: "9221401243"
Placed: "Placed"
SscMarks: 79.78
UserID: 85
userID: 85*/


   async SetData(){
  let fields = this.state.fields;
  fields["phonenumber"] = this.state.Data.PhNo; 
  fields["sscmarks"] = this.state.Data.SscMarks  
  fields["hscmarks"] = this.state.Data.HscMarks;
  fields["beavg"] = this.state.Data.BeAvg;    
  fields["Gender"] = this.state.Data.Gender;    
  fields["Branch"]=this.state.Data.Branch;
  fields["PlacementStatus"]=this.state.Data.Placed;

  await this.setState({fields})

}



    
handleValidation(){
  let fields = this.state.fields;
  let errors = {};
  let formIsValid = true;

 


  if(!fields["Branch"]){
      formIsValid = false;
      errors["Branch"] = "Branch Can not be empty";
    }
    
    
  if(!fields["Gender"]){
      formIsValid = false;
      errors["Gender"] = "Gender Can not be empty";
    }

    
  if(!fields["PlacementStatus"]){
      formIsValid = false;
      errors["PlacementStatus"] = "Placement Status Can not be empty";
    }
    

    if(!fields["phonenumber"]){
      formIsValid = false;
      errors["phonenumber"] = "PhoneNumber Can not be empty";
    }
 


  this.setState({errors: errors});
  return formIsValid;
}




submituserdata(e){
  e.preventDefault();
  if(this.handleValidation()){
    this.setState({snackbaropen:true})
    console.log(this.state.fields)
    this.UpdateUserDetail()
  }else{
    alert("Please Fill The Form")
  }

}

handleChange(field, e){    		
  let fields = this.state.fields;
  fields[field] = e.target.value;        
  this.setState({fields});
}


async UpdateUserDetail(){
  const data={
      phno:this.state.fields["phonenumber"],
      branch:this.state.fields["Branch"],
      sscmarks:this.state.fields["sscmarks"],
      hscmarks:this.state.fields["hscmarks"],
      beavg: this.state.fields["beavg"],
      gender:this.state.fields["Gender"],
      placed: this.state.fields["PlacementStatus"]  
  }

  await fetch(`http://localhost:9000/userdata/user/userdetailprofile/patch`, {
    method: 'PATCH', // or 'PUT'
    headers: {
   'Content-Type': 'application/json',
   'x-access-token':this.state.Token
   },
       body: JSON.stringify(data),
     })
     .then(
      function(response) {
        if (response.status === 200) {
          alert('User Deatils Has Been Added ' +
            response.status);

            setInterval(() => {
              window.location.reload();
            }, 500);
          
          return;
      }

        if (response.status === 500) {
          alert('Something Wrong!' +
            response.status)
          return;
      }
  
      }
    )
    .catch((error)=>{
      alert("Somethign Wrong!")
    })
}



 


  render() {
    return (
    <ThemeProvider  theme={theme}>
     <Container maxWidth="lg">
      <Typography variant="h3" gutterBottom>User Profile</Typography>


      <form noValidate style={{width:'100%'}}  onSubmit= {this.submituserdata.bind(this)}  > 

          <TextField
          id="phonenumber"
          label="Phone Number"
          type="number"
          refs="phonenumber"
          required
          onChange={this.handleChange.bind(this, "phonenumber")} value={this.state.fields["phonenumber"]}
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
        />
         <Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>
             {this.state.errors["phonenumber"]}
             </Typography>
        <Box m={2}></Box>
    
          <TextField
          id="sscmarks"
          label="Ssc Marks (in %)"
          type="number"
          refs="sscmarks"
          required
          onChange={this.handleChange.bind(this, "sscmarks")} value={this.state.fields["sscmarks"]}
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>
             {this.state.errors["sscmarks"]}
             </Typography>
          <Box m={2}></Box>

        <TextField
          id="hscmarks"
          label="Hsc Marks or Diploma (in %)"
          type="number"
          refs="hscmarks"
          onChange={this.handleChange.bind(this, "hscmarks")} value={this.state.fields["hscmarks"]}
          required
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>
             {this.state.errors["hscmarks"]}
             </Typography>
   <Box m={2}></Box>



        <TextField
          id="beavg"
          label="Be Average Pointer"
          type="number"
          refs="beavg"
          onChange={this.handleChange.bind(this, "beavg")} value={this.state.fields["beavg"]}
          required
          maxWidth="20px"
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
        />
         <Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>
             {this.state.errors["beavg"]}
             </Typography>
        <Box m={2}></Box>

        <FormControl style={{minWidth:200}}>
        <InputLabel id="Branch">Branch</InputLabel>
  
        <NativeSelect
         onChange={this.handleChange.bind(this, "Branch")} 
         value={this.state.fields["Branch"]} 
          name="Branch"
          id="Branch"
          inputProps={{ 'aria-label': 'Branch' }}>
       
          <option value="COMPS">COMPS</option>
          <option value="IT">IT</option>
          <option value="EXTC">EXTC</option>
          <option value="ETRX">ETRX</option>
          <option value="CIVIL">CIVIL</option>
          <option value="MECH">MECH</option>
        </NativeSelect>
        </FormControl>
        <Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>
             {this.state.errors["Branch"]}
             </Typography>
        <Box m={5}></Box>


        <FormControl style={{minWidth:200}}>
        <InputLabel id="Gender">Select Gender</InputLabel>
        <NativeSelect
         onChange={this.handleChange.bind(this, "Gender")} 
         value={this.state.fields["Gender"]} 
          name="Gender"
          id="Gender"
          inputProps={{ 'aria-label': 'Gender' }}>
       
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </NativeSelect>
      </FormControl>
      <Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>
             {this.state.errors["Gender"]}
             </Typography>
       <Box m={5}></Box>
      
    
    <FormControl style={{minWidth:200}}>
        <InputLabel id="PlacementStatus">Current Placement Status</InputLabel>
        <NativeSelect
         onChange={this.handleChange.bind(this, "PlacementStatus")} 
         value={this.state.fields["PlacementStatus"]} 
          name="PlacementStatus"
          id="PlacementStatus"
          inputProps={{ 'aria-label': 'PlacementStatus' }}>
          <option value="Placed">Placed</option>
          <option value="NotPlaced">NotPlaced</option>
        </NativeSelect>
        </FormControl>
        <Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>
             {this.state.errors["PlacementStatus"]}
             </Typography>
      


<Box m={3}></Box>


               <Button
        align="center"
            type="submit" 
            size="large"
            startIcon={<SaveIcon />}
            variant="contained" color="primary" value="submit" id="submit">
            Submit
          </Button>
          </form>
     </Container>
     </ThemeProvider>
    )
  }
}
