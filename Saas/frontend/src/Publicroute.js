import React from 'react';
import { Navigate,Outlet } from 'react-router-dom';

function Publicroute(){
  const loggedin=localStorage.getItem("loggedin")
  console.log(loggedin)
  if(loggedin){
    return<Navigate to="/"></Navigate>
  }
  return <Outlet/>
}
export default Publicroute;