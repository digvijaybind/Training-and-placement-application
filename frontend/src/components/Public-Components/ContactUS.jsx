import React, { Component } from 'react'
import { createMuiTheme, 
  Container, CssBaseline,Button, 
  Typography,TextField, 
  ThemeProvider,
   Grid , Snackbar} from '@material-ui/core'
import './public.css'

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

class ContactUS extends Component {
    constructor(props){
        super(props);
        this.state={
          fields: {},
          errors: {},
          snackbaropen:false
        }
    }

    handleValidation(){
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;
  
      // first Name
      if(!fields["fname"]){
        formIsValid = false;
        errors["fname"] = "First Name Cannot be empty";
      }
  
      if(typeof fields["fname"] !== "undefined"){
        if(!fields["fname"].match(/^[a-zA-Z]+$/)){
          formIsValid = false;
          errors["fname"] = "Only letters";
        }      	
      }

      //lastname
      if(!fields["lname"]){
        formIsValid = false;
        errors["lname"] = " Last Name Cannot be empty";
      }
  
      if(typeof fields["lname"] !== "undefined"){
        if(!fields["lname"].match(/^[a-zA-Z]+$/)){
          formIsValid = false;
          errors["lname"] = "Only letters";
        }      	
      }
  
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
  
      //phone Number
      if(!fields["phone"]){
        formIsValid = false;
        errors["phone"] = "Last Name Cannot be empty";
      }
  
      if(typeof fields["phone"] !== "undefined"){
        if(fields["phone"].match(/^[a-zA-Z]+$/)){
          formIsValid = false;
          errors["phone"] = "Only Numbers are Allowed";
        }  	
      }

      //describe
      if(!fields["describe"]){
        formIsValid = false;
        errors["describe"] = "Cant Not be Empty!";
      }
  
  
  
      this.setState({errors: errors});
      return formIsValid;
    }
  
    contactSubmit(e){
      e.preventDefault();
      if(this.handleValidation()){
        this.setState({snackbaropen:true})
        this.sendcontact();
        setInterval(function(){ 
        window.location.reload();
         }, 1500);
      
         
      }else{
        alert("Please Fill The Form")
      }
  
    }
  
    handleChange(field, e){    		
      let fields = this.state.fields;
      fields[field] = e.target.value;        
      this.setState({fields});
    }


    sendcontact(){
       const data = { 
         fname: this.state.fields["fname"] ,
         lname: this.state.fields["lname"],
         email: this.state.fields["email"],
           phno: this.state.fields["phone"],
           description: this.state.fields["describe"]
        };
        fetch('http://localhost:4000/contact', {
         method: 'POST', // or 'PUT'
         headers: {
        'Content-Type': 'application/json',
        },
            body: JSON.stringify(data),
          })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
            this.setState({snackbaropen:true})
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }



  render() {
    return (
     <Container component="main" maxWidth="sm">
    <CssBaseline/>
     <div style={{ display:'flex',flexDirection:'column',alignItems:'center'}}>
        <ThemeProvider>
        <Typography variant="h4" style={{fontWeight:700,marginBottom:'20px'}}>Contact US</Typography>
        </ThemeProvider>
        <form noValidate style={{width:'100%'}}  onSubmit= {this.contactSubmit.bind(this)}  >
            <Grid container spacing={2}>
           <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                ref="firstname"
                id="fname"
                label="First Name"
                autoFocus
                onChange={this.handleChange.bind(this, "fname")} value={this.state.fields["fname"]}
            />
               <Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>{this.state.errors["fname"]}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                ref="lname"
                fullWidth
                id="lname"
                label="Last Name"
                name="lname"
                autoComplete="lname"
                autoFocus
              
                onChange={this.handleChange.bind(this, "lname")} value={this.state.fields["lname"]}
              />
             <Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>{this.state.errors["lname"]}</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                autoFocus
                fullWidth
                type="email"
                id="email"
                refs="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}
              />

            <Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>{this.state.errors["email"]}</Typography>
            </Grid>

            <Grid item xs={12}>
            <TextField type="tel" id="phone" name="phone"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  label="Phone Number"
                  required variant="outlined" autoFocus fullWidth 
                  onChange={this.handleChange.bind(this, "phone")} value={this.state.fields["phone"]}
                  />
               <Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>{this.state.errors["phone"]}</Typography>
            </Grid>

            <Grid item xs={12}>
            <TextField
                id="describe"
                label="Exaplin Your Self"
                multiline
                rows="4"
                refs="describe"
                name="describe"
                variant="outlined"
                fullWidth
                onChange={this.handleChange.bind(this, "describe")} value={this.state.fields["describe"]}
                />

<Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>{this.state.errors["describe"]}</Typography>



            </Grid>

            <Grid item xs={12}>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            value="submit"
            id="submit"
            >
            Submit
          </Button>
            </Grid>
            </Grid>
        </form>
        <Snackbar
        open={this.state.snackbaropen}
        onClose={this.state.snackbaropen}
        message="Message Sent!"
        TransitionComponent={"right"}
      />
     </div>
     </Container>
    )
  }
}

export default ContactUS
