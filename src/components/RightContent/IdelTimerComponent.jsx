import React,{ useRef } from 'react';
import IdleTimer from  'react-idle-timer';
import axios from "axios";
import { history } from 'umi';
function IdleTimerContainer(){
  const idleTimerRef = useRef(null);
  const onIdle = () => {
    alert("User On Idle Login Again");
    console.log(" User On Idle");
    axios.delete("http://localhost:8000",{ withCredentials :true}).then(
     response => {
      window.localStorage.clear();
      history.push("user/login");
  }).catch(error => {
    console.log("Logout Error",error);
  });
  }
  return(
    <div>
      <IdleTimer ref={idleTimerRef}
      timeout={5*5000}
      onIdle={onIdle}></IdleTimer>
    </div>
  )
}

export default IdleTimerContainer;