import React,{ useRef } from 'react';
import axios from "axios";
import { history } from 'umi';
import { LogoutOutlined } from "@ant-design/icons";

import {Button} from 'antd';
function handleLogOut(){
//   axios.delete("https://master.ddzfdvg3qoxoo.amplifyapp.com",{ withCredentials :true}).then(
//     response => {
     window.localStorage.clear();
     history.push("user/login");
//  }).catch(error => {
//    console.log("Logout Error",error);
//  });
}
function LogOutContainer(){
  return(
    <div>
     <LogoutOutlined
      onClick ={handleLogOut} style={{ fontSize: '20px' ,padding : '20px' }}  />
    </div>
  )
}

export default LogOutContainer;
