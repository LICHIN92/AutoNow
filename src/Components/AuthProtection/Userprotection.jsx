import React from 'react'
import { Navigate } from 'react-router-dom'

const Userprotection = ({ children }) => {
    const token = localStorage.getItem('autoNowToken')

    if (token) {
        return children

    }
        return <Navigate to="/" />


}

export default Userprotection