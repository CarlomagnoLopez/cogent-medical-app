import React,{ useRef } from 'react';
import IdleTimer from  'react-idle-timer';

function IdleTimerContainer(){
  const idleTimerRef = useRef(null);
  const onIdle = () => {
    alert("User On Idle")
    console.log(" User On Idle");
  }
  return(
    <div>
      <IdleTimer ref={idleTimerRef}
      timeout={5*1000}
      onIdle={onIdle}></IdleTimer>
    </div>
  )
}

export default IdleTimerContainer;
