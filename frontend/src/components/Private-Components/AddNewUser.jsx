import React,{Component} from 'react';
import { Container,Grid,TextField,
  Button,Select,Box,Typography,MenuItem,InputLabel,FormControl,
  FormLabel,FormControlLabel,Radio,RadioGroup,
  Paper} from '@material-ui/core';

  import UserDetailAdd from '../Private-Components/Components/UserDetailAdd'
  import SaveIcon from '@material-ui/icons/Save';


import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);


export default class AddNewUser extends Component {




  constructor(props){
    super(props);
    this.state={
      fields: {},
      errors: {},
      Role:'User'

    }
}



handleValidation(){
  let fields = this.state.fields;
  let errors = {};
  let formIsValid = true;

  // title
  if(!fields["name"]){
    formIsValid = false;
    errors["name"] = "Name Cannot be empty";
  }


  //Email
  if(!fields["email"]){
    formIsValid = false;
    errors["email"] = "Email Cant Be Empty";
  }

  if(typeof fields["email"] !== "undefined"){
    let lastAtPos = fields["email"].lastIndexOf('@');
    let lastDotPos = fields["email"].lastIndexOf('.');

    if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
      formIsValid = false;
      errors["email"] = "is this a email ?";
    }
  }

  //password
  if(!fields["password"]){
    formIsValid = false;
    errors["password"] = "Password Not be Empty!";
  }

  this.setState({errors: errors});
  return formIsValid;
}




submituserdata(e){
  e.preventDefault();
  if(this.handleValidation()){
    this.setState({snackbaropen:true})
    this.addnewuser()
    console.log(this.state.fields)
  }else{
    alert("Please Fill The Form")
  }

}

handleChange(field, e){    		
  let fields = this.state.fields;
  fields[field] = e.target.value;        
  this.setState({fields});
}


async addnewuser(){
  const data={
    name:this.state.fields["name"],
    email:this.state.fields["email"],
    password:this.state.fields["password"]
  }
  await fetch('http://localhost:9000/user/signup', {
    method: 'POST', // or 'PUT'
    headers: {
   'Content-Type': 'application/json',
   },
       body: JSON.stringify(data),
     }) 
     .then(
      function(response) {
        if (response.status === 200) {
          alert('User Has Been Added' +
            response.status);
            Window.location.realod('/')
          return;
      }

        if (response.status === 500) {
          alert('Something Wrong!  Status Code:-' +
            response.status)
          return;
      }
  
      }
    )
    .catch((error)=>{
      alert("Somethign Wrong!")
    })

}


handlerole=(event)=>{
  this.setState({
    Role:event.target.value
  })

  console.log(this.state.Role)
}



render(){
  return (
        <Container maxWidth="lg"  component="main">
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6} component={Paper} style={{padding:20}}>
       
        <form noValidate style={{width:'100%'}}  onSubmit= {this.submituserdata.bind(this)}  > 
        <Typography variant="h4" component="h2" gutterBottom>
          User Porfile
          </Typography>
          <Box m={2}></Box>
          <TextField
                autoComplete="name"  name="name"
                variant="filled" required 
                 id="name"
                 ref="name"
                 fullWidth
                label="Name" autoFocus
                onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]}
            />
             <Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>{this.state.errors["name"]}</Typography>

            <TextField
                autoComplete="email"  name="email"
                variant="filled" required 
                 id="email"
                 refs="email"
                 fullWidth
                 onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}
                label="Email" autoFocus
               
            />
              <Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>{this.state.errors["email"]}</Typography>
            <Box m={3}></Box>
            <TextField
                autoComplete="password"  name="password"
                variant="filled" required 
                 id="password"
                 refs="password"
                 fullWidth
                label="Password" autoFocus
                onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]}
              
            />
              <Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>{this.state.errors["password"]}</Typography>
              <Box m={3}>
              </Box>

              <Typography variant="secondry">Default Role will be set to "USER" if not Provided</Typography>
              <Box m={2}></Box>
         <FormLabel component="legend">User Role</FormLabel>
        <RadioGroup aria-label="role" name="role" value={this.state.Role} onChange={this.handlerole}>
          <FormControlLabel value="User" control={<Radio />} label="User" />
          <FormControlLabel value="Manager" control={<Radio />} label="Manager" />
          <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
        </RadioGroup>
<Box m={5}></Box>
      


<Button
        align="center"
            type="submit" W
            size="large"
            startIcon={<SaveIcon />}
            variant="contained" color="primary" value="submit" id="submit">
            SAVE
          </Button>

          </form>
        </Grid>






        <Grid item xs={12} sm={6} component={Paper} style={{padding:20}}>
        <UserDetailAdd/>
        </Grid>
        </Grid>


        </Container>

  );
}
}
