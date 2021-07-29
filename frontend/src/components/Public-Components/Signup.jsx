import React, { Component } from 'react'
import { Container, CssBaseline, Typography, createMuiTheme, ThemeProvider, Avatar, TextField, Grid, FormControlLabel, Checkbox, Button , Link , Box} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import cookie from 'react-cookies'

const theme=createMuiTheme();

theme.typography.h4 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2rem',
    },
  };



export default class Signup extends Component {

 constructor(props){
    super(props);
    this.state={
      fields: {},
      errors: {},
      snackbaropen:false,
    }
 }


handleChange(field, e){    		
  let fields = this.state.fields;
  fields[field] = e.target.value;        
  this.setState({fields});
}
signup(e){
  e.preventDefault();
  if(this.handleValidation()){
    this.setState({snackbaropen:true})
    this.MakeLogin()
  }else{
    alert("Enter Credinetial!")
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
  if(!fields["confirm_password"]){
    formIsValid = false;
    errors["confirm_password"] = "Cant confirm_password Not be Empty!";
  }


  this.setState({errors: errors});
  return formIsValid;
}

async MakeLogin(){
  const data={
    email:this.state.fields["email"],
    password:this.state.fields["password"],
    confirm_password:this.state.fields["confirm_password"]
  }

  // console.log(data,   `from make login`)
  await fetch('http://localhost:9000/user/signup',{
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
            <CssBaseline/>
            <ThemeProvider>
                    <Typography variant="h4" align="center" style={{fontWeight:700}}>Signup to SLRTCE T&P CELL</Typography>
                </ThemeProvider>
            <div className="Paper">
            <Avatar style={{marginTop:'20px',backgroundColor:'#424986'}}>
                <AccountCircle fontSize="large"/>
            </Avatar>
            <form  onSubmit= {this.signup.bind(this)} style={{width:'100%',marginTop:'20px'}}>

            <Grid item xs={12} style={{margin:'20px 0px 20px 0px'}}>
            <TextField
             onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}
            name="email" variant="outlined" required fullWidth
            id="useremail" label="Email Address" autoFocus/>
            </Grid>

            <Grid item xs={12} style={{margin:'20px 0px 20px 0px'}}>
            <TextField 
            onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]}  
             name="password" variant="outlined" required fullWidth
             id="userpassword" label="Password" autoFocus type="password"/>
            </Grid>


            <Grid item xs={12} style={{margin:'20px 0px 20px 0px'}}>
            <TextField 
            onChange={this.handleChange.bind(this, "confirm_password")} value={this.state.fields["confirm_password"]}  
             name="confirm-password" variant="outlined" required fullWidth
             id="confirm-password" label="Confirm Password" autoFocus type="password"/>
            </Grid>


            <Grid item xs={12} style={{margin:'20px 0px 20px 0px'}}>
                <FormControlLabel
                control={<Checkbox value="sendpromotionemails" color="primary"/>}
                label="I want to recive Perosonalized Experince , Promotions and Updates Via Email"
                />
                </Grid>


                <Button type="submit" fullWidth variant="contained"
                color="primary">
                    Sign Up
                </Button>

                <Grid container justify="flex-end" style={{margin:'20px 0px 20px 0px'}}>
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
            </form>
            </div>
     </Container>
    )
  }
}


