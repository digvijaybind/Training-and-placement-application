import React from 'react';
import { Container ,Grid, Typography, Divider } from '@material-ui/core';


import {useHistory,Link} from 'react-router-dom';



export default function Footer(props) {
 
  const history=useHistory();


  
  const setabout=()=>{
          history.push(`/about`)
  }

  const setregister=()=>{
    history.push(`/register`)
  }

  const setcontact=()=>{
    history.push(`/contact`)
  }


  const  setlogin=()=>{
    history.push(`/login`)
  }


  return (
     <footer>
       <Container align="center">
     <Typography variant="body2"  align="center" style={{paddingTop:20}}>
           <b>
        {'Copyright © '}
  <Link to="/">{`SLRTCE T&P CELL`}</Link>
        {new Date().getFullYear()}
        {'.'}
        </b>
      </Typography>
      <Divider style={{margin:"24px auto" ,width:"90px",border:"2px solid"}}/>
          <Grid container justify={"center"} spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
             <Typography align={"center"} gutterBottom color={"textSecondary"} onClick={setabout} >
            AboutUs
             </Typography>             
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
             <Typography align={"center"} gutterBottom color={"textSecondary"} onClick={setlogin}>
             Login
             </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
             <Typography align={"center"} gutterBottom color={"textSecondary"} onClick={setregister}>
               SignUp
             </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
             <Typography align={"center"} gutterBottom color={"textSecondary"} onClick={setcontact}>
             ContactUs
             </Typography>
            </Grid>
         </Grid>
    
         </Container>
      </footer>
  );
}
