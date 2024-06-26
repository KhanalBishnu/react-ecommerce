import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function ProtectedRoute(props) {
    const token =useSelector((state)=>state.auth.token);
    const navigate=useNavigate();
    const {Component}=props;
    useEffect(()=>{
      if(!token){
        navigate("/login");
      }
    },[])
   
    return (
    <>
    <Component/>
    </>
  )
}

export default ProtectedRoute