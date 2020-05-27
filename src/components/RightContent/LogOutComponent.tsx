import React,{ useRef } from 'react';
import axios from "axios";
import { history } from 'umi';

import {Button} from 'antd';
function handleLogOut(){
  axios.delete("http://localhost:8000",{ withCredentials :true}).then(
    response => {
     window.localStorage.clear();
     history.push("user/login");
 }).catch(error => {
   console.log("Logout Error",error);
 });
}
function LogOutContainer(){
  return(
    <div>
     <Button
      onClick ={handleLogOut}>Log Out</Button>
    </div>
  )
}

export default LogOutContainer;
