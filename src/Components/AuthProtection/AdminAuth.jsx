import React from 'react'
import { Navigate } from 'react-router-dom'

const AdminAuth = ({children}) => {
    
const token =localStorage.getItem('autoNowToken')

if(!token){
    return <Navigate to={'/signin'}/>
}
  return children
}

export default AdminAuth