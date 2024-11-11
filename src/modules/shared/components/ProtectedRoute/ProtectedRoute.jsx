import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({LoginData,children}) {
 
    if(localStorage.getItem('token')|| LoginData) return children; //True (user login ) --> show next componant 
    else return <Navigate to="/login"/> //False --> stay in login componant
}
