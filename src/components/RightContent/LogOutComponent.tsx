import React, { useRef } from 'react';
import axios from 'axios';
import { history } from 'umi';
import { LogoutOutlined, MessageOutlined } from '@ant-design/icons';

import { Button } from 'antd';
function handleLogOut() {
  //   axios.delete("https://master.ddzfdvg3qoxoo.amplifyapp.com",{ withCredentials :true}).then(
  //     response => {
  window.localStorage.clear();
  // history.clear()
  history.push('/user/login');
  //  }).catch(error => {
  //    console.log("Logout Error",error);
  //  });
}

function redirectChat() {
  window.location.href = 'http://ec2-34-232-66-46.compute-1.amazonaws.com/php-medical-app/signin/?id=28';

  console.log("redireccionando")
}
function LogOutContainer() {
  return (
    <div>
      <MessageOutlined onClick={redirectChat} style={{ fontSize: '20px', padding: '20px' }} />
      <LogoutOutlined onClick={handleLogOut} style={{ fontSize: '20px', padding: '20px' }} />
    </div>
  );
}

export default LogOutContainer;
