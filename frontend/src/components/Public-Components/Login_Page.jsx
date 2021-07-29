import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Snackbar from "@material-ui/core/Snackbar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import './public.css'

import {withRouter} from 'react-router-dom'
import cookie from 'react-cookies'

class Login_Page extends Component {


  constructor(props){
    super(props);
    this.state={
      fields: {},
      errors: {},
      snackbaropen:false,
    }
}

handleValidation(){
  let fields = this.state.fields;
  let errors = {};
  let formIsValid = true;

  
  //Email
  if(!fields["email"]){
    formIsValid = false;
    errors["email"] = "Email Cannot be empty";
  }

  if(typeof fields["email"] !== "undefined"){
    let lastAtPos = fields["email"].lastIndexOf('@');
    let lastDotPos = fields["email"].lastIndexOf('.');

    if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
      formIsValid = false;
      errors["email"] = "Email is not valid";
    }
  }

 

  //describe
  if(!fields["password"]){
    formIsValid = false;
    errors["password"] = "Cant Not be Empty!";
  }



  this.setState({errors: errors});
  return formIsValid;
}

ContactLogin(e){
  e.preventDefault();
  if(this.handleValidation()){
    this.setState({snackbaropen:true})
    this.MakeLogin()
  }else{
    alert("Enter Credinetial!")
  }

}

handleChange(field, e){    		
  let fields = this.state.fields;
  fields[field] = e.target.value;        
  this.setState({fields});
}


async MakeLogin(){
  const data={
    email:this.state.fields["email"],
    password:this.state.fields["password"]
  }
  await fetch('http://localhost:9000/user/login', {
    method: 'POST', // or 'PUT'
    headers: {
   'Content-Type': 'application/json',
   },
       body: JSON.stringify(data),
     })
     .then((response) => response.json())
     .then((data) => {
      console.log('Success:', data);
      cookie.save('token',data.data.AccessToken,{path:'http://localhost:3004'})
      this.props.history.push('/')
      window.location.reload();
    })
     .catch((error) => {
       console.error('Error:', error);
     });



}





  render() {
    return (
        <Container maxWidth="sm">
            <CssBaseline />
                <div className="Paper">
                <Avatar style={{backgroundColor:'#424986',marginTop:'10px'}}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                      Login in
                 </Typography>
                 <form noValidate style={{width:'100%'}}  onSubmit= {this.ContactLogin.bind(this)}  >
         <TextField
               variant="outlined"  margin="normal"
                required   fullWidth
             id="email"  label="Email Address"
             name="email"   autoComplete="email"autoFocus
             ref="email" 
             onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}
             /> 


      <Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>{this.state.errors["email"]}</Typography>


                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        ref="password"
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]}
                                    />
                                      <Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>{this.state.errors["password"]}</Typography>

            <Button type="submit" fullWidth style={{margin:'20px 0px 10px 0px'}}
            variant="contained"color="primary">Log In</Button>

</form>

            <Grid container >
          <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
   </div>

        <Box mt={8}>
      
        </Box>
 </Container>
    )
  }
}


export default withRouter(Login_Page);


