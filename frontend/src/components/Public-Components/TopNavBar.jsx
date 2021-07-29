import React,{Component} from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {Link,Typography,IconButton,AppBar,Toolbar} from '@material-ui/core'
import { Switch, Route } from 'react-router-dom';
import Homepage from '../Public-Components/HomePage'

import {useHistory} from 'react-router-dom';




export default function TopNavBar() {
  const history=useHistory();


  const sethome=()=>{
    history.push(`/`);
  }

  const setlogin=()=>{
    history.push(`/login`)
  }

  return (
    <div style={{flexGrow:1,zIndex:999,top:0,position:"sticky",marginBottom:10}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow:1}} align="left" onClick={sethome}>
          SLRTCE 
          </Typography>
        <IconButton edge="end" style={{marginLeft:{spacing:2}}} color="inherit" aria-label="theme-option">
         <PersonAddIcon onClick={setlogin}/>
        </IconButton>
        </Toolbar>
      </AppBar>
   
    </div>
   
  );
  

}