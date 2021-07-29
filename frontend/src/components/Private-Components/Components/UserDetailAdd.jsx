import React, { Component } from 'react'
import { Container,Grid,TextField,
    Button,Select,Box,Typography,MenuItem,InputLabel,FormControl,
    FormLabel,FormControlLabel,Radio,RadioGroup,
    Paper} from '@material-ui/core';


    import UserContext from '../../ContextManage/UserContext'

    import SaveIcon from '@material-ui/icons/Save'; 
export default class UserDetail extends Component {


    static contextType =UserContext;

    constructor(props){
        super(props);
        this.state={
          fields: {},
          errors: {},    
          ID:null,
                Email:null,
                Role:null,
                Token:null,
                isloggedin:false,

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
       }
    



    
handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
  
    // title
    if(!fields["ID"]){
      formIsValid = false;
      errors["ID"] = "ID Cannot be empty";
    }


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
      this.adduserdetail()
    }else{
      alert("Please Fill The Form")
    }
  
  }
  
  handleChange(field, e){    		
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
  }
  
  /*
   UserID:ID,
    Gender:req.body.gender,
    PhNo:req.body.phno,
    Branch:req.body.branch,
    SscMarks:req.body.sscmarks,
    HscMarks:req.body.hscmarks,
    BeAvg:req.body.beavg,
    Placed:req.body.placed*/



  
  async adduserdetail(){
    const data={
        phno:this.state.fields["phonenumber"],
        branch:this.state.fields["Branch"],
        sscmarks:this.state.fields["sscmarks"],
        hscmarks:this.state.fields["hscmarks"],
        beavg: this.state.fields["beavg"],
        gender:this.state.fields["Gender"],
        placed: this.state.fields["PlacementStatus"]  
    }

    await fetch(`http://localhost:9000/userdata/${this.state.fields["ID"]}`, {
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
            alert("User Details Added! "+ "Error Code " +
            response.status);
              setInterval(() => {
                window.location.reload();
              }, 500);
        }else{
          alert("User Details Cant be Added "+ "Error Code " +
          response.status);
        }
        }
      )
      .catch((error)=>{
        console.log("ERROR",error)
      //  alert("Somethign Wrong!")
      })
  }
  



  
  render() {
    return (
      <div>

<Typography variant="h3" component="h2" gutterBottom>
          User Details
          </Typography>

          <form noValidate style={{width:'100%'}}  onSubmit= {this.submituserdata.bind(this)}  > 
          <TextField
          id="userid"
          label="Enter User ID"
          type="number"
          required
          onChange={this.handleChange.bind(this, "ID")} value={this.state.fields["ID"]}
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
        />
         <Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>
             {this.state.errors["ID"]}
             </Typography>

          <Box m={2}></Box>
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
        <Select
          labelId="Branch"
          id="Branch"
          onChange={this.handleChange.bind(this, "Branch")} value={this.state.fields["Branch"]}
          >
          <MenuItem value="COMPS">COMPS</MenuItem>
          <MenuItem value="IT">IT</MenuItem>
          <MenuItem value="MECH">MECH</MenuItem>
          <MenuItem value="CIVIL">CIVIL</MenuItem>
          <MenuItem value="EXTC">EXTC</MenuItem>
          <MenuItem value="ETRX">ETRX</MenuItem>
        </Select>
        </FormControl>
        <Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>
             {this.state.errors["Branch"]}
             </Typography>
        <Box m={5}></Box>

        <FormControl style={{minWidth:200}}>
        <InputLabel id="gender">Select Gender</InputLabel>
        <Select
          labelId="gender"
          id="gender"
          refs="Gender"
          onChange={this.handleChange.bind(this, "Gender")} value={this.state.fields["Gender"]}
          >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
        </FormControl>
        <Typography variant="body2" align="left" color="error" style={{fontWeight:700,marginBottom:'20px'}}>
             {this.state.errors["Gender"]}
             </Typography>
    
          <Box m={5}></Box>


          <FormControl style={{minWidth:200}}>
        <InputLabel id="PlacementStatus">Placement Status</InputLabel>
        <Select
          labelId="PlacementStatus"
          id="PlacementStatus"
          onChange={this.handleChange.bind(this, "PlacementStatus")} value={this.state.fields["PlacementStatus"]} 
          >
          <MenuItem value="Placed">Placed</MenuItem>
          <MenuItem value="NotPlaced">NotPlaced</MenuItem>
        </Select>
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

      </div>
    )
  }
}













/*

<Typography variant="h4" component="h2" gutterBottom>
          User Details
          </Typography>

          <TextField
          id="userid"
          label="Enter User ID"
          type="number"
          required
        
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
        />
          <Box m={2}></Box>
          <TextField
          id="phonenumber"
          label="Phone Number"
          type="number"
          required
        
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box m={2}></Box>
    
          <TextField
          id="sscmarks"
          label="Ssc Marks (in %)"
          type="number"
          required
         
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
        />
          <Box m={2}></Box>

        <TextField
          id="hscmarks"
          label="Hsc Marks or Diploma (in %)"
          type="number"
         
          required
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
        />
   <Box m={2}></Box>



        <TextField
          id="beavg"
          label="Be Average Pointer"
          type="number"
        
          required
          maxWidth="20px"
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box m={2}></Box>

        <FormControl style={{minWidth:200}}>
        <InputLabel id="demo-simple-select-label">Branch</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select">
          <MenuItem value="COMPS">COMPS</MenuItem>
          <MenuItem value="IT">IT</MenuItem>
          <MenuItem value="MECH">MECH</MenuItem>
          <MenuItem value="CIVIL">CIVIL</MenuItem>
          <MenuItem value="EXTC">EXTC</MenuItem>
          <MenuItem value="ETRX">ETRX</MenuItem>
        </Select>
        </FormControl>
        <Box m={5}></Box>

        <FormControl style={{minWidth:200}}>
        <InputLabel id="demo-simple-select-label">Select Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select">
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
        </FormControl>

    
          <Box m={5}></Box>


          <FormControl style={{minWidth:200}}>
        <InputLabel id="demo-simple-select-label">Placement Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select">
          <MenuItem value="COMPS">Placed</MenuItem>
          <MenuItem value="IT">NotPlaced</MenuItem>
        </Select>
        </FormControl>

      


<Box m={3}></Box>


               <Button
        align="center"
            type="submit" 
            size="large"
            startIcon={<SaveIcon />}
            variant="contained" color="primary" value="submit" id="submit">
            Submit
          </Button>

*/
