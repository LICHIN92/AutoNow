import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AdminAuth = ({children}) => {
    
const token =localStorage.getItem('autoNowToken')
const user=useSelector((state)=>state.user?.user)
//  const user = useSelector((state) => state.user?.user)
  console.log(user);

if(!token && !user?.Role){
    return <Navigate to={'/signin'}/>
}
  return children
}

export default AdminAuth