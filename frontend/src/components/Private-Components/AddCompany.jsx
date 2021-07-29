import React,{Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Paper,Snackbar,Grid, Box,MenuItem ,FormControl,InputLabel,Chip,Input,} from '@material-ui/core';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SaveIcon from '@material-ui/icons/Save';
import Select from '@material-ui/core/Select';

import cookie from 'react-cookies'
import jwtdecode from 'jwt-decode';



import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const token=cookie.load("token")
export default class AddCompany extends Component {


  constructor(props){
    super(props);
    this.state={
      fields: {},
      errors: {},
      Status:'NotActive',
      loggedintoken:'',
      message:'',
      isloggedin:false,
      AuthorID:'',
      Branches:['COMP','IT','CIVIL','MECH','EXTC','ETRX'],
      SelectedBranch:['COMP','IT'],
      snackbaropen:false
    }
}

handleValidation(){
  let fields = this.state.fields;
  let errors = {};
  let formIsValid = true;

  // title
  if(!fields["title"]){
    formIsValid = false;
    errors["title"] = "Title Cannot be empty";
  }

  //desscripton
  if(!fields["description"]){
    formIsValid = false;
    errors["description"] = "Description Cant Not be Empty!";
  }
  this.setState({errors: errors});
  return formIsValid;


  
}




contactSubmit(e){
  e.preventDefault();
  if(this.handleValidation()){
    this.setState({snackbaropen:true})
    this.addnewdrive()
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




async  addnewdrive(){
   const data = { 
   name:`${this.state.fields["title"]}` ,
   dd: `${this.state.fields["dd"]}`,
   des:`${this.state.fields["description"]}`,
   ald:`${this.state.SelectedBranch}`,
   salary:`${this.state.fields["Salary"]}`,
   prc:`${this.state.fields["AvgMarks"]}`,
   lda:`${this.state.fields["dd"]}`,
   status:`${this.state.Status}`,
   uid:`${this.state.AuthorID}`
   };

  await fetch('http://localhost:9000/drive/', {
  method: 'POST',    // or 'PUT'
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'x-access-token':token,
  },
  body: JSON.stringify(data),
}).then(
  function(response) {
    if (response.status === 200) {
     alert("New Drive Added! Status Code"+response.status)
      return;
    }
    if(response.status===500){
      console.log("error response for 500"+response.message.errors)
      return;
    }
  }
)
.catch((error)=>{
  alert("Cant add new drive")
})

}


componentDidMount(){
  this.checklogin()
}


checklogin(){
  if(!token){
    this.props.history.push('/');
  }else{
    try{
      jwtdecode(token)
      const data=jwtdecode(token);
      this.setState({loggedintoken:token,AuthorID:data.ID})
    }catch(err){
      this.props.history.push('/');
    }
  }	
}


handlebranch=(event)=>{
  this.setState({SelectedBranch:event.target.value})
}

handlestatus=(event)=>{
  this.setState({Status:event.target.value})
  console.log(this.state.Status)
}




  render() {
    return (
      <ThemeProvider  theme={theme}>
      <div style={styles.root}>
       <Container component="main" maxWidth="md">
       <br/>
       <Typography variant="h4" component="h2" gutterBottom>
          Add New Drive
        </Typography>
        <br/>
        <form noValidate style={{width:'100%'}}  onSubmit= {this.contactSubmit.bind(this)}  >
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <Box m={2}>
                      <Typography variant="secondry">Company Name</Typography>
                      </Box>
        <TextField
                autoComplete="title"  name="title"
                variant="filled" required fullWidth
                ref="title" id="title"
                label="Title" autoFocus
                onChange={this.handleChange.bind(this, "title")} value={this.state.fields["title"]}
            />
               <Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>{this.state.errors["title"]}</Typography>
               </Grid>
               <Grid item xs={12} sm={6}>

               <Box m={2}>
                      <Typography variant="secondry">Short Description Of company</Typography>
                      </Box>

        <TextField
                variant="filled" required
                multiline
                rows="4"
                ref="description"fullWidth
                id="description"label="Description"
                name="description"autoComplete="description"
                autoFocus
                onChange={this.handleChange.bind(this, "description")} value={this.state.fields["description"]}
              />
             <Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>{this.state.errors["description"]}</Typography>
           </Grid>
          </Grid>
          {/* for percentage criteria allowed branches salary */}

            <Grid container spacing={3} align="center">
            <Grid item xs={12} sm={4}>
                  <Box m={2}>
                      <Typography variant="secondry">{`Salary
                      (in Lakhs)`}
                      </Typography>
                      </Box>
                      <br/>
                      <TextField
                      id="outlined-number"
                      label="Salary"
                      name="Salary"
                      ref="Salary"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      onChange={this.handleChange.bind(this, "Salary")} value={this.state.fields["Salary"]}
                    />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Box m={2}>
                      <Typography variant="secondry">Average Marks of (10th , 12th/Diploma , BE)</Typography>
                      </Box>
                    <TextField
                      id="outlined-number"
                      label="AvgMarks"
                      ref="AvgMarks"
                      name="AvgMarks"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      onChange={this.handleChange.bind(this, "AvgMarks")} value={this.state.fields["AvgMarks"]}
                      />
                    </Grid>
                      <Grid item xs={12} sm={4}>
                      <Box m={2}>
                      <Typography variant="secondry">Allowed Branched ( select atlest One Branch )</Typography>
                      </Box>
                      
                      <FormControl style={{width:"90%"}}>
                                          <Select
                          labelId="demo-mutiple-chip-label"
                            id="demo-mutiple-chip"
                            multiple
                          value={this.state.SelectedBranch}
                                            onChange={this.handlebranch}
                                            input={<Input id="select-multiple-chip" />}
                                            renderValue={(selected) => (
                                              <div style={{display:"flex",flexWrap:"wrap"}}>
                                                {selected.map((value) => (
                                                  <Chip key={value} label={value} style={{margin:2}} />
                                                ))}
                                              </div>
                                            )}
                                           MenuProps={MenuProps}
                                          >
                                            {this.state.Branches.map((name) => (
                                              <MenuItem key={name} value={name}>
                                                {name}
                                              </MenuItem>
                                            ))}
                                          </Select>
                          </FormControl>

                    
                      </Grid>
            </Grid>

                        {/* for drive data , last date to fill , status of the drive */}


                        <Grid container spacing={3} align="center">
                          <Grid item xs={12} sm={4}>
                               <Box m={2}>
                               <Typography variant="secondry">Last Date to Apply <br/></Typography>
                                </Box>
                                <TextField
                                      id="lda"
                                      type="date"
                                      ref="lda"
                                      name="lda"
                                      required pattern="\y{4}-\m{2}-\d{2}"
                                      variant="filled"
                                    InputLabelProps={{
                                        shrink: true,
                                      }}
                                    
                                      onChange={this.handleChange.bind(this, "lda")} value={this.state.fields["lda"]}
                                    />

                          </Grid>


                          <Grid item xs={12} sm={4}>
                               <Box m={2}>
                               <Typography variant="secondry">Drive Date <br/></Typography>
                                </Box>

                                <TextField
                                      id="dd"
                                     
                                      variant="filled"
                                      type="date"
                                      name="dd"
                                      ref="dd"
                                      InputLabelProps={{
                                        shrink: true,
                                        dateFormat: 'yyyy-mm-dd'
                                      }}
                                      onChange={this.handleChange.bind(this, "dd")} value={this.state.fields["dd"]}
                                    
                                    />

                          </Grid>


                          <Grid item xs={12} sm={4}>
                               <Box m={2}>
                               <Typography variant="secondry">Status of Drive <br/></Typography>
                                </Box>
                                    
          <FormControl style={{minWidth:200}}>
   
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={this.state.Status}
          onChange={this.handlestatus}
          >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="NotActive">NotActive</MenuItem>
        </Select>
        </FormControl>
          </Grid>



                        </Grid>
<Box m={8} align="center">
        <Button
        align="center"
            type="submit" 
            size="large"
            startIcon={<SaveIcon />}
            variant="contained" color="primary" value="submit" id="submit">
            Submit
          </Button>
          </Box>
        </form>
        <br/>
        </Container>
        
        
<Snackbar
        open={this.state.snackbaropen}
        onClose={this.state.snackbaropen}
        message={this.state.message}
        />
       </div>
       </ThemeProvider>
    )
  }
}




const styles={
  root: {
    display: 'flex',
    flexDirection: 'column',
    height:'auto'
  },
}